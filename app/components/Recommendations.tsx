import { SearchResult } from "~/utils/tmdb";

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
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
      {recommendations.map((item) => (
        <div
          key={item.id}
          className='bg-white rounded-lg shadow-md overflow-hidden'
        >
          {item.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              className='w-full h-48 object-cover'
            />
          )}
          <div className='p-4'>
            <h3 className='font-bold text-lg mb-2'>{item.title}</h3>
            <p className='text-sm text-gray-600'>
              {item.release_date && new Date(item.release_date).getFullYear()}
            </p>
            <p className='text-sm text-gray-500 mt-1'>
              {item.media_type === "movie" ? "Movie" : "TV Show"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
