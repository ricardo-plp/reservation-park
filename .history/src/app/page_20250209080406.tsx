// src/app/home/page.tsx

import Navbar from "../../components/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="text-center mt-12">
        <h1 className="text-3xl font-bold">Bienvenue sur notre application !</h1>
        <p className="mt-4">Veuillez vous connecter ou créer un compte pour commencer.</p>
      </div>
    </div>
  );
};

export default HomePage;
