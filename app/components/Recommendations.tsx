import { Link } from '@remix-run/react';
import { Star } from 'lucide-react';
import { SearchResult } from '~/utils/tmdb';
import FavoriteButton from './FavoriteButton';

interface RecommendationsProps {
  recommendations: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

const Recommendations = ({
  recommendations,
  isLoading,
  error,
}: RecommendationsProps) => {
  if (isLoading) {
    return <div className='text-center py-4'>Loading recommendations...</div>;
  }

  if (error) {
    return <div className='text-center py-4 text-red-500'>{error}</div>;
  }

  if (recommendations.length === 0) {
    return <div className='text-center py-4'>No recommendations found.</div>;
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 max-w-7xl mx-auto'>
      {recommendations.map((item) => (
        <div key={item.id} className='overflow-hidden flex flex-col'>
          {item.poster_path && (
            <Link
              to={`/${item.media_type}s/${item.id}`}
              className='aspect-w-2 aspect-h-3'
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className='w-full h-full object-cover rounded'
              />
            </Link>
          )}
          <div className='flex flex-col flex-grow pt-2'>
            <Link to={`/${item.media_type}s/${item.id}`} className='self-start'>
              <h3 className='text-xl mb-2 flex-grow font-lora font-semibold hover:underline'>
                {item.title}
              </h3>
            </Link>

            <div className='flex justify-between mt-auto font-bold'>
              <p className='text-sm text-content-2 flex items-center space-x-1.5'>
                <Star className='size-5 fill-orange-500 stroke-orange-500' />
                <span>{item.vote_average.toString().slice(0, 3)}</span>
              </p>
              <FavoriteButton
                item={{
                  id: item.id,
                  title: item.title || item.name || 'Error',
                  media_type: item.media_type,
                  release_date: item.release_date || 'Error',
                  poster_path: item.poster_path || '',
                  vote_average: item.vote_average,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
