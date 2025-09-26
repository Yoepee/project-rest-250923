"use client";

import { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { createContext, use, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

const useAuth = () => {
  type MemberDto = components["schemas"]["MemberDto"];

  const router = useRouter();
  const [loginMember, setLoginMember] = useState<MemberDto | null>(null);
  const isLogin = loginMember !== null;

  useEffect(() => {
    client.GET(`/api/v1/members/me`).then((res) => {
      if (res.error) return;
      setLoginMember(res.data.data);
    });
  }, []);

  const logout = () => {
    client.DELETE(`/api/v1/members/logout`).then((res) => {
      if (res.error) {
        alert(res.error.msg);
        return;
      }

      alert(res.data.msg);
      setLoginMember(null);
      router.replace(`/posts`);
    });
  };

  if (isLogin)
    return { isLogin: true, loginMember, setLoginMember, logout } as const;
  return {
    isLogin: false,
    loginMember: null,
    setLoginMember,
    logout,
  } as const;
};

export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(
  null,
);

export function useAuthContext() {
  const authState = use(AuthContext);

  if (authState === null) throw new Error("AuthContext is not found");

  return authState;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authState = useAuth();
  return <AuthContext value={authState}>{children}</AuthContext>;
}

export default useAuth;
