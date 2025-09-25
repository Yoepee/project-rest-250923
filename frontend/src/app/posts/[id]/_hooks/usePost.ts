import { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

const usePost = (id: number) => {
  type PostDto = components["schemas"]["PostWithAuthorDto"];

  const router = useRouter();

  const [post, setPost] = useState<PostDto | null>(null);

  useEffect(() => {
    client
      .GET("/api/v1/posts/{id}", {
        params: {
          path: {
            id,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg);
          return;
        }

        setPost(res.data);
      });
  }, [id]);

  const editPost = (title: string, content: string) => {
    client
      .PUT(`/api/v1/posts/{id}`, {
        params: {
          path: {
            id,
          },
        },
        body: {
          title,
          content,
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg);
          return;
        }

        alert(res.data.msg);
        router.replace(`/posts/${id}`);
      });
  };

  const deletePost = (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    client
      .DELETE(`/api/v1/posts/{id}`, {
        params: {
          path: {
            id,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg);
          return;
        }
        alert(res.data?.msg);
        router.replace("/posts");
      });
  };

  return { post, editPost, deletePost };
};

export default usePost;
