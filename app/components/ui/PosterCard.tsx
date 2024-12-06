import { Link } from '@remix-run/react';
import FavoriteButton from '../FavoriteButton';
import { StorageItem } from '~/utils/localStorage';
import { Star } from 'lucide-react';

interface PosterCardProps {
  item: StorageItem;
  isLoading?: boolean;
  error?: string | null;
  variant: 'default' | 'alt';
}

const PosterCard = ({ item, variant }: PosterCardProps) => {
  return (
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
          <p
            className={`text-sm flex items-center space-x-1.5 ${
              variant === 'alt' ? 'text-text-1' : 'text-content-2'
            }`}
          >
            <Star
              className={`size-5 ${
                variant === 'alt'
                  ? 'fill-yellow-500 stroke-yellow-500'
                  : ' fill-orange-500 stroke-orange-500'
              }`}
            />
            <span>{item.vote_average!.toString().slice(0, 3) || 0}</span>
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
  );
};

export default PosterCard;
