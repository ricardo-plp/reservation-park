

import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; 
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email et mot de passe sont requis" },
      { status: 400 }
    );
  }

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Cet email est déjà utilisé" },
      { status: 400 }
    );
  }


  const hashedPassword = await bcrypt.hash(password, 10);

 
  const user = await prisma.user.create({
    data: {
      email,
      motdepasse: hashedPassword,
      role: "USER", // Tu peux personnaliser le rôle par défaut ici
    },
  });

  // Retourner une réponse de succès
  return NextResponse.json(
    { message: "Utilisateur créé avec succès" },
    { status: 200 }
  );
}
