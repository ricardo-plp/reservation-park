// src/pages/profile/update.tsx



import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const UpdateProfile = () => {
  const { data: session } = useSession(); // Vérifier si l'utilisateur est connecté
  const router = useRouter();
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");

  // Si l'utilisateur n'est pas connecté, le rediriger vers la page de connexion
  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`/api/users/${session.user.email}`, {
      method: "PUT", // Utiliser PUT pour mettre à jour
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        prenom,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Profil mis à jour", data);
    } else {
      console.error("Erreur lors de la mise à jour", data.error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <label>
        Prénom :
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
      </label>

      <label>
        Email :
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <button type="submit">Mettre à jour</button>
    </form>
  );
};

export default UpdateProfile;
