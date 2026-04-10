import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

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

describe("Position Manager prototype", () => {
  it("renders the market overview page on the home route", () => {
    renderApp(["/"]);

    expect(screen.getByRole("heading", { name: "主要指数" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "宏观日历" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "关注标的" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "自选看板" })).toBeInTheDocument();
  });

  it("renders the symbol detail page from the ticker route", () => {
    renderApp(["/symbol/MSFT"]);

    expect(screen.getByRole("heading", { name: "Microsoft" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "价格走势" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "基本面概览" })).toBeInTheDocument();
  });

  it("navigates from the overview quick focus list into a symbol detail page", async () => {
    const user = userEvent.setup();
    renderApp(["/"]);

    await user.click(screen.getByRole("button", { name: /Tencent 0700\.HK/i }));

    expect(await screen.findByRole("heading", { name: "Tencent" })).toBeInTheDocument();
  });

  it("switches the active ticker from the persistent watchlist", async () => {
    const user = userEvent.setup();
    renderApp(["/symbol/NVDA"]);

    await user.click(screen.getByRole("button", { name: /MSFT Microsoft/i }));

    expect(await screen.findByRole("heading", { name: "Microsoft" })).toBeInTheDocument();
    expect(screen.getAllByText("Software Infrastructure")).toHaveLength(2);
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
