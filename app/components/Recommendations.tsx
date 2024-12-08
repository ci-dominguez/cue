import { SearchResult } from '~/utils/tmdb';
import PosterCard from './ui/PosterCard';
import { StorageItem } from '~/utils/localStorage';

interface RecommendationsProps {
  recommendations: SearchResult[] | StorageItem[];
  isLoading: boolean;
  variant: 'default' | 'alt';
}

const Recommendations = ({
  recommendations,
  isLoading,
  variant,
}: RecommendationsProps) => {
  if (isLoading) {
    return (
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 max-w-7xl mx-auto'>
        {Array.from({ length: 10 }).map((_, index) => (
          <PosterCard
            variant={variant}
            isLoading={isLoading}
            key={index}
            item={recommendations[index]}
          />
        ))}
      </div>
    );
  }

  if (recommendations.length === 0) {
    return <div className='text-center py-4'>No recommendations found.</div>;
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 max-w-7xl mx-auto'>
      {recommendations.map((i) => (
        <PosterCard
          key={i.id}
          item={{
            ...i,
            title: i.title ?? 'Untitled',
            release_date: i.release_date ?? 'Not Released',
            poster_path: i.poster_path ?? '',
          }}
          variant={variant}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default Recommendations;
