import { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { useEffect, useState } from "react";

const usePostComment = (id: number) => {
  type PostCommentDto = components["schemas"]["PostCommentDto"];
  const [postComments, setPostComments] = useState<PostCommentDto[] | null>(
    null,
  );

  useEffect(() => {
    client
      .GET("/api/v1/posts/{postId}/comments", {
        params: {
          path: {
            postId: id,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg);
          return;
        }

        setPostComments(res.data);
      });
  }, [id]);

  const writePostComment = (content: string) => {
    client
      .POST(`/api/v1/posts/{postId}/comments`, {
        params: {
          path: {
            postId: id,
          },
        },
        body: {
          content,
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg);
          return;
        }

        alert(res.data.msg);

        if (postComments == null) return;

        setPostComments([...postComments, res.data.data]);
      });
  };

  const deletePostComment = (id: number, commentId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    client
      .DELETE(`/api/v1/posts/{postId}/comments/{id}`, {
        params: {
          path: {
            postId: id,
            id: commentId,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg);
          return;
        }

        alert(res.data?.msg);
        if (postComments === null) return;
        setPostComments(
          postComments.filter((comment) => comment.id !== commentId),
        );
      });
  };

  return {
    postComments,
    writePostComment,
    deletePostComment,
  };
};

export default usePostComment;
