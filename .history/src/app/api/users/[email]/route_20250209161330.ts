// src/app/api/users/[email]/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// Simule la mise à jour dans une base de données (ajuste cela selon ta DB)
const updateUser = async (email: string, data: any) => {
  try {
    console.log(`Mise à jour de l'utilisateur avec l'email: ${email}`, data);
    return true;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    throw new Error("Erreur lors de la mise à jour de l'utilisateur");
  }
};

// Simule la suppression dans une base de données (ajuste cela selon ta DB)
const deleteUser = async (email: string) => {
  try {
    console.log(
      `Tentative de suppression de l'utilisateur avec l'email: ${email}`
    );
    // Ajoute ici la logique réelle pour supprimer l'utilisateur de ta DB
    // Exemple :
    // await db.users.delete({ where: { email: email } });

    console.log("Suppression réussie de l'utilisateur.");
    return true; // Simuler une suppression réussie
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur", error);
    throw new Error("Erreur lors de la suppression de l'utilisateur");
  }
};

// Handle PUT requests (update profile)
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email invalide" });
  }

  const session = await getSession({ req });

  if (!session || session.user.email !== email) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  try {
    const { name, prenom } = req.body;
    if (!name || !prenom) {
      return res
        .status(400)
        .json({ error: "Les informations sont incomplètes" });
    }

    const isUpdated = await updateUser(email as string, { name, prenom });

    if (isUpdated) {
      return res.status(200).json({ message: "Profil mis à jour avec succès" });
    } else {
      return res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour du profil" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

// Handle DELETE requests (delete profile)
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email invalide" });
  }

  const session = await getSession({ req });

  if (!session || session.user.email !== email) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  try {
    console.log("Début de la suppression de l'utilisateur...");
    const isDeleted = await deleteUser(email as string);

    if (isDeleted) {
      console.log("Utilisateur supprimé avec succès.");
      return res.status(200).json({ message: "Profil supprimé avec succès" });
    } else {
      console.log("Échec de la suppression de l'utilisateur.");
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression du profil" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
