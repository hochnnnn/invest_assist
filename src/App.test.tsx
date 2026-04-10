import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import App from "./App";
import { referralConfig } from "./data/settingsMockData";

function renderApp(initialEntries: string[]) {
  return render(
    <MemoryRouter
      initialEntries={initialEntries}
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <App />
    </MemoryRouter>,
  );
}

function setEnglishPreferences() {
  window.localStorage.setItem(
    "position-manager.preferences",
    JSON.stringify({ language: "en-US", theme: "light" }),
  );
}

describe("Position Manager settings and preferences", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders the market overview page and settings entry", () => {
    renderApp(["/"]);

    expect(screen.getByTestId("settings-open")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /NVDA/i }).length).toBeGreaterThan(0);
    expect(screen.getByText("15:42")).toBeInTheDocument();
  });

  it("renders the symbol detail page from the ticker route", () => {
    setEnglishPreferences();
    renderApp(["/symbol/MSFT"]);

    expect(screen.getByLabelText("MSFT 1Y chart")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "1W" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Community Sentiment" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Key Metrics" })).not.toBeInTheDocument();
  });

  it("opens the settings drawer and closes it with the keyboard", async () => {
    const user = userEvent.setup();
    renderApp(["/"]);

    await user.click(screen.getByTestId("settings-open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps the settings first screen compact by default", async () => {
    const user = userEvent.setup();
    renderApp(["/"]);

    await user.click(screen.getByTestId("settings-open"));

    expect(screen.queryByTestId("subscription-panel")).not.toBeInTheDocument();
    expect(screen.queryByText(referralConfig.shareUrl)).not.toBeInTheDocument();
    expect(screen.getByTestId("settings-language-select")).toBeInTheDocument();
    expect(screen.getByTestId("theme-segmented")).toBeInTheDocument();
  });

  it("switches language across the app and persists the choice", async () => {
    const user = userEvent.setup();
    const firstRender = renderApp(["/"]);

    await user.click(screen.getByTestId("settings-open"));
    await user.selectOptions(screen.getByTestId("settings-language-select"), "en-US");

    expect(screen.getByRole("heading", { name: "Major Indexes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Watchlist" })).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument();

    firstRender.unmount();
    renderApp(["/"]);

    expect(screen.getByRole("heading", { name: "Major Indexes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Watchlist" })).toBeInTheDocument();
  });

  it("switches theme and restores it from localStorage", async () => {
    const user = userEvent.setup();
    const firstRender = renderApp(["/"]);

    expect(document.documentElement.dataset.theme).toBe("light");

    await user.click(screen.getByTestId("settings-open"));
    await user.click(screen.getByTestId("theme-option-dark"));

    expect(document.documentElement.dataset.theme).toBe("dark");

    firstRender.unmount();
    renderApp(["/"]);

    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("expands subscription management inline and keeps the selected plan summary", async () => {
    const user = userEvent.setup();
    renderApp(["/"]);

    await user.click(screen.getByTestId("settings-open"));
    await user.selectOptions(screen.getByTestId("settings-language-select"), "en-US");

    expect(screen.getByTestId("current-plan-summary")).toHaveTextContent("Starter");

    await user.click(screen.getByTestId("subscription-toggle"));
    expect(screen.getByTestId("subscription-panel")).toBeInTheDocument();

    await user.click(screen.getByTestId("subscription-select-pro"));
    expect(screen.getByTestId("current-plan-summary")).toHaveTextContent("Pro");

    await user.click(screen.getByTestId("subscription-toggle"));
    expect(screen.queryByTestId("subscription-panel")).not.toBeInTheDocument();
    expect(screen.getByTestId("current-plan-summary")).toHaveTextContent("Pro");
  });

  it("copies the referral link without rendering the raw url", async () => {
    const user = userEvent.setup();
    renderApp(["/"]);

    await user.click(screen.getByTestId("settings-open"));
    await user.selectOptions(screen.getByTestId("settings-language-select"), "en-US");
    expect(screen.queryByText(referralConfig.shareUrl)).not.toBeInTheDocument();

    await user.click(screen.getByTestId("referral-copy"));
    expect(screen.getByRole("button", { name: "Link copied" })).toBeInTheDocument();
  });

  it("navigates from the overview focus list into a symbol detail page", async () => {
    const user = userEvent.setup();
    renderApp(["/"]);

    await user.click(screen.getAllByRole("button", { name: /0700\.HK/i })[0]);

    expect(await screen.findByLabelText("0700.HK 1Y chart")).toBeInTheDocument();
  });

  it("switches the active ticker from the persistent watchlist", async () => {
    const user = userEvent.setup();
    renderApp(["/symbol/NVDA"]);

    await user.click(screen.getByRole("button", { name: /MSFT/i }));

    expect(await screen.findByLabelText("MSFT 1Y chart")).toBeInTheDocument();
  });

  it("renders a fixed one-year chart with monthly labels", () => {
    setEnglishPreferences();
    renderApp(["/symbol/NVDA"]);

    expect(screen.getByLabelText("NVDA 1Y chart")).toBeInTheDocument();
    expect(screen.getByText("Jun")).toBeInTheDocument();
    expect(screen.getByText("May")).toBeInTheDocument();
    expect(screen.queryByText("Mon")).not.toBeInTheDocument();
  });

  it("keeps only five market stats in the price trend panel", () => {
    setEnglishPreferences();
    renderApp(["/symbol/NVDA"]);
    const chartPanel = screen.getByLabelText("NVDA 1Y chart").closest("section");

    expect(chartPanel).not.toBeNull();
    expect(within(chartPanel!).getByText("942.38")).toBeInTheDocument();
    expect(within(chartPanel!).getByText("+1.99%")).toBeInTheDocument();
    expect(within(chartPanel!).getByText("$39.6B")).toBeInTheDocument();
    expect(within(chartPanel!).getByText("Amplitude")).toBeInTheDocument();
    expect(within(chartPanel!).getByText("Turnover Rate")).toBeInTheDocument();
    expect(within(chartPanel!).queryByText("42.8M")).not.toBeInTheDocument();
    expect(within(chartPanel!).queryByText("926.40")).not.toBeInTheDocument();
    expect(within(chartPanel!).queryByText("949.80")).not.toBeInTheDocument();
    expect(within(chartPanel!).queryByText("923.60")).not.toBeInTheDocument();
  });

  it("removes duplicated price and change from the quote header", () => {
    setEnglishPreferences();
    renderApp(["/symbol/NVDA"]);
    const quoteHeader = screen.getByText("NASDAQ").closest("section");

    expect(quoteHeader).not.toBeNull();
    expect(within(quoteHeader!).getByText("NVIDIA")).toBeInTheDocument();
    expect(within(quoteHeader!).getByText("NVDA")).toBeInTheDocument();
    expect(within(quoteHeader!).queryByText("942.38")).not.toBeInTheDocument();
    expect(within(quoteHeader!).queryByText("+1.99%")).not.toBeInTheDocument();
  });

  it("renders ticker-specific sentiment content", () => {
    setEnglishPreferences();
    renderApp(["/symbol/MSFT"]);

    expect(screen.getByText("Divided Bias")).toBeInTheDocument();
    expect(screen.getByText("37%")).toBeInTheDocument();
    expect(screen.getByText("52")).toBeInTheDocument();
    expect(screen.getByText("-1")).toBeInTheDocument();
    expect(screen.getByText("Bullish Views")).toBeInTheDocument();
    expect(screen.getByText("Bearish Views")).toBeInTheDocument();
    expect(
      screen.getByText(/Azure capacity pacing are still debated/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/waiting for a cleaner catalyst/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("MSFT 30D Panic Index Trend")).toBeInTheDocument();
  });

  it("translates the sentiment panel and market stats labels", async () => {
    const user = userEvent.setup();
    renderApp(["/symbol/NVDA"]);

    await user.click(screen.getByTestId("settings-open"));
    await user.selectOptions(screen.getByTestId("settings-language-select"), "en-US");

    expect(screen.getByRole("heading", { name: "Community Sentiment" })).toBeInTheDocument();
    expect(screen.getByText("Overall Sentiment")).toBeInTheDocument();
    expect(screen.getByText("Positioning Breakdown")).toBeInTheDocument();
    expect(screen.getByText("Stock Panic Index")).toBeInTheDocument();
    expect(screen.getByText("Latest Score")).toBeInTheDocument();
    expect(screen.getByText("Daily Change")).toBeInTheDocument();
    expect(screen.getByText("Panic State")).toBeInTheDocument();
    expect(screen.getByText("Bullish Share")).toBeInTheDocument();
    expect(screen.getByText("Cautious Share")).toBeInTheDocument();
    expect(screen.getByText("Neutral Share")).toBeInTheDocument();
    expect(screen.getByText("Turnover Rate")).toBeInTheDocument();
    expect(screen.getByText("Latest Price")).toBeInTheDocument();
    expect(screen.getByText("Trend Read")).toBeInTheDocument();
    expect(screen.getByText("30D Panic Index Trend")).toBeInTheDocument();
    expect(screen.getByText("30 days ago")).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Today News Brief")).toBeInTheDocument();
    expect(screen.getByText("Today's News")).toBeInTheDocument();
    expect(screen.getByText("Latest Update")).toBeInTheDocument();
    expect(screen.getAllByText("Positive").length).toBeGreaterThan(0);
  });

  it("renders three bullish and three bearish sentiment views", () => {
    setEnglishPreferences();
    renderApp(["/symbol/NVDA"]);

    expect(screen.getAllByRole("listitem")).toHaveLength(6);
    expect(
      screen.getByText(/AI capex is still expanding/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/valuation already prices in several quarters/i),
    ).toBeInTheDocument();
  });

  it("renders ticker-specific trend narrative copy", () => {
    setEnglishPreferences();
    renderApp(["/symbol/MSFT"]);

    expect(screen.getByText("Trend Read")).toBeInTheDocument();
    expect(
      screen.getByText(/pullback entries read better than chasing strength/i),
    ).toBeInTheDocument();
  });

  it("renders an event digest and five related events for the symbol page", () => {
    setEnglishPreferences();
    const { container } = renderApp(["/symbol/NVDA"]);

    const digest = screen.getByTestId("events-digest");

    expect(digest).toBeInTheDocument();
    expect(
      screen.getByText(/Today's NVDA flow is still centered on AI server demand/i),
    ).toBeInTheDocument();
    expect(within(digest).getByText("3")).toBeInTheDocument();
    expect(container.querySelectorAll(".event-card")).toHaveLength(5);
    expect(screen.getByText("Hyperscalers continue lifting AI server purchase expectations")).toBeInTheDocument();
    expect(screen.getByText(/Persistent demand strength supports another round/i)).toBeInTheDocument();
  });

  it("fills the event rail with upcoming catalysts after today's news", () => {
    setEnglishPreferences();
    renderApp(["/symbol/NVDA"]);

    const eventList = screen.getByTestId("related-events-list");

    expect(within(eventList).getByText("Today 14:10")).toBeInTheDocument();
    expect(within(eventList).getByText("Today 11:40")).toBeInTheDocument();
    expect(within(eventList).getByText("Today 09:20")).toBeInTheDocument();
    expect(within(eventList).getByText("May 22")).toBeInTheDocument();
    expect(within(eventList).getByText("This Week")).toBeInTheDocument();
  });
});
