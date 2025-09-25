"use client";

import Link from "next/link";

import useMember from "./_hooks/useMember";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useMember();
  return (
    <>
      <header>
        <nav className="flex">
          <Link href="/" className="p-2 rounded hover:bg-gray-100">
            홈
          </Link>
          <Link href="/posts" className="p-2 rounded hover:bg-gray-100">
            글목록
          </Link>
          <Link href="/members/login" className="p-2 rounded hover:bg-gray-100">
            로그인
          </Link>
          <button onClick={logout} className="p-2 rounded hover:bg-gray-100">
            로그아웃
          </button>
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="text-center p-2">풋터</footer>
    </>
  );
};

export default ClientLayout;
