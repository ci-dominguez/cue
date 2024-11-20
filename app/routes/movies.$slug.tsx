import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getMovieDetails } from '~/utils/tmdb';
import MovieDetails from '~/components/MovieDetails';

export const loader: LoaderFunction = async ({ params }) => {
  const movieId = params.slug;
  if (!movieId) {
    throw new Response('Not Found', { status: 404 });
  }
  const movie = await getMovieDetails(parseInt(movieId, 10));
  return { movie };
};

export default function MovieRoute() {
  const { movie } = useLoaderData<typeof loader>();
  return <MovieDetails movie={movie} />;
}
