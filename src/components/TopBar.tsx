export function TopBar() {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Market Console</p>
        <h1>Position Manager</h1>
      </div>
      <div className="topbar-meta">
        <div className="status-chip">
          <span className="status-dot" />
          Asia session mixed
        </div>
        <label className="search-shell" aria-label="Global search shell">
          <span>Search</span>
          <input
            type="text"
            placeholder="Search ticker or company"
            readOnly
            aria-label="Search ticker or company"
          />
        </label>
        <div className="clock-card">
          <span>UTC+8</span>
          <strong>15:42</strong>
        </div>
      </div>
    </header>
  );
}
