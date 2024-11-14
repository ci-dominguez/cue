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
import { Clock, Heart } from 'lucide-react';
import Card, { CardContent, CardHeader } from '~/components/ui/Card';
import {
  getRecentSearches,
  getFavorites,
  FavoriteItem,
} from '~/utils/localStorage';

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
          vote_average: movieDetails.vote_average,
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
          vote_average: showDetails.vote_average,
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

  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);
  const [favs, setFavs] = useState<FavoriteItem[]>([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get('recsFor') && !searchParams.get('media')) {
      setSelectedItem(null);
    } else {
      setSelectedItem(initialSelectedItem);
    }
  }, [searchParams, initialSelectedItem]);

  useEffect(() => {
    const storedRecents = getRecentSearches();
    setRecentSearches(storedRecents);

    const storedFavorites = getFavorites();
    setFavs(storedFavorites);
  }, []);

  const handleItemSelect = (item: SearchResult) => {
    setSelectedItem(item);
    navigate(`/search?recsFor=${item.id}&media=${item.media_type}`);
  };

  return (
    <>
      <div className='flex flex-col px-6'>
        <h1 className='font-lora font-semibold text-4xl mb-10'>
          Find Your Next Big Binge
        </h1>

        <Search onItemSelect={handleItemSelect} />

        <div className='flex flex-col space-y-4 mt-10'>
          <Card>
            <CardHeader>Recent Searches</CardHeader>
            <CardContent>
              <ul className='flex flex-col space-y-2'>
                {recentSearches.length > 0 ? (
                  recentSearches.slice(0, 5).map((i) => {
                    return (
                      <li key={i.id}>
                        <Link
                          to={`/${i.media_type}s/${i.id}`}
                          className='flex items-center space-x-1.5 text-text underline'
                        >
                          <Clock className='size-5' />{' '}
                          <span>{i.name || i.title}</span>
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li>
                    <span className='flex items-center space-x-1.5 text-text'>
                      <Clock className='size-5' />{' '}
                      <span>No searches saved.</span>
                    </span>
                  </li>
                )}
              </ul>
              <Button variant='default' className='w-full'>
                <Link
                  to='/'
                  className='py-2.5 px-6 flex space-x-1.5 items-center'
                >
                  <span>View All</span>
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>Your Favorites</CardHeader>
            <CardContent>
              <ul className='flex flex-col space-y-2'>
                {favs.length > 0 ? (
                  favs.slice(0, 5).map((i) => {
                    return (
                      <li key={i.id}>
                        <Link
                          to={`/${i.media_type}s/${i.id}`}
                          className='flex items-center space-x-1.5 text-text underline'
                        >
                          <Heart className='size-5 fill-red-600 stroke-red-600' />{' '}
                          <span>{i.title || i.name}</span>
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li>
                    <span className='flex items-center space-x-1.5 text-text'>
                      <Heart className='size-5' />{' '}
                      <span>No favorites yet.</span>
                    </span>
                  </li>
                )}
              </ul>
              <Button variant='default' className='w-full mt-4'>
                <Link
                  to='/'
                  className='py-2.5 px-6 flex space-x-1.5 items-center'
                >
                  <span>View All</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedItem ? (
        <div className='flex flex-col space-y-10 px-6 mt-10 bg-stone-800 text-content py-10'>
          <h2 className='font-lora font-semibold text-2xl'>
            Best recommendations for {selectedItem.title || selectedItem.name}:
          </h2>
          <Recommendations
            recommendations={recommendations}
            isLoading={false}
            error={error}
          />
        </div>
      ) : (
        <div className='flex flex-col space-y-10 px-6 mt-10 text-text py-10 text-center h-80'>
          No searches yet.
        </div>
      )}
    </>
  );
};

export default SearchPage;
