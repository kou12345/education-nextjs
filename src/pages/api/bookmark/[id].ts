import connectToDatabase from "@/utils/mysql";
import type { RowDataPacket } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // curl http://localhost:3000/api/bookmark/1
  if (req.method === "GET") return await getOneHandler(req, res);

  // curl -X PUT -H "Content-Type: application/json" -d '{"title":"example", "url":"https://example.com"}' http://localhost:3000/api/bookmark/1
  if (req.method === "PUT") return await putHandler(req, res);

  // curl -X DELETE http://localhost:3000/api/bookmark/1
  if (req.method === "DELETE") return await deleteHandler(req, res);

  // 未対応のHTTPメソッドの場合
  res.status(405).json({ error: "Method not allowed" });
}

const getOneHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const connection = await connectToDatabase();

  try {
    const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM bookmarks WHERE id = ?", [id]);
    res.status(200).json(rows[0]);
  } catch (err: unknown) {
    console.error((err as Error).message);
    res.status(500).json({ error: "Database query error" });
  }
};

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { title, url } = req.body;
  const db = await connectToDatabase();

  try {
    await db.query("UPDATE bookmarks SET title = ?, url = ? WHERE id = ?", [title, url, id]);
    res.status(200).json({ id: id });
  } catch (err: unknown) {
    console.error((err as Error).message);
    res.status(500).json({ error: "Database query error" });
  }
};

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const db = await connectToDatabase();

  try {
    await db.query("DELETE FROM bookmarks WHERE id = ?", [id]);
    res.status(200).json({ id: id });
  } catch (err: unknown) {
    console.error((err as Error).message);
    res.status(500).json({ error: "Database query error" });
  }
};