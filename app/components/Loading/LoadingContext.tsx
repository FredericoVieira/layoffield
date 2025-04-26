"use client";

import { createContext, useState, ReactNode } from "react";
import Loader from "./Loading";

type LoadingContextType = {
  isLoading: boolean;
  showLoading: (status: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined,
);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = (status: boolean) => setIsLoading(status);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading }}>
      {children}
      {isLoading && <Loader />}
    </LoadingContext.Provider>
  );
}
