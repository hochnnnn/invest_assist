import { useI18n } from "../context/SettingsContext";
import { SymbolQuote } from "../types";

interface QuoteHeaderProps {
  quote: SymbolQuote;
}

export function QuoteHeader({ quote }: QuoteHeaderProps) {
  const { t } = useI18n();

  return (
    <section className="quote-header panel">
      <div>
        <p className="eyebrow">{quote.market}</p>
        <div className="quote-title-line">
          <h2>{t(quote.nameKey)}</h2>
          <span>{quote.ticker}</span>
          <span className="sector-tag">{t(quote.sectorKey)}</span>
        </div>
      </div>
    </section>
  );
}
