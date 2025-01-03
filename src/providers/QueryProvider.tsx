"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface PropsInterface {
  children: React.ReactNode;
}

const QueryProvider = ({ children }: PropsInterface) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
