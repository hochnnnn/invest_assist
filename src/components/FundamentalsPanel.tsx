import { SymbolFundamentals } from "../types";

interface FundamentalsPanelProps {
  fundamentals: SymbolFundamentals;
}

export function FundamentalsPanel({ fundamentals }: FundamentalsPanelProps) {
  return (
    <section className="panel fundamentals-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Profile</p>
          <h2>基本面概览</h2>
        </div>
      </div>
      <p className="fundamentals-copy">{fundamentals.summary}</p>
      <div className="fundamentals-grid">
        <div>
          <span>Industry</span>
          <strong>{fundamentals.industry}</strong>
        </div>
        <div>
          <span>市值</span>
          <strong>{fundamentals.marketCap}</strong>
        </div>
        <div>
          <span>股息率</span>
          <strong>{fundamentals.dividendYield}</strong>
        </div>
      </div>
      <div className="tag-row">
        {fundamentals.tags.map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
