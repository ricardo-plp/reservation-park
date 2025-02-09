import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, prenom, motdepasse }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      setSuccess("Inscription réussie !");
      setEmail("");
      setPrenom("");
      setMotdepasse("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <label htmlFor="email">Email :</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label htmlFor="prenom">Prénom :</label>
        <input
          id="prenom"
          type="text"
          name="prenom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          autoComplete="given-name"
          required
        />
      </div>

      <div>
        <label htmlFor="motdepasse">Mot de passe :</label>
        <input
          id="motdepasse"
          type="password"
          name="motdepasse"
          value={motdepasse}
          onChange={(e) => setMotdepasse(e.target.value)}
          autoComplete="new-password"
          required
        />
      </div>

      <button type="submit">S'inscrire</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default SignUp;
