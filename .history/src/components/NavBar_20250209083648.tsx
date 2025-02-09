// src/components/Navbar.tsx

"use client"; 

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link href="/" className="text-white">
            Accueil
          </Link>
        </li>
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
      </ul>
    </nav>
  );
};

export default Navbar;
