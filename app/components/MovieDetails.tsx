import { MovieDetails as MovieDetailsType } from '~/utils/tmdb';
import ActorImage from '~/components/ActorImage';

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <p className="text-lg mb-4">{movie.overview}</p>
          <p className="mb-2">
            <span className="font-bold">Release Date:</span>{' '}
            {movie.release_date}
          </p>
          <p className="mb-2">
            <span className="font-bold">Runtime:</span> {movie.runtime} minutes
          </p>
          <p className="mb-4">
            <span className="font-bold">Genres:</span>{' '}
            {movie.genres.map((genre) => genre.name).join(', ')}
          </p>
          {movie.videos.results.length > 0 && (
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Trailer</h2>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">Cast</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {movie.credits.cast.slice(0, 6).map((actor) => (
              <li key={actor.id} className="flex items-center gap-2">
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
  );
};

export default MovieDetails;
