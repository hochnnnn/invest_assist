import { useParams } from "react-router-dom";
import {
  getEvents,
  getFundamentals,
  getPriceSeries,
  getQuote,
  getSentiment,
  getTrendNarrative,
} from "../data/mockData";
import { CommunitySentimentPanel } from "../components/CommunitySentimentPanel";
import { FundamentalsPanel } from "../components/FundamentalsPanel";
import { PriceChartPanel } from "../components/PriceChartPanel";
import { QuoteHeader } from "../components/QuoteHeader";
import { RelatedEventsPanel } from "../components/RelatedEventsPanel";

export function SymbolDetailPage() {
  const { ticker = "NVDA" } = useParams();
  const quote = getQuote(ticker);
  const fundamentals = getFundamentals(ticker);
  const events = getEvents(ticker);
  const sentiment = getSentiment(ticker);
  const trendNarrative = getTrendNarrative(ticker);

  return (
    <div className="page">
      <QuoteHeader quote={quote} />

      <div className="detail-grid">
        <PriceChartPanel
          quote={quote}
          trendNarrative={trendNarrative}
          getSeries={() => getPriceSeries(quote.ticker)}
        />
        <CommunitySentimentPanel sentiment={sentiment} />
      </div>

      <div className="detail-grid detail-grid-secondary">
        <FundamentalsPanel fundamentals={fundamentals} />
        <RelatedEventsPanel events={events} />
      </div>
    </div>
  );
}
