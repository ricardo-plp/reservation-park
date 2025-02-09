// src/app/profile/delete.tsx
"use client";

import { useState } from "react";

const ProfileDelete = () => {
  const [message, setMessage] = useState("");

  const handleDeleteProfile = async () => {
    const response = await fetch("/api/users/me", {
      method: "DELETE",
    });

    if (response.ok) {
      setMessage("Compte supprimé avec succès.");
    } else {
      const errorData = await response.json();
      setMessage(`Erreur : ${errorData.error}`);
    }
  };

  return (
    <div>
      <h1>Supprimer mon profil</h1>
      <button onClick={handleDeleteProfile}>Supprimer mon compte</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfileDelete;
