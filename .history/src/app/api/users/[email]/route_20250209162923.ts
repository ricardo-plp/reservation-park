// src/app/api/users/[email]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

// Cette fonction gère l'API de mise à jour et de récupération du profil de l'utilisateur
export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params; // Récupère l'email des paramètres de l'URL

  const session = await getSession({ req });

  if (!session || session.user.email !== email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    // Simuler la récupération des données utilisateur (remplacer par ta logique d'accès à la base de données)
    const user = { email, name: "John Doe", prenom: "John" }; // Exemple de données utilisateur
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données utilisateur" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params; // Récupère l'email des paramètres de l'URL
  const session = await getSession({ req });

  if (!session || session.user.email !== email) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, prenom } = body;

    // Ici, tu dois mettre à jour les informations de l'utilisateur dans ta base de données
    // Exemple de mise à jour simulée
    const updatedUser = { email, name, prenom };

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du profil" },
      { status: 500 }
    );
  }
}
