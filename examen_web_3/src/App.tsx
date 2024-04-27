import React, { useState, useEffect } from 'react';
import PokemonModal from './components/carta';
import Generacion from './components/generacion';
import './App.css';

interface Pokemon {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [generacionSeleccionada, setGeneracionSeleccionada] = useState<number | null>(null);

  useEffect(() => {
    if (generacionSeleccionada !== null) {
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${(generacionSeleccionada - 1) * 151}&limit=151`;

      fetch(url)
        .then(response => response.json())
        .then((data) => setPokemonList(data.results))
        .catch(error => console.error('Error fetching Pokemon list:', error));
    }
  }, [generacionSeleccionada]);

  const handleGeneracionChange = (generacion: number) => {
    setGeneracionSeleccionada(generacion);
    setSelectedPokemon(null);
  };

  const openModal = (url: string) => {
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        setSelectedPokemon(data);
      })
      .catch(error => console.error('Error fetching Pokemon details:', error));
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="container mt-4">
      {/* Imagen de Pokémon al inicio */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
        alt="Pokemon"
        className="img-fluid mb-3"
        style={{ maxWidth: '400px' }}
      />

      {/* Mensaje de incentivo */}
      <p className="text-center mb-3">¡Selecciona una generación para explorar los Pokémon!</p>

      {/* Generación Dropdown */}
      <Generacion onGeneracionChange={handleGeneracionChange} />

      {/* Espacio adicional */}
      <div style={{ marginBottom: '20px' }}></div>

      {/* Renderiza los Pokémon */}
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.name} className="col">
            <div className="card h-100" onClick={() => openModal(pokemon.url)}>
              <img
                src={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name.toLowerCase()}.png`}
                alt={pokemon.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para mostrar detalles del Pokémon */}
      <PokemonModal show={selectedPokemon !== null} onHide={closeModal} pokemonData={selectedPokemon} />
    </div>
  );
};

export default App;
