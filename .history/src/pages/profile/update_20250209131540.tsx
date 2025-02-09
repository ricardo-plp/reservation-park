// src/pages/profile/update.tsx

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const UpdateProfile = () => {
  const { data: session } = useSession(); // Vérifie si l'utilisateur est connecté
  const router = useRouter();
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");

  if (!session) {
    router.push("/auth/signin"); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/users/${session.user.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        prenom,
        motdepasse,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Profil mis à jour avec succès!");
    } else {
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <div>
      <h1>Modifier le Profil</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Prénom:
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe:
          <input
            type="password"
            value={motdepasse}
            onChange={(e) => setMotdepasse(e.target.value)}
            required
          />
        </label>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
