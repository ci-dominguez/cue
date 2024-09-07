import { SearchResult } from '~/utils/tmdb';

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
    return <div className="text-center py-4">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (recommendations.length === 0) {
    return <div className="text-center py-4">No recommendations found.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 mt-8 max-w-7xl mx-auto">
      {recommendations.map((item) => (
        <div key={item.id} className="overflow-hidden flex flex-col">
          {item.poster_path && (
            <div className="aspect-w-2 aspect-h-3">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-col flex-grow pt-2">
            <h3 className="text-lg mb-2 flex-grow">{item.title}</h3>
            <div className="flex justify-between mt-auto">
              <p className="text-sm text-gray-500">
                {item.media_type === 'movie' ? 'Movie' : 'TV Show'}
              </p>
              <p className="text-sm text-gray-600 text-right">
                {item.release_date && new Date(item.release_date).getFullYear()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
