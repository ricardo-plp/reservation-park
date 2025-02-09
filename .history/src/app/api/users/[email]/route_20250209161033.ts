// src/pages/api/users/[email].ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// Simule la mise à jour dans une base de données (ajuste cela selon ta DB)
const updateUser = async (email: string, data: any) => {
  try {
    // Ici tu devrais appeler ta base de données pour mettre à jour les informations de l'utilisateur
    console.log(`Mise à jour de l'utilisateur avec l'email: ${email}`, data);
    // Simuler la mise à jour d'utilisateur (à remplacer par une vraie logique DB)
    return true;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    throw new Error("Erreur lors de la mise à jour de l'utilisateur");
  }
};

// Simule la suppression dans une base de données (ajuste cela selon ta DB)
const deleteUser = async (email: string) => {
  try {
    // Ici tu devrais appeler ta base de données pour supprimer l'utilisateur
    console.log(`Suppression de l'utilisateur avec l'email: ${email}`);
    // Simuler la suppression d'utilisateur (à remplacer par une vraie logique DB)
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur", error);
    throw new Error("Erreur lors de la suppression de l'utilisateur");
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query; // Récupère l'email depuis l'URL de la requête (par exemple /api/users/[email])

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email invalide" });
  }

  // Récupère la session de l'utilisateur
  const session = await getSession({ req });

  // Vérifie si l'utilisateur est connecté et si l'email dans la session correspond à l'email de la requête
  if (!session || session.user.email !== email) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  // Si la méthode est DELETE, on supprime l'utilisateur
  if (req.method === "DELETE") {
    try {
      // Suppression de l'utilisateur
      const isDeleted = await deleteUser(email);

      if (isDeleted) {
        return res.status(200).json({ message: "Profil supprimé avec succès" });
      } else {
        return res
          .status(500)
          .json({ error: "Erreur lors de la suppression du profil" });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Si la méthode est PUT, on met à jour les informations de l'utilisateur
  else if (req.method === "PUT") {
    try {
      // On récupère les nouvelles informations pour la mise à jour
      const { name, prenom } = req.body;

      if (!name || !prenom) {
        return res
          .status(400)
          .json({ error: "Les informations sont incomplètes" });
      }

      const isUpdated = await updateUser(email, { name, prenom });

      if (isUpdated) {
        return res
          .status(200)
          .json({ message: "Profil mis à jour avec succès" });
      } else {
        return res
          .status(500)
          .json({ error: "Erreur lors de la mise à jour du profil" });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  } else {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
}
