// src/app/signup/page.tsx

"use client";

import { useState } from "react";

const SignUpPage = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prenom, nom, email, motdepasse }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Utilisateur créé avec succès");
    } else {
      const error = await response.json();
      alert(error.error || "Erreur lors de la création de l'utilisateur");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Prénom:</label>
      <input
        type="text"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        required
      />
      <label>Nom:</label>
      <input
        type="text"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Mot de passe:</label>
      <input
        type="password"
        value={motdepasse}
        onChange={(e) => setMotdepasse(e.target.value)}
        required
      />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default SignUpPage;
