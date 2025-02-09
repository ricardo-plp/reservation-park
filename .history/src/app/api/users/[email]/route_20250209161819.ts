// src/app/api/users/[email]/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import bcrypt from "bcryptjs"; // Pour le hachage du mot de passe
import { prisma } from "../../../lib/prisma"; // Si tu utilises Prisma, sinon adapte cela à ton ORM

// Fonction pour mettre à jour un utilisateur
const updateUser = async (
  email: string,
  {
    name,
    prenom,
    newEmail,
    newPassword,
  }: { name: string; prenom: string; newEmail: string; newPassword: string }
) => {
  // Vérification de la base de données pour trouver l'utilisateur
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  // Hachage du nouveau mot de passe si un nouveau mot de passe est fourni
  let hashedPassword = user.password;
  if (newPassword) {
    hashedPassword = await bcrypt.hash(newPassword, 10); // Utilise un salt de 10 pour hacher le mot de passe
  }

  // Mise à jour des informations de l'utilisateur dans la base de données
  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      name,
      prenom,
      email: newEmail || user.email, // On met à jour l'email si un nouveau email est fourni
      password: hashedPassword, // On met à jour le mot de passe seulement s'il est fourni
    },
  });

  return updatedUser;
};

// Fonction handler pour gérer la mise à jour du profil
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email invalide" });
  }

  // Vérifie si l'utilisateur est authentifié
  const session = await getSession({ req });
  if (!session || session.user.email !== email) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  try {
    // Récupérer les données du corps de la requête (nom, prénom, email, mot de passe)
    const { name, prenom, newEmail, newPassword } = req.body;

    // Vérifie que toutes les informations nécessaires sont présentes
    if (!name || !prenom || !newEmail) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    // Appel de la fonction pour mettre à jour l'utilisateur dans la base de données
    const updatedUser = await updateUser(email as string, {
      name,
      prenom,
      newEmail,
      newPassword,
    });

    // Retourne une réponse de succès avec les informations mises à jour
    return res.status(200).json({
      message: "Profil mis à jour avec succès",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
