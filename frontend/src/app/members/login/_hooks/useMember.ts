import { useRouter } from "next/navigation";

import client from "@/lib/backend/client";

const useMember = () => {
  const router = useRouter();

  const login = (username: string, password: string) => {
    client
      .POST(`/api/v1/members/login`, {
        body: {
          username,
          password,
        },
      })
      .then((res) => {
        if (res.error) {
          alert(res.error.msg);
          return;
        }

        alert(res.data.msg);
        router.replace(`/posts`);
      });
  };
  return { login };
};

export default useMember;
