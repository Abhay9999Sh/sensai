"use client";

import { useTheme } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";

export function ClerkThemeProvider({ children }) {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : light,
       
      }}
    >
      {children}
    </ClerkProvider>
  );
}