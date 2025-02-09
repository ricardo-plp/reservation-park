"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">
        Déconnexion
      </button>
    );
  }

  return (
    <button onClick={() => signIn()} className="bg-blue-500 text-white px-4 py-2 rounded">
      Connexion
    </button>
  );
}
