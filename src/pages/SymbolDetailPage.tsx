import { useParams } from "react-router-dom";
import { CommunitySentimentPanel } from "../components/CommunitySentimentPanel";
import { FundamentalsPanel } from "../components/FundamentalsPanel";
import { PriceChartPanel } from "../components/PriceChartPanel";
import { QuoteHeader } from "../components/QuoteHeader";
import { RelatedEventsPanel } from "../components/RelatedEventsPanel";
import { useSymbolDetail } from "../api/useSymbolDetail";

export function SymbolDetailPage() {
  const { ticker = "NVDA" } = useParams();
  const { data, loading, error } = useSymbolDetail(ticker);

  if (loading && !data) {
    return (
      <div className="page">
        <section className="panel">
          <p>Loading symbol detail...</p>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <section className="panel">
          <p>{error}</p>
        </section>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="page">
      <QuoteHeader quote={data.quote} />

      <div className="detail-grid">
        <PriceChartPanel
          quote={data.quote}
          trendNarrative={data.trendNarrative}
          getSeries={() => data.priceSeries}
        />
        <CommunitySentimentPanel sentiment={data.sentiment} />
      </div>

      <div className="detail-grid detail-grid-secondary">
        <FundamentalsPanel fundamentals={data.fundamentals} />
        <RelatedEventsPanel events={data.events} digest={data.eventDigest} />
      </div>
    </div>
  );
}
