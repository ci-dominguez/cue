import type { MetaFunction } from '@remix-run/node';
import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { getMovieDetails, getRecommendations } from '~/utils/tmdb';
import MovieDetails from '~/components/MovieDetails';
import Recommendations from '~/components/Recommendations';
import { addRecentlyViewed } from '~/utils/localStorage';

export const loader: LoaderFunction = async ({ params }) => {
  const movieId = params.slug;
  if (!movieId) {
    throw new Response('Not Found', { status: 404 });
  }
  const movie = await getMovieDetails(parseInt(movieId, 10));
  const recs = await getRecommendations(movie.id, 'movie');

  return { movie, recs };
};

export const meta: MetaFunction = () => {
  return [
    {
      description: `Discover more hidden gems by using Cue. Learn about the cast, plot, and more through our platform.`,
    },
  ];
};

export default function MovieRoute() {
  const { movie, recs } = useLoaderData<typeof loader>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (recs) setIsLoading(false);
  }, [recs]);

  useEffect(() => {
    document.title = `${movie.title} - Move Details | Cue`;
    addRecentlyViewed(movie);
  });

  return (
    <div>
      <section className='w-full max-w-screen-2xl mx-auto pb-6 sm:pb-10 md:pb-12 lg:pb-18'>
        <MovieDetails movie={movie} />
      </section>
      <section className='flex bg-stone-800 text-content'>
        <div className='w-full max-w-screen-2xl mx-auto py-6 sm:py-10 md:py-12 lg:py-18'>
          <div className='w-full max-w-screen-xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16'>
            <h2
              id='search'
              className='font-lora pb-10 font-semibold tracking-tight text-2xl md:text-3xl lg:text-4xl'
            >
              Movies You Might Like
            </h2>
            <Recommendations
              recommendations={recs}
              isLoading={isLoading}
              variant='default'
            />
          </div>
        </div>
      </section>
    </div>
  );
}
