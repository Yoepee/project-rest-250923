import { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

const useAuth = () => {
  type MemberDto = components["schemas"]["MemberDto"];

  const router = useRouter();
  const [loginMember, setLoginMember] = useState<MemberDto | null>(null);

  useEffect(() => {
    client.GET(`/api/v1/members/me`).then((res) => {
      if (res.error) return;
      setLoginMember(res.data.data);
    });
  }, []);

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

  const logout = () => {
    client.DELETE(`/api/v1/members/logout`).then((res) => {
      if (res.error) {
        alert(res.error.msg);
        return;
      }

      alert(res.data.msg);
      router.replace(`/posts`);
    });
  };

  return { loginMember, login, logout };
};

export default useAuth;
