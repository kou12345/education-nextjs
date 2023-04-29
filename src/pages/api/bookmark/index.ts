import connectToDatabase from "@/utils/mysql";
import type { OkPacket } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // curl http://localhost:3000/api/bookmark
  if (req.method === "GET") return getHandler(req, res);

  // curl -X POST -H "Content-Type: application/json" -d '{"title":"example", "url":"https://example.com"}' http://localhost:3000/api/bookmark
  if (req.method === "POST") return postHandler(req, res);

  // 未対応のHTTPメソッドの場合
  res.status(405).json({ error: "Method not allowed" });
}

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDatabase();

  try {
    const [rows] = await db.query("SELECT * FROM bookmarks");
    res.status(200).json(rows);
  } catch (err: unknown) {
    console.error((err as Error).message);
    res.status(500).json({ error: (err as Error).message });
  }
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, url } = req.body;
  const db = await connectToDatabase();

  try {
    const [result] = await db.execute<OkPacket>(
      "INSERT INTO bookmarks (title, url) VALUES (?, ?)",
      [title, url]
    );
    res.status(200).json({ id: result.insertId });
  } catch (err: unknown) {
    console.error((err as Error).message);
    res.status(500).json({ error: "Database query error" });
  }
};
