import { ShowDetails as ShowDetailsType } from '~/utils/tmdb';
import ActorImage from './ActorImage';

interface ShowDetailsProps {
  show: ShowDetailsType;
}

const ShowDetails = ({ show }: ShowDetailsProps) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{show.name}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={show.name}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <p className="text-lg mb-4">{show.overview}</p>
          <p className="mb-2">
            <span className="font-bold">First Air Date:</span>{' '}
            {show.first_air_date}
          </p>
          <p className="mb-2">
            <span className="font-bold">Last Air Date:</span>{' '}
            {show.last_air_date}
          </p>
          <p className="mb-2">
            <span className="font-bold">Number of Seasons:</span>{' '}
            {show.number_of_seasons}
          </p>
          <p className="mb-2">
            <span className="font-bold">Number of Episodes:</span>{' '}
            {show.number_of_episodes}
          </p>
          <p className="mb-4">
            <span className="font-bold">Genres:</span>{' '}
            {show.genres.map((genre) => genre.name).join(', ')}
          </p>
          {show.videos.results.length > 0 && (
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Trailer</h2>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${show.videos.results[0].key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">Cast</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {show.credits.cast.slice(0, 6).map((actor) => (
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

export default ShowDetails;
