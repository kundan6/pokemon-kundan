import React from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

const getPokemon = async ({ queryKey: params }) => {
  const data = await fetch(params[1]).then((res) => res.json());
  return data;
};

const PokemonCard = ({ pokemon }) => {
  const { data, status, isLoading } = useQuery(
    ['pokemon', pokemon.url],
    getPokemon
  );
  const history = useHistory();

  return (
    <>
      <div
        className={`group shadow-md max-w-sm rounded-md p-5 transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-200 hover:to-gray-400 cursor-pointer hover:shadow-xl relative`}
        onClick={() => history.push(`/pokemon/${pokemon.name}`)}
      >
        {status === 'loading' && (
          <div
            className="bg-gray-100 animate-pulse"
            style={{ minHeight: '10rem' }}
          ></div>
        )}
        {status === 'error' && <h1> Error </h1>}
        {status === 'success' && (
          <div className="h-30 w-30">
            <h6 className="font-space z-10 absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-indigo-700 text-red-50 px-3 capitalize rounded-tl-md">
              {pokemon.name}
            </h6>
            <img
              src={data.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              loading="lazy"
              className="transition-transform transform duration-300 hover:scale-110 w-full h-full"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PokemonCard;
