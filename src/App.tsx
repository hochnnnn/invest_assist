import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { MarketOverviewPage } from "./pages/MarketOverviewPage";
import { SymbolDetailPage } from "./pages/SymbolDetailPage";

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<MarketOverviewPage />} />
        <Route path="/symbol/:ticker" element={<SymbolDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
