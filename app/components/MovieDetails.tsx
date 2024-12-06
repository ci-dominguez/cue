import { MovieDetails as MovieDetailsType } from '~/utils/tmdb';
import ActorImage from '~/components/ActorImage';
import { Calendar1Icon, Clock, Star } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  return (
    <div className='grid md:grid-cols-3 gap-10 w-full max-w-screen-xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16'>
      <div className='md:col-span-1'>
        <div className='sticky top-8'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
            width={400}
            height={600}
            className='rounded-lg shadow-lg'
          />
          <div className='mt-4 space-y-2'>
            <div className='flex items-center'>
              <Star className='text-yellow-500 fill-yellow-500 mr-1' />
              <span className='font-semibold'>
                {movie.vote_average!.toString().slice(0, 3) || 0}
              </span>
            </div>
            <div className='flex items-center'>
              <Clock className='text-muted-foreground mr-1' />
              <span>{movie.runtime} minutes</span>
            </div>
            <div className='flex items-center'>
              <Calendar1Icon className='text-muted-foreground mr-1' />
              <span>{movie.release_date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='md:col-span-2'>
        <h1 className='flex font-lora font-semibold text-4xl items-center space-x-1.5'>
          <span>{movie.title}</span>
          <FavoriteButton
            item={{
              ...movie,
              media_type: 'movie',
              poster_path: movie.poster_path ?? undefined,
            }}
          />
        </h1>
        <div className='flex flex-wrap gap-2 pt-4 pb-10'>
          {movie.genres.map((genre) => (
            <span
              key={genre.id}
              className='rounded-full py-1 px-4 bg-content-1'
            >
              {genre.name}
            </span>
          ))}
        </div>
        <p>{movie.overview}</p>

        <div className='w-full pt-10'>
          {movie.videos.results.length > 0 && (
            <div className='mb-4'>
              <h2 className='font-lora text-2xl font-semibold mb-2'>Trailer</h2>
              <iframe
                width='100%'
                height='315'
                src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
          )}
          <div className='mt-10'>
            <h2 className='font-lora text-2xl font-semibold mb-2'>Cast</h2>
            <ul className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {movie.credits.cast.slice(0, 6).map((actor) => (
                <li key={actor.id} className='flex items-center gap-2'>
                  <ActorImage
                    profilePath={actor.profile_path}
                    name={actor.name}
                  />
                  <span>{actor.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
