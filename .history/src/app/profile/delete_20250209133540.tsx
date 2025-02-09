// src/pages/profile/delete.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DeleteProfile = () => {
  const { data: session } = useSession(); // Vérifie si l'utilisateur est connecté
  const router = useRouter();

  if (!session) {
    router.push("/auth/signin"); // Redirige l'utilisateur non connecté vers la page de connexion
    return null;
  }

  const handleDelete = async () => {
    // Demander à l'utilisateur une confirmation avant la suppression
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre profil ?"
    );
    if (!confirmed) return;

    // Envoie de la requête pour supprimer le profil
    const response = await fetch(`/api/users/${session.user.email}`, {
      method: "DELETE", // Utiliser DELETE pour supprimer
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Profil supprimé");
      router.push("/auth/signin"); // Rediriger l'utilisateur vers la page de connexion après suppression
    } else {
      console.error("Erreur lors de la suppression", data.error);
    }
  };

  return (
    <div>
      <h1>Supprimer votre profil</h1>
      <button onClick={handleDelete}>Supprimer mon profil</button>
    </div>
  );
};

export default DeleteProfile;
