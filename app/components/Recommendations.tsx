import { SearchResult } from '~/utils/tmdb';
import PosterCard from './ui/PosterCard';

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
      {recommendations.map((i) => (
        <PosterCard
          key={i.id}
          item={{
            ...i,
            title: i.title ?? 'Untitled',
            release_date: i.release_date ?? 'Not Released',
            poster_path: i.poster_path ?? '',
          }}
          variant={'default'}
        />
      ))}
    </div>
  );
};

export default Recommendations;
