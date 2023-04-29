-- テーブル作成
CREATE TABLE IF NOT EXISTS bookmarks (
  id INTEGER PRIMARY KEY,
  title TEXT,
  url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- データ挿入
INSERT INTO bookmarks (title, url) VALUES ('Google', 'https://www.google.com/');
INSERT INTO bookmarks (title, url) VALUES ('Yahoo', 'https://www.yahoo.co.jp/');