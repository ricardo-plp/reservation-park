// src/app/api/users/[email]/route.ts

import { prisma } from "../../../../lib/prisma"; // Assure-toi que tu importes bien prisma
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(
  req: Request,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  const { prenom, motdepasse } = await req.json();

  try {
    const hashedPassword = motdepasse
      ? await bcrypt.hash(motdepasse, 10)
      : undefined;
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        prenom,
        motdepasse: hashedPassword,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
