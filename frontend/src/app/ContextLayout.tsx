"use client";

import useAuth, { AuthContext } from "@/global/auth/hooks/useAuth";
import React from "react";

import ClientLayout from "./ClientLayout";

const ContextLayout = ({ children }: { children: React.ReactNode }) => {
  const authState = useAuth();
  return (
    <AuthContext value={authState}>
      <ClientLayout children={children} />
    </AuthContext>
  );
};

export default ContextLayout;
