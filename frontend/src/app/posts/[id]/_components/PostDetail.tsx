import { components } from "@/global/backend/apiV1/schema";

import Link from "next/link";

type PostDto = components["schemas"]["PostWithAuthorDto"];

const PostDetail = ({
  post,
  deletePost,
}: {
  post: PostDto | null;
  deletePost: (id: number) => void;
}) => {
  if (post === null) return <div>로딩중...</div>;
  return (
    <>
      <h1>게시글 상세페이지</h1>
      <>
        <div>게시글 번호: {post?.id}</div>
        <div>게시글 제목: {post?.title}</div>
        <div>게시글 내용: {post?.content}</div>
      </>

      <div className="flex gap-2">
        <button
          onClick={() => deletePost(post.id)}
          className="p-2 rounded border"
        >
          삭제
        </button>
        <Link className="p-2 rounded border" href={`/posts/${post.id}/edit`}>
          수정
        </Link>
      </div>
    </>
  );
};

export default PostDetail;
