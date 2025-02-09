"use client";

import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState(""); // Ajouter l'état pour le prénom
  const [motdepasse, setMotdepasse] = useState("");

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        prenom, // Envoyer le prénom
        motdepasse,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Inscription réussie", data);
    } else {
      console.error("Erreur :", data.error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
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
        Prénom : {/* Ajouter le champ prénom */}
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
      </label>

      <label>
        Mot de passe :
        <input
          type="password"
          value={motdepasse}
          onChange={(e) => setMotdepasse(e.target.value)}
          required
        />
      </label>

      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default SignUp;
