// src/app/layout.tsx
"use client";

import { SessionProvider } from "next-auth/react"; // Importer SessionProvider
import { ReactNode } from "react"; // Importer ReactNode pour typer les props
import NextAuthProvider from "@/app/NextAuthProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* Envelopper l'application avec SessionProvider */}
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
