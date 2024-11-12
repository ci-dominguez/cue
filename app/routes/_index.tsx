import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import Button from '~/components/ui/Button';
import { useNav } from '~/contexts/NavContext';
import { ThumbsUp, Zap, Popcorn, SearchIcon } from 'lucide-react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Cue - Movie and TV Show Recommendations' },
    {
      name: 'description',
      content: 'Get personalized movie and TV show recommendations',
    },
  ];
};

export default function Index() {
  const { setExtended } = useNav();

  return (
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
            className='py-2.5 px-6 flex space-x-1.5 items-center'
          >
            <span>Start Searching</span> <SearchIcon className='size-5' />
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
