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
  fetchTrending,
} from '~/utils/tmdb';
import Search from '~/components/Search';
import Recommendations from '~/components/Recommendations';
import type { MetaFunction } from '@remix-run/node';
import Button from '~/components/ui/Button';
import { Clock, Heart } from 'lucide-react';
import Card, { CardContent, CardHeader } from '~/components/ui/Card';
import {
  getFavorites,
  StorageItem,
  getRecentlyViewed,
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

  const trendingMovies = await fetchTrending();

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

  return {
    trendingMovies,
    recommendations,
    searchResults,
    selectedItem,
    error,
  };
};

const SearchPage = () => {
  const {
    recommendations,
    selectedItem: initialSelectedItem,
    trendingMovies,
  } = useLoaderData<typeof loader>();
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);

  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(
    initialSelectedItem
  );

  const [recentlyViewed, setRecentlyViewed] = useState<StorageItem[]>([]);
  const [favs, setFavs] = useState<StorageItem[]>([]);
  const [isLocalStorageLoading, setIsLocalStorageLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (trendingMovies) setIsTrendingLoading(false);
  }, [trendingMovies]);

  useEffect(() => {
    if (!searchParams.get('recsFor') && !searchParams.get('media')) {
      setSelectedItem(null);
    } else {
      setSelectedItem(initialSelectedItem);
    }
  }, [searchParams, initialSelectedItem]);

  useEffect(() => {
    const storedRecents = getRecentlyViewed();
    setRecentlyViewed(storedRecents);

    const storedFavorites = getFavorites();
    setFavs(storedFavorites);

    setIsLocalStorageLoading(false);
  }, []);

  const handleItemSelect = (item: SearchResult) => {
    setSelectedItem(item);
    navigate(`/search?recsFor=${item.id}&media=${item.media_type}`);
  };

  return (
    <>
      <section className='w-full max-w-screen-2xl mx-auto pb-6 sm:pb-10 md:pb-12 lg:pb-18'>
        <div className='w-full max-w-screen-xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16'>
          <h1 className='pb-4 font-lora font-semibold tracking-tight text-4xl md:text-5xl lg:text-6xl max-w-[18ch]'>
            Find Your Next Big Binge
          </h1>

          <h2 className='pt-6 font-lora pb-4 font-semibold tracking-tight text-2xl md:text-3xl lg:text-4xl'>
            Search Your Favorites
          </h2>
          <Search onItemSelect={handleItemSelect} />

          <div className='flex flex-col md:flex-row gap-4 mt-10'>
            <Card>
              <CardHeader>Recently Viewed</CardHeader>
              <CardContent>
                <div className='flex flex-col gap-3 min-h-48 min-w-56'>
                  <ul className='flex-1 flex flex-col gap-2'>
                    {isLocalStorageLoading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <li
                          key={index}
                          className='flex items-center space-x-1.5 animate-pulse w-full'
                        >
                          <div className='w-5 h-5 bg-content-2 rounded-full' />
                          <div className='h-4 bg-content-2 rounded-md w-32' />
                        </li>
                      ))
                    ) : (
                      <>
                        {recentlyViewed.length > 0 ? (
                          recentlyViewed.slice(0, 4).map((i) => {
                            return (
                              <li key={i.id}>
                                <Link
                                  to={`/${i.media_type}s/${i.id}`}
                                  className='flex items-center space-x-1.5 text-text-1 underline hover:text-black'
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
                      </>
                    )}
                  </ul>
                  <Button variant='default' className='w-full mt-auto'>
                    <Link to='/recently-viewed' className='w-full py-2.5 px-6'>
                      View All
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>Your Favorites</CardHeader>
              <CardContent>
                <div className='flex flex-col gap-3 min-h-48 min-w-56'>
                  <ul className='flex-1 flex flex-col gap-2'>
                    {isLocalStorageLoading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <li
                          key={index}
                          className='flex items-center space-x-1.5 animate-pulse w-full '
                        >
                          <div className='w-5 h-5 bg-content-2 rounded-full' />
                          <div className='h-4 bg-content-2 rounded-md w-32' />
                        </li>
                      ))
                    ) : (
                      <>
                        {favs.length > 0 ? (
                          favs.slice(0, 4).map((i) => {
                            return (
                              <li key={i.id}>
                                <Link
                                  to={`/${i.media_type}s/${i.id}`}
                                  className='flex items-center space-x-1.5 text-text-1 underline hover:text-black'
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
                      </>
                    )}
                  </ul>
                  <Button variant='default' className='w-full mt-auto'>
                    <Link to='/favorites' className='w-full py-2.5 px-6'>
                      View All
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {selectedItem ? (
        <section className='flex bg-stone-800 text-content'>
          <div className='w-full max-w-screen-2xl mx-auto py-6 sm:py-10 md:py-12 lg:py-18'>
            <div className='w-full max-w-screen-xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16'>
              <h2
                id='search'
                className='font-lora pb-10 font-semibold tracking-tight text-2xl md:text-3xl lg:text-4xl'
              >
                Best recommendations for{' '}
                {selectedItem.title || selectedItem.name}:
              </h2>
              <Recommendations
                recommendations={recommendations}
                isLoading={false}
                variant='default'
              />
            </div>
          </div>
        </section>
      ) : (
        <section className='flex bg-stone-800 text-content'>
          <div className='w-full max-w-screen-2xl mx-auto py-6 sm:py-10 md:py-12 lg:py-18'>
            <div className='w-full max-w-screen-xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16'>
              <h2 className='font-lora pb-4 font-semibold tracking-tight text-2xl md:text-3xl lg:text-4xl'>
                Get Personalized Recs With The Search{' '}
                <Link
                  to='#search'
                  className='underline text-orange-500 hover:text-orange-300'
                >
                  Above
                </Link>
              </h2>
              <p className='tracking-micro lg:text-xl w-full max-w-lg lg:w-1/2 lg:max-w-xl pb-10'>
                In the mean time, here is some trending content for you!
              </p>

              <Recommendations
                recommendations={trendingMovies}
                isLoading={isTrendingLoading}
                variant='default'
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SearchPage;
