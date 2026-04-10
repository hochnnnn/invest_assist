import { SymbolQuote } from "../types";

interface QuoteHeaderProps {
  quote: SymbolQuote;
}

export function QuoteHeader({ quote }: QuoteHeaderProps) {
  const isPositive = quote.change >= 0;

  return (
    <section className="quote-header panel">
      <div>
        <p className="eyebrow">{quote.market}</p>
        <div className="quote-title-line">
          <h2>{quote.name}</h2>
          <span>{quote.ticker}</span>
          <span className="sector-tag">{quote.sector}</span>
        </div>
      </div>
      <div className="quote-price-block">
        <strong>{quote.price.toFixed(2)}</strong>
        <div className={isPositive ? "price-up" : "price-down"}>
          <span>
            {isPositive ? "+" : ""}
            {quote.change.toFixed(2)}
          </span>
          <span>
            {isPositive ? "+" : ""}
            {quote.changePercent.toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="quote-stats-inline">
        <div>
          <span>成交量</span>
          <strong>{quote.volume}</strong>
        </div>
        <div>
          <span>成交额</span>
          <strong>{quote.turnover}</strong>
        </div>
        <div>
          <span>今开</span>
          <strong>{quote.open}</strong>
        </div>
      </div>
    </section>
  );
}
