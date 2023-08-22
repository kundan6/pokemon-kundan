import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import PokemonCard from './PokemonCard';
import { Spinner } from './Spinner';
import { Layout } from './Layout';

export const PokemonList = () => {
  const [offset, setOffset] = useState(20);
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    ['pokemons'],
    async ({ pageParam = 0 }) => {
      const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${pageParam}`
      ).then(res => res.json());
      return data;
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.next
    }
  );

  const loadMore = () => {
    setOffset(prevOffset => prevOffset + 20);
    fetchNextPage({ pageParam: offset });
  };

  return (
    <Layout>
      {status === 'loading' && <Spinner />}
      {status === 'error' && <h1> Error </h1>}
      {status === 'success' && (
        <>
          <div className="px-3 grid grid-cols-2 gap-4 md:px-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.pages.map(page =>
              page.results.map((pokemon, i) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
              ))
            )}
          </div>
          <button
            className="bg-gray-300 hover:bg-gray-400 transition-colors duration-300 text-gray-800 font-medium py-2 px-4 my-8 rounded block mx-auto"
            onClick={loadMore}
          >
            {isFetchingNextPage
              ? 'Loading...'
              : hasNextPage
              ? 'Load more'
              : 'Nothing to load'}
          </button>
        </>
      )}
    </Layout>
  );
};
