// src/app/layout.tsx

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import "../styles/globals.css"; // Ajoute ton CSS global ici

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* Enveloppe le contenu de l'application avec SessionProvider */}
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
