// src/pages/profile/delete.tsx

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DeleteProfile = () => {
  const { data: session } = useSession(); // Vérifie si l'utilisateur est connecté
  const router = useRouter();

  if (!session) {
    router.push("/auth/signin"); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
  }

  const handleDelete = async () => {
    const response = await fetch(`/api/users/${session.user.email}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      alert("Profil supprimé avec succès!");
      router.push("/auth/signin"); // Redirige après suppression
    } else {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div>
      <h1>Supprimer le Profil</h1>
      <button onClick={handleDelete}>Confirmer la suppression</button>
    </div>
  );
};

export default DeleteProfile;
