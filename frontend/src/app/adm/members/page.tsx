"use client";

import { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { useEffect, useState } from "react";

export default function Page() {
  type MemberWithUsernameDto = components["schemas"]["MemberWithUsernameDto"];
  const [members, setMembers] = useState<MemberWithUsernameDto[] | null>(null);

  useEffect(() => {
    // (data) => setPosts(data) == setPosts
    client.GET("/api/v1/adm/members").then((res) => {
      if (res.error) {
        alert(res.error.msg);
        return;
      }

      setMembers(res.data);
    });
  }, []);
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
