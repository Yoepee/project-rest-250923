"use client";

import { AuthProvider } from "@/global/auth/hooks/useAuth";
import React from "react";

import ClientLayout from "./ClientLayout";

const ContextLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ClientLayout children={children} />
    </AuthProvider>
  );
};

export default ContextLayout;
