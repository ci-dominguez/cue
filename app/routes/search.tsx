import { useEffect, useState } from 'react';
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
import {
  getMovieDetails,
  getRecommendations,
  getShowDetails,
  SearchResult,
  searchTMDb,
} from '~/utils/tmdb';
import Search from '~/components/Search';
import Recommendations from '~/components/Recommendations';
import type { MetaFunction } from '@remix-run/node';
import Button from '~/components/ui/Button';
import { SearchIcon } from 'lucide-react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Cue - Find the next hidden gem to watch' },
    {
      name: 'description',
      content:
        'Use our search to find your next watch based on your favorite shows and movies',
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const recommendationId = url.searchParams.get('recsFor');
  const mediaType = url.searchParams.get('media') as 'movie' | 'tv';
  const searchQuery = url.searchParams.get('q');

  let recommendations: SearchResult[] = [];
  let searchResults: SearchResult[] = [];
  let selectedItem: SearchResult | null = null;
  let error: string | null = null;

  if (searchQuery) {
    try {
      searchResults = await searchTMDb(searchQuery);
    } catch (err) {
      error = 'Failed to fetch search results. Please try again.';
    }
  } else if (recommendationId && mediaType) {
    try {
      recommendations = await getRecommendations(
        parseInt(recommendationId, 10),
        mediaType
      );

      if (mediaType === 'movie') {
        const movieDetails = await getMovieDetails(
          parseInt(recommendationId, 10)
        );

        selectedItem = {
          id: movieDetails.id,
          title: movieDetails.title,
          media_type: 'movie',
          release_date: movieDetails.release_date,
          poster_path: movieDetails.poster_path,
        };
      } else {
        const showDetails = await getShowDetails(
          parseInt(recommendationId, 10)
        );

        selectedItem = {
          id: showDetails.id,
          title: showDetails.name,
          media_type: 'tv',
          release_date: showDetails.first_air_date,
          poster_path: showDetails.poster_path,
        };
      }
    } catch (err) {
      error = 'Failed to fetch recommendations. Please try again.';
    }
  }

  return { recommendations, searchResults, selectedItem, error };
};

const SearchPage = () => {
  const {
    recommendations,
    selectedItem: initialSelectedItem,
    error,
  } = useLoaderData<typeof loader>();
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(
    initialSelectedItem
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get('recsFor') && !searchParams.get('media')) {
      setSelectedItem(null);
    } else {
      setSelectedItem(initialSelectedItem);
    }
  }, [searchParams, initialSelectedItem]);

  const handleItemSelect = (item: SearchResult) => {
    setSelectedItem(item);
    navigate(`/search?recsFor=${item.id}&media=${item.media_type}`);
  };

  return (
    <>
      <h1 className='mx-auto text-center text-4xl pb-4 font-medium'>
        Give me recs for...
      </h1>

      <Search onItemSelect={handleItemSelect} />

      {selectedItem && (
        <div className='mt-20'>
          <h2 className='text-2xl mb-4 mx-auto text-center'>
            Best recs for people that like{' '}
            <span className='text-accent'>
              {selectedItem.title || selectedItem.name}
            </span>
          </h2>
          <Recommendations
            recommendations={recommendations}
            isLoading={false}
            error={error}
          />
        </div>
      )}
    </>
  );
};

export default SearchPage;
