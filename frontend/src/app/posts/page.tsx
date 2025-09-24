"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { apiFetch } from "@/lib/backend/client";

import { components } from "@/lib/backend/apiV1/schema";

export default function Page() {
  type PostDto = components["schemas"]["PostDto"];
  const [posts, setPosts] = useState<PostDto[] | null>(null);

  useEffect(() => {
    // (data) => setPosts(data) == setPosts
    apiFetch("/api/v1/posts")
      .then(setPosts)
      .catch((error) => {
        alert(`${error.resultCode}: ${error.msg}`);
      });
  }, []);
  if (posts === null) return <div>로딩중...</div>;

  return (
    <>
      <h1>글 목록</h1>
      {posts.length === 0 && <div>글이 없습니다.</div>}

      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post.id} /<Link href={`/posts/${post.id}`}>{post.title}</Link> /
              {post.content}
            </li>
          ))}
        </ul>
      )}

      <div>
        <Link href="/posts/write">글쓰기</Link>
      </div>
    </>
  );
}
