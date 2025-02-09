// src/components/Navbar.tsx


import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession(); // Récupère les informations de la session

  return (
    <nav>
      <ul style={{ listStyle: "none", display: "flex", gap: "15px" }}>
        <li>
          <Link href="/">Home</Link>
        </li>

        {session ? (
          <>
            <li>
              <Link href="/profile">Mon Profil</Link>
            </li>
            <li>
              <Link href="/profile/update">Modifier mon profil</Link>
            </li>
            <li>
              <Link href="/profile/delete">Supprimer mon profil</Link>
            </li>
            <li>
              <button onClick={() => signOut()}>Déconnexion</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/auth/signin">Connexion</Link>
            </li>
            <li>
              <Link href="/auth/signup">Créer un compte</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
