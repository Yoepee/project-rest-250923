import { useRouter } from "next/navigation";

import client from "@/lib/backend/client";

const usePost = () => {
  const router = useRouter();

  const writePost = (title: string, content: string) => {
    client
      .POST(`/api/v1/posts`, {
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
        router.replace(`/posts/${res.data.data.id}`);
      });
  };

  return { writePost };
};

export default usePost;
