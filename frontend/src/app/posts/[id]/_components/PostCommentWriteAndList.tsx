import { components } from "@/global/backend/apiV1/schema";
import React from "react";

type PostCommentDto = components["schemas"]["PostCommentDto"];
const PostCommentWriteAndList = ({
  postId,
  postComments,
  handleSumbit,
  deletePostComment,
}: {
  postId: number;
  postComments: PostCommentDto[] | null;
  handleSumbit: (e: React.FormEvent<HTMLFormElement>) => void;
  deletePostComment: (id: number, commentId: number) => void;
}) => {
  return (
    <>
      <h2>댓글 작성</h2>
      <form className="flex flex-col gap-2 p-2" onSubmit={handleSumbit}>
        <textarea
          className="border p-2 rounded"
          name="content"
          placeholder="댓글 내용"
        />
        <button className="border p-2 rounded" type="submit">
          작성
        </button>
      </form>

      <h2>댓글 목록</h2>

      {postComments === null && <div>댓글이 로딩중...</div>}

      {postComments !== null && postComments.length > 0 && (
        <ul>
          {postComments.map((comment) => (
            <li key={comment.id}>
              {comment.id}/{comment.content}
              <button
                className="p-2 rounded border"
                onClick={() => deletePostComment(postId, comment.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PostCommentWriteAndList;
