import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, prenom, motdepasse } = await req.json();

    // Vérification si tous les champs sont fournis
    if (!email || !prenom || !motdepasse) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        prenom, // Vérifie que le champ est bien utilisé ici
        nom,
        motdepasse: hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création du compte." },
      { status: 500 }
    );
  }
}
