import db from "@/utils/sqlite";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === "GET") return getOneHander(req, res);
  if (method === "PUT") return putHandler(req, res);
  if (method === "DELETE") return deleteHandler(req, res);
}

const getOneHander = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  db.all("SELECT * FROM bookmarks WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Database query error" });
    }

    return res.status(200).json(rows[0]);
  });
};

const putHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { title, url } = req.body;

  db.run(
    "UPDATE bookmarks SET title = ?, url = ? WHERE id = ?",
    [title, url, id],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Database query error" });
      }

      return res.status(200).json({ id: id });
    }
  );
};

const deleteHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  db.run("DELETE FROM bookmarks WHERE id = ?", [id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Database query error" });
    }

    return res.status(200).json({ id: id });
  });
};
