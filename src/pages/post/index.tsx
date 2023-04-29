import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();

  // クエリパラメータを取得
  const { post } = router.query;

  return (
    <div>
        <h1>index</h1>
      <h1>Post ID: {post}</h1>
    </div>
  );
};

export default Post;
