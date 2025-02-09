// src/app/api/users/[email]/route.ts

import { prisma } from "@/lib/prisma"; // Assurez-vous d'importer correctement prisma
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  const { email } = params; // Récupère l'email depuis les paramètres de l'URL

  try {
    // Recherche l'utilisateur par son email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
