import React, { useState } from "react";
import PokemonCard from "./PokemonCard";

const PokemonListItem = ({ pokemon }) => {
  const firstType = pokemon.types[0].type.name;
  const bgColorMap = {
    normal: "#BE768A",
    fighting: "#FE6E44",
    flying: "#94B2C7",
    poison: "#A971F0",
    ground: "#D08831 ",
    rock: "#A43E19",
    bug: "#45A043",
    ghost: "#906791",
    steel: "#1DB07F",
    fire: "#FF5C5C",
    water: "#6DCBFF",
    grass: "#06DA81",
    electric: "#FFDC62",
    psychic: "#F334C9",
    ice: "#ADE3FB",
    dragon: "#62CAD9",
    dark: "#595978",
    fairy: "#FA5295",
    stellar: "#33336B",
    unknown: "#707070",
  };

  const bgColorClass = bgColorMap[firstType];

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleOpenModal = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div
      onClick={() => handleOpenModal(pokemon)} // Added click handler to open modal
      style={{ backgroundColor: bgColorClass }}
      className="relative pt-2 px-4 w-56 h-40 rounded-xl overflow-hidden shadow-md cursor-pointer" // Added cursor-pointer class for better UX
    >
      <div id="details" className="flex flex-col">
        <h3 className="mb-3 capitalize font-bold text-xl text-white">
          {pokemon.name}
        </h3>

        <div id="types" className="flex flex-col gap-3">
          {pokemon.types.map((type) => (
            <span
              key={type.slot}
              className="bg-white/60 text-gray-500 px-3 py-1 rounded-full text-sm self-start capitalize"
            >
              {type.type.name}
            </span>
          ))}
          {selectedPokemon && (
            <PokemonCard pokemon={selectedPokemon} onClose={handleCloseModal} />
          )}
        </div>
      </div>
      <div className="absolute bottom-9 right-5 left-auto top-auto">
        <img
          src={
            pokemon.sprites.other.dream_world.front_default
              ? pokemon.sprites.other.dream_world.front_default
              : pokemon.sprites.front_default
          }
          alt={pokemon.name}
          className="w-20 h-auto"
        />
      </div>
      <div className="absolute inset-20 w-72 h-20 bg-white transform -rotate-12 -translate-y-5 -translate-x-24  opacity-15"></div>
    </div>
  );
};

export default PokemonListItem;
