// src/app/profile/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (session?.user?.email) {
      // Ici tu récupères les informations de l'utilisateur à partir de ton API
      fetch(`/api/users/${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [session]);

  if (!session) {
    return <p>Vous devez être connecté pour voir cette page</p>;
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Code pour envoyer les nouvelles données de profil à l'API
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold">Mon Profil</h1>
      {user && (
        <form onSubmit={handleUpdate} className="space-y-4 mt-4">
          <div>
            <label htmlFor="name" className="block">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={user.name}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="" className="block">
              Prenom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={user.prenom}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              defaultValue={user.email}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Mettre à jour mon profil
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
