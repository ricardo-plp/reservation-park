// src/app/profile/edit.tsx
"use client";

import { useState, useEffect } from "react";

const ProfileEdit = () => {
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // On récupère les informations de l'utilisateur connecté au chargement de la page
    const fetchUserData = async () => {
      const response = await fetch("/api/users/me");
      if (response.ok) {
        const data = await response.json();
        setEmail(data.email);
        setPrenom(data.prenom);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/users/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        prenom,
        motdepasse,
      }),
    });

    if (response.ok) {
      setMessage("Profil mis à jour avec succès !");
    } else {
      const errorData = await response.json();
      setMessage(`Erreur : ${errorData.error}`);
    }
  };

  return (
    <div>
      <h1>Modifier mon profil</h1>
      <form onSubmit={handleUpdateProfile}>
        <label>
          Prénom :
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </label>

        <label>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Nouveau mot de passe :
          <input
            type="password"
            value={motdepasse}
            onChange={(e) => setMotdepasse(e.target.value)}
            required
          />
        </label>

        <button type="submit">Mettre à jour</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfileEdit;
