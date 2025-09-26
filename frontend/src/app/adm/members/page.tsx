"use client";

import { useAuthContext } from "@/global/auth/hooks/useAuth";
import { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { useEffect, useState } from "react";

export default function Page() {
  type MemberWithUsernameDto = components["schemas"]["MemberWithUsernameDto"];
  const [members, setMembers] = useState<MemberWithUsernameDto[] | null>(null);
  const { isLogin, isAdmin } = useAuthContext();

  useEffect(() => {
    client.GET("/api/v1/adm/members").then((res) => {
      if (res.error) {
        alert(res.error.msg);
        return;
      }

      setMembers(res.data);
    });
  }, []);

  if (!isLogin) return <>로그인 후 이용해주세요.</>;

  if (!isAdmin) return <>관리자 권한이 없습니다.</>;

  if (members === null) return <div>로딩중...</div>;

  return (
    <>
      <h1>글 목록</h1>
      {members.length === 0 && <div>글이 없습니다.</div>}

      {members.length > 0 && (
        <ul>
          {members.map((post) => (
            <li key={post.id}>
              {post.id} /{post.nickname}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
