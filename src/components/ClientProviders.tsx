"use client";
import { LangProvider } from "./LanguageContext";
import DarkModeWrapper from "./DarkModeWrapper";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DarkModeWrapper>
      <LangProvider>{children}</LangProvider>
    </DarkModeWrapper>
  );
}
