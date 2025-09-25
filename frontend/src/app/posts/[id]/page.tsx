"use client";

import { use } from "react";

import PostCommentWriteAndList from "./_components/PostCommentWriteAndList";
import PostDetail from "./_components/PostDetail";
import usePost from "./_hooks/usePost";
import usePostComment from "./_hooks/usePostComment";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);

  const { post, deletePost } = usePost(id);
  const { postComments, writePostComment, deletePostComment } =
    usePostComment(id);

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const contentInput = form.elements.namedItem(
      "content",
    ) as HTMLTextAreaElement;

    if (contentInput.value.trim() === "" || contentInput.value.length === 0) {
      alert("댓글 내용을 입력해주세요.");
      contentInput.focus();
      return;
    }

    writePostComment(contentInput.value);
    contentInput.value = "";
  };

  return (
    <>
      <PostDetail post={post} deletePost={deletePost} />

      <PostCommentWriteAndList
        postId={id}
        postComments={postComments}
        handleSumbit={handleSumbit}
        deletePostComment={deletePostComment}
      />
    </>
  );
}
