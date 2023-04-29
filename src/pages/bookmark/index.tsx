import axios from "axios";
import useSWR, { mutate } from "swr";
// Next.jsから提供されるaタグの代替コンポーネント
import Link from "next/link";
import { useState } from "react";

// Bookmark単体の型を記述
type Bookmark = {
  id: number;
  title: string;
  url: string;
};

// useSWRで使用するためのデータフェッチ関数を記述
const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

const Index = () => {
  // フォームの入力値を管理するためのstateを定義
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  // フォームのsubmitイベントを処理する関数を定義
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // デフォルトの送信動作をキャンセル
    if (data) {
      // POSTリクエスト
      await axios.post("/api/bookmark", { title, url }).then((res) => {
        // フォームに入力していた値を空に
        setTitle("");
        setUrl("");
        // mutateを使用してデータを更新
        mutate("/api/bookmark");
      });
    }
  };

  const handleUpdate = async (id: number) => {
    if (data) {
      await axios.put(`/api/bookmark/${id}`, { title, url }).then((res) => {
        // フォームに入力していた値を空に
        setTitle("");
        setUrl("");
        mutate("/api/bookmark");
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (data) {
      await axios.delete(`/api/bookmark/${id}`).then((res) => {
        mutate("/api/bookmark");
      });
    }
  };

  // useSWRフックを使用してデータを取得
  const { data, error } = useSWR<Bookmark[]>("/api/bookmark", fetcher);

  // errorが発生した場合の画面表示
  if (error) return <div>failed to load</div>;
  // データ取得中の画面表示
  if (!data) return <div>loading...</div>;

  return (
    <div>
      {/* 登録用フォームの追加 */}
      <h2 className="text-2xl mt-6 mb-4">Bookmark Form</h2>
      {/* submit用のinputタグを押下した際に発火させる処理 */}
      <form onSubmit={handleSubmit}>
        <p>Title</p>
        <input
          type="text"
          name="title"
          id="title"
          // 入力値がセットされた値に変わる
          value={title}
          className="bg-black border px-2 block"
          // 入力値をuseStateのリアクティブ変数にset
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>URL</p>
        <input
          type="text"
          name="url"
          id="url"
          // 入力値がセットされた値に変わる
          value={url}
          className="bg-black border px-2 block"
          // 入力値をuseStateのリアクティブ変数にset
          onChange={(e) => setUrl(e.target.value)}
        />
        <input type="submit" value="CREATE" className="border px-2 mt-4" />
      </form>

      <h2 className="text-2xl mt-6 mb-4">Bookmark List</h2>
      {/* ブックマークリストのヘッダー */}
      <div className="flex">
        <p className="w-48 text-center">Title</p>
        <p className="w-48 text-center">URL</p>
      </div>
      {/* 取得したデータを元にループ処理で表示 */}
      {data.map((bookmark: Bookmark) => {
        if (bookmark.url !== undefined) {
          return (
            <div key={bookmark.id} className="flex">
              <p className="bg-black border px-2 w-48">{bookmark.title}</p>
              <p className="bg-black border px-2 w-48">{bookmark.url}</p>
              <button
                className="border px-2"
                onClick={() => handleUpdate(bookmark.id)}
              >
                UPDATE
              </button>
              <button
                className="border px-2"
                onClick={() => handleDelete(bookmark.id)}
              >
                DELETE
              </button>
              <Link target="_blank" className="border px-2" href={bookmark.url}>
                LINK
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Index;
