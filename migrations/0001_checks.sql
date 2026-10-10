-- One row per uptime check of one client site.
CREATE TABLE checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site TEXT NOT NULL,          -- project slug, e.g. 'resolve-legal'
  checked_at INTEGER NOT NULL, -- unix epoch milliseconds
  status INTEGER NOT NULL,     -- HTTP status, 0 if the request failed outright
  ms INTEGER,                  -- time to response headers; NULL on failure
  ok INTEGER NOT NULL          -- 1 if the site responded 2xx/3xx in time
);

CREATE INDEX idx_checks_site_time ON checks (site, checked_at DESC);
CREATE INDEX idx_checks_time ON checks (checked_at);
