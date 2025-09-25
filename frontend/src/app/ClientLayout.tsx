"use client";

import Link from "next/link";

import useAuth from "../global/auth/hooks/useAuth";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLogin, loginMember, logout } = useAuth();

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
          {isLogin ? (
            <>
              <Link
                href="/members/me"
                className="p-2 rounded hover:bg-gray-100"
              >
                {loginMember.nickname}님
              </Link>
              <button
                onClick={logout}
                className="p-2 rounded hover:bg-gray-100"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/members/login"
              className="p-2 rounded hover:bg-gray-100"
            >
              로그인
            </Link>
          )}
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="text-center p-2">풋터</footer>
    </>
  );
};

export default ClientLayout;
