interface MarketPulsePanelProps {
  pulse: {
    advancers: number;
    decliners: number;
    turnover: string;
    riskMood: string;
    hotTheme: string;
  };
}

export function MarketPulsePanel({ pulse }: MarketPulsePanelProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Breadth</p>
          <h2>市场温度</h2>
        </div>
      </div>
      <div className="pulse-grid">
        <div className="metric-card">
          <span>上涨家数</span>
          <strong>{pulse.advancers}</strong>
        </div>
        <div className="metric-card">
          <span>下跌家数</span>
          <strong>{pulse.decliners}</strong>
        </div>
        <div className="metric-card">
          <span>成交额</span>
          <strong>{pulse.turnover}</strong>
        </div>
        <div className="metric-card">
          <span>风险偏好</span>
          <strong>{pulse.riskMood}</strong>
        </div>
      </div>
      <div className="pulse-banner">
        <span>Hot Theme</span>
        <strong>{pulse.hotTheme}</strong>
      </div>
    </section>
  );
}
