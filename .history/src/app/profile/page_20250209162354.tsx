import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const email = "tchamgouericardo@gmail.com"; // Email de l'utilisateur connecté
      try {
        const response = await fetch(`/api/users/${email}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setError("Utilisateur non trouvé");
        }
      } catch (err) {
        setError("Erreur serveur");
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>
        Profil de {user.prenom} {user.nom}
      </h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
