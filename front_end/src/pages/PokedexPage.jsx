import { useEffect, useState } from "react";
import { pokedexApi } from "../components/utilities";
import PokemonCard from "../components/PokemonCard";
import Button from "react-bootstrap/Button";
import Sound from 'react-audio-player';
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import pokedexMusic from '/src/assets/BackgroundMusic/soft-game-theme-loop.wav'


const PokedexPage = () => {
  const [pokemons, setPokemons] = useState();
  const { isLoggedIn } = useOutletContext()

  const navigate = useNavigate()

  const getPokedex = async () => {
    try {
      const response = await pokedexApi.get("");
      setPokemons(response.data);
    } catch (error) {
      console.error("Error fetching data from pokedex", error);
    }
  };

  useEffect(() => {
    getPokedex();
  }, []);

  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]); // Log pokemons whenever it changes

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/landing')
    }
  }, [])

  return (
    <div className='full_page_div'>
      <audio autoPlay src={pokedexMusic} loop type="audio/wav" volume='0.2'></audio>
      <div id='pokedex_div'>
        <div id='pokedex_inner_div'>
          {pokemons && pokemons.length > 0 ? (
            pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                type={pokemon.type}
                back_img={pokemon.back_img}
                front_img={pokemon.front_img}
                move_1={pokemon.move_1}
                move_2={pokemon.move_2}
              />
            ))
          ) : (
            <h3>No Pokemon in Pokedex</h3>
          )}
        </div>
        <div id='pokedex_button_div'><Link to='/main'><button id='pokedex_button'>Return</button></Link></div>
      </div>
    </div>
  );
};

export default PokedexPage;
