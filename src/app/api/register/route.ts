import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { prenom, nom, email, motdepasse } = await req.json();
  const hashedPassword = await bcrypt.hash(motdepasse, 10);

  const user = await prisma.user.create({
    data: { prenom, nom, email, motdepasse: hashedPassword, role: "USER" },
  });

  return NextResponse.json(user);
}
