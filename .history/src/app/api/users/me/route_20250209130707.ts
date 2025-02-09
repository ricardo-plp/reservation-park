// src/app/api/users/me/route.ts
import { prisma } from "../../../../lib/prisma";
import { getSession } from "next-auth/react";
import bcrypt from "bcrypt";

export async function PUT(req: Request) {
  const { email, prenom, motdepasse } = await req.json();

  const session = await getSession();
  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({ error: "Utilisateur non authentifié" }),
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "Utilisateur non trouvé" }), {
      status: 404,
    });
  }

  let updatedUser = { email, prenom };

  if (motdepasse) {
    updatedUser.motdepasse = await bcrypt.hash(motdepasse, 10); // Hashage du mot de passe
  }

  const updatedUserData = await prisma.user.update({
    where: { email: session.user.email },
    data: updatedUser,
  });

  return new Response(JSON.stringify(updatedUserData), { status: 200 });
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({ error: "Utilisateur non authentifié" }),
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "Utilisateur non trouvé" }), {
      status: 404,
    });
  }

  // Suppression de l'utilisateur
  await prisma.user.delete({
    where: { email: session.user.email },
  });

  return new Response(
    JSON.stringify({ message: "Compte supprimé avec succès" }),
    { status: 200 }
  );
}
