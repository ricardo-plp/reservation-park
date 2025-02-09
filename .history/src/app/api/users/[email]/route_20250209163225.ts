import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

// Fonction pour récupérer l'utilisateur
export async function GET(
  req: NextRequest,
  context: { params: { email: string } }
) {
  const { email } = context.params; // Utilisation correcte de params après avoir attendu

  const session = await getSession({ req });

  // Vérifie si l'utilisateur est bien authentifié et correspond à l'email dans l'URL
  if (!session || session.user.email !== email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    // Simule la récupération des informations de l'utilisateur
    const user = { email, name: "John Doe", prenom: "John" }; // Simuler un utilisateur
    return NextResponse.json(user); // Retourne les informations de l'utilisateur
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données utilisateur" },
      { status: 500 }
    );
  }
}

// Fonction pour mettre à jour l'utilisateur
export async function PUT(
  req: NextRequest,
  context: { params: { email: string } }
) {
  const { email } = context.params; // Utilisation correcte de params après avoir attendu

  const session = await getSession({ req });

  // Vérifie si l'utilisateur est bien authentifié et correspond à l'email dans l'URL
  if (!session || session.user.email !== email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json(); // Récupère les données envoyées dans la requête PUT
    const { name, prenom } = body; // Les données à mettre à jour

    // Ici tu devrais mettre à jour les données dans ta base de données
    const updatedUser = { email, name, prenom };

    return NextResponse.json(updatedUser); // Retourne les données mises à jour
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du profil" },
      { status: 500 }
    );
  }
}
