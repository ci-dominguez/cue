import { useEffect, useState } from 'react';
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
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
import { useNav } from '~/contexts/NavContext';
import { ThumbsUp, Zap, Popcorn } from 'lucide-react';

export const meta: MetaFunction = () => {
  return [
    { title: 'RecMe - Movie and TV Show Recommendations' },
    {
      name: 'description',
      content: 'Get personalized movie and TV show recommendations',
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

      // Fetch the details of the selected item
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

  return json({ recommendations, searchResults, selectedItem, error });
};

export default function Index() {
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
  const { setExtended } = useNav();

  useEffect(() => {
    // Reset selectedItem when URL parameters are cleared
    if (!searchParams.get('recsFor') && !searchParams.get('media')) {
      setSelectedItem(null);
    } else {
      setSelectedItem(initialSelectedItem);
    }
  }, [searchParams, initialSelectedItem]);

  const handleItemSelect = (item: SearchResult) => {
    setSelectedItem(item);
    navigate(`/?recsFor=${item.id}&media=${item.media_type}`);
  };

  return (
    // <main className='px-6 pt-12 flex flex-col bg-content text-text min-h-screen font-lora'>
    //   <h1 className='mx-auto text-center text-4xl pb-4 font-medium'>
    //     Give me recs for...
    //   </h1>

    //   <Search onItemSelect={handleItemSelect} />

    //   {selectedItem && (
    //     <div className='mt-20'>
    //       <h2 className='text-2xl mb-4 mx-auto text-center'>
    //         Best recs for people that like{' '}
    //         <span className='text-accent'>
    //           {selectedItem.title || selectedItem.name}
    //         </span>
    //       </h2>
    //       <Recommendations
    //         recommendations={recommendations}
    //         isLoading={false}
    //         error={error}
    //       />
    //     </div>
    //   )}
    // </main>
    <>
      <div className='flex flex-col space-y-4 px-6'>
        <h1 className='font-lora font-semibold text-4xl'>
          Find What to Watch Next,{' '}
          <span className='bg-accent'>Effortlessly</span>
        </h1>
        <p>
          Discover hidden gems and trending shows tailored to your tastes.
          Cue&apos;s smart recommendations make finding something great to watch
          easier than ever.
        </p>
        <Button variant='default'>
          <Link
            to='/search'
            onClick={() => {
              setExtended(false);
            }}
            className='py-2.5 px-6'
          >
            Start Searching 🔍
          </Link>
        </Button>
        <Button variant='secondary'>
          <Link
            to='/about'
            onClick={() => {
              setExtended(false);
            }}
            className='py-2.5 px-6'
          >
            Learn More
          </Link>
        </Button>
      </div>

      <div className='flex flex-col space-y-4 py-10 px-6 mt-10 bg-content-1'>
        <h2 className='font-lora font-semibold text-2xl'>Why choose Cue?</h2>
        <div className='py-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='flex flex-col space-y-2 border-gray-800 rounded-lg'>
            <ThumbsUp className='h-12 w-12 text-primary' />
            <h3 className='text-xl font-lora font-medium'>
              Personalized Recommendations
            </h3>
            <p className='text-gray-500 dark:text-gray-400'>
              Get movie suggestions tailored to your unique taste and viewing
              history.
            </p>
          </div>

          <div className='flex flex-col space-y-2 border-gray-800 rounded-lg'>
            <Zap className='h-12 w-12 text-primary' />
            <h3 className='text-xl font-lora font-medium'>Quick and Easy</h3>
            <p className='text-gray-500 dark:text-gray-400'>
              Find your next movie in seconds with our intuitive interface.
            </p>
          </div>

          <div className='flex flex-col space-y-2 border-gray-800 rounded-lg'>
            <Popcorn className='h-12 w-12 text-primary' />
            <h3 className='text-xl font-lora font-medium'>Diverse Selection</h3>
            <p className='text-gray-500 dark:text-gray-400'>
              Explore a wide range of genres, from blockbusters to indie gems.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
