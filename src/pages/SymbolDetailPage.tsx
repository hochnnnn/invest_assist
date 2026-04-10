import { useParams } from "react-router-dom";
import {
  getEvents,
  getFundamentals,
  getPriceSeries,
  getQuote,
} from "../data/mockData";
import { FundamentalsPanel } from "../components/FundamentalsPanel";
import { KeyMetricsPanel } from "../components/KeyMetricsPanel";
import { PriceChartPanel } from "../components/PriceChartPanel";
import { QuoteHeader } from "../components/QuoteHeader";
import { RelatedEventsPanel } from "../components/RelatedEventsPanel";

export function SymbolDetailPage() {
  const { ticker = "NVDA" } = useParams();
  const quote = getQuote(ticker);
  const fundamentals = getFundamentals(ticker);
  const events = getEvents(ticker);

  return (
    <div className="page">
      <QuoteHeader quote={quote} />

      <div className="detail-grid">
        <PriceChartPanel
          quote={quote}
          getSeries={(period) => getPriceSeries(quote.ticker, period)}
        />
        <KeyMetricsPanel quote={quote} fundamentals={fundamentals} />
      </div>

      <div className="detail-grid detail-grid-secondary">
        <FundamentalsPanel fundamentals={fundamentals} />
        <RelatedEventsPanel events={events} />
      </div>
    </div>
  );
}
