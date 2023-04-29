// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "@/utils/sqlite";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === "GET") return getHandler(res);
  if (method === "POST") return postHandler(req, res);
}

const getHandler = (res: NextApiResponse) => {
  db.all("SELECT * FROM bookmarks", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
      return;
    }

    res.status(200).json(rows);
  });
  return;
};

const postHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { title, url } = req.body;

  db.run(
    "INSERT INTO bookmarks (title, url) VALUES (?, ?)",
    [title, url],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database query error" });
        return;
      }

      res.status(200).json({ id: this.lastID });
    }
  );
  return;
};
