// src/components/Navbar.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link href="/" className="text-white">
            Accueil
          </Link>
        </li>
        {session ? (
          <>
            <li>
              <Link href="/profile" className="text-white">
                Mon Profil
              </Link>
            </li>
            <li>
              <button onClick={() => signOut()} className="text-white">
                Déconnexion
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/api/auth/signin" className="text-white">
                Connexion
              </Link>
            </li>
            <li>
              <Link href="/signup" className="text-white">
                Créer un compte
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
