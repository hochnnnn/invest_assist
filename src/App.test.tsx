import { render, screen } from "@testing-library/react";
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
    renderApp(["/symbol/MSFT"]);

    expect(screen.getByLabelText("MSFT 1D chart")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1W" })).toBeInTheDocument();
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

    expect(await screen.findByLabelText("0700.HK 1D chart")).toBeInTheDocument();
  });

  it("switches the active ticker from the persistent watchlist", async () => {
    const user = userEvent.setup();
    renderApp(["/symbol/NVDA"]);

    await user.click(screen.getByRole("button", { name: /MSFT/i }));

    expect(await screen.findByLabelText("MSFT 1D chart")).toBeInTheDocument();
  });

  it("updates chart selection when changing the period", async () => {
    const user = userEvent.setup();
    renderApp(["/symbol/NVDA"]);

    const weekButton = screen.getByRole("button", { name: "1W" });
    await user.click(weekButton);

    expect(weekButton).toHaveClass("is-selected");
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Fri")).toBeInTheDocument();
  });
});
