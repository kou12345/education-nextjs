import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();

  // クエリパラメータを取得
  const { postId } = router.query;

  return (
    <div>
      <h1>Post ID: {postId}</h1>
    </div>
  );
};

export default Post;
