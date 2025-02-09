-// src/pages/api/users/[email].ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// Simule la suppression dans une base de données (ajuste cela selon ta DB)
const deleteUser = async (email: string) => {
  // Suppression de l'utilisateur dans la base de données
  console.log(`Suppression de l'utilisateur avec l'email: ${email}`);
  return true; // Simuler une suppression réussie
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  const session = await getSession({ req });
  
  if (!session || session.user.email !== email) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  if (req.method === "DELETE") {
    try {
      const isDeleted = await deleteUser(email as string);
      
      if (isDeleted) {
        res.status(200).json({ message: "Profil supprimé avec succès" });
      } else {
        res.status(500).json({ error: "Erreur lors de la suppression du profil" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
}
