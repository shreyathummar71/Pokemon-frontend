import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [username, setUsername] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [detailedPokemons, setDetailedPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("username"));
    setUsername(user);
  }, []);

  useEffect(() => {
    const getPokemons = async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?offset=500&limit=500"
      );
      const data = await res.json();
      setPokemons(data.results);
    };

    getPokemons();
  }, []);

  useEffect(() => {
    if (pokemons.length) {
      const getDetailedPokemonData = async () => {
        const detailedPromise = pokemons.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        const details = await Promise.all(detailedPromise);
        setDetailedPokemons(details);
        //console.log(details);
      };
      getDetailedPokemonData();
    }
  }, [pokemons]);

  //console.log(detailedPokemons);

  return (
    <div className="min-h-screen">
      <Header username={username} isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <Outlet
        context={{
          username,
          setUsername,
          detailedPokemons,
          setDetailedPokemons,
          selectedType,
          setSelectedType,
        }}
      />
      <Sidebar
        isOpen={isOpen}
        closeDrawer={closeDrawer}
        onTypeSelect={setSelectedType}
      />
    </div>
  );
};

export default MainLayout;
