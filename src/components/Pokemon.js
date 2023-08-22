import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { Spinner } from './Spinner';
import { Layout } from './Layout';
import { Img } from './Img';

const getPokemon = async ({ queryKey: params }) => {
  const data = await fetch(
    'https://pokeapi.co/api/v2/pokemon/' + params[1]
  ).then((res) => res.json());
  return data;
};

export const Pokemon = ({ location }) => {
  const pokemonName = location.pathname.slice(9);
  const { data: pokemon, status } = useQuery(
    ['pokemon', pokemonName],
    getPokemon
  );

  return (
    <Layout>
      {status === 'loading' && <Spinner />}
      {status === 'error' && 'error'}
      {status === 'success' && (
        <div className="container px-5  mx-auto max-w-4xl">
          <h1 className="text-center text-4xl capitalize font-bold text-gray-600">
            {pokemon.name}
          </h1>
          <div className="rounded-md flex justify-between mt-10">
            <Img
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
              className="h-60 w-60 border "
            />
            <div className="border  flex-1">
              <div>
                <h6 className="font-semibold p-1">Height :{pokemon.height}</h6>
              </div>
              <div>
                <h6 className="font-semibold p-1">Weight : {pokemon.weight}</h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
