// src/app/layout.tsx
"use client";

import { SessionProvider } from "next-auth/react"; // Importer SessionProvider
import { ReactNode } from "react"; // Importer ReactNode pour typer les props

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <NextAuthProvider>
          {/* Envelopper l'application avec SessionProvider */}
          <SessionProvider>{children}</SessionProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
