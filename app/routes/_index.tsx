import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import Button from '~/components/ui/Button';
import { useNav } from '~/contexts/NavContext';
import {
  ThumbsUp,
  Zap,
  Popcorn,
  SearchIcon,
  DollarSign,
  Clock,
  TrendingUp,
  LucideMessageSquareHeart,
  UserRoundPen,
  WandSparkles,
  Layers3,
} from 'lucide-react';
import Card, { CardContent, CardHeader } from '~/components/ui/Card';

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
      <section className='w-full max-w-screen-2xl mx-auto pb-6 sm:pb-10 md:pb-12 lg:pb-18'>
        <div className='w-full max-w-screen-xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16'>
          <h1 className='pb-4 font-lora font-semibold tracking-tight text-4xl md:text-5xl lg:text-6xl max-w-[18ch]'>
            Find What to Watch Next,{' '}
            <span className='bg-accent leading-tight'>Effortlessly</span>
          </h1>
          <p className='tracking-micro lg:text-xl w-full max-w-lg lg:w-1/2 lg:max-w-xl'>
            Discover hidden gems and trending shows tailored to your tastes.
            Cue&apos;s smart recommendations make finding something great to
            watch easier than ever.
          </p>
          <div className='flex flex-col md:flex-row gap-4 pt-6'>
            <Button variant='default'>
              <Link
                to='/search'
                onClick={() => {
                  setExtended(false);
                }}
                className='py-2.5 px-6 md:py-3.5 md:px-8 flex space-x-1.5 items-center'
              >
                <span>Start Searching</span> <SearchIcon className='size-5' />
              </Link>
            </Button>
            <Button variant='secondary'>
              <Link to='#about' className='py-2.5 px-6 md:py-3.5 md:px-8'>
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className='bg-content-1 flex'>
        <div className='w-full max-w-screen-2xl mx-auto py-6 sm:py-10 md:py-12 lg:py-18'>
          <div className='w-full max-w-screen-xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16'>
            <h2 className='font-lora pb-4 font-semibold tracking-tight text-2xl md:text-3xl lg:text-4xl'>
              Why choose Cue?
            </h2>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-y-16 md:grid-cols-2 lg:grid-cols-3'>
              <div className='flex flex-col space-y-2 border-gray-800 rounded-lg'>
                <ThumbsUp className='h-12 w-12 text-primary' />
                <h3 className='tracking-tight text-xl md:text-2xl font-lora font-medium'>
                  Personalized Recommendations
                </h3>
                <p className='tracking-micro lg:text-xl text-text-1'>
                  Get movie suggestions tailored to your unique taste and
                  viewing history.
                </p>
              </div>

              <div className='flex flex-col space-y-2 border-gray-800 rounded-lg'>
                <Zap className='h-12 w-12 text-primary' />
                <h3 className='tracking-tight text-xl md:text-2xl font-lora font-medium'>
                  Quick and Easy
                </h3>
                <p className='tracking-micro lg:text-xl text-text-1'>
                  Find your next movie in seconds with our intuitive interface.
                </p>
              </div>

              <div className='flex flex-col space-y-2 border-gray-800 rounded-lg'>
                <Popcorn className='h-12 w-12 text-primary' />
                <h3 className='tracking-tight text-xl md:text-2xl font-lora font-medium'>
                  Diverse Selection
                </h3>
                <p className='tracking-micro lg:text-xl text-text-1'>
                  Explore a wide range of genres, from blockbusters to indie
                  gems.
                </p>
              </div>

              <div className='flex flex-col space-y-2 border-gray-800 rounded-lg'>
                <DollarSign className='h-12 w-12 text-primary' />
                <h3 className='tracking-tight text-xl md:text-2xl font-lora font-medium'>
                  No Sign-Up and Ad-Free
                </h3>
                <p className='tracking-micro lg:text-xl text-text-1'>
                  Enjoy our service completely free of charge, with no annoying
                  advertisements to interrupt your experience.
                </p>
              </div>

              <div className='flex flex-col space-y-2 border-gray-800 rounded-lg'>
                <Clock className='h-12 w-12 text-primary' />
                <h3 className='tracking-tight text-xl md:text-2xl font-lora font-medium'>
                  View History
                </h3>
                <p className='tracking-micro lg:text-xl text-text-1'>
                  Keep track of what your interested in and use this history to
                  improve your recommendations.
                </p>
              </div>

              <div className='flex flex-col space-y-2 border-gray-800 rounded-lg'>
                <TrendingUp className='h-12 w-12 text-primary' />
                <h3 className='tracking-tight text-xl md:text-2xl font-lora font-medium'>
                  New and Trending
                </h3>
                <p className='tracking-micro lg:text-xl text-text-1'>
                  Stay up-to-date with the latest trending movies and TV shows
                  from out data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='about' className='bg-stone-800 text-content flex'>
        <div className='w-full max-w-screen-2xl mx-auto py-6 sm:py-10 md:py-12 lg:py-18'>
          <div className='w-full max-w-screen-xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16'>
            <h2 className='font-lora pb-4 font-semibold tracking-tight text-2xl md:text-3xl lg:text-4xl'>
              How Cue Works
            </h2>

            <p className='tracking-micro lg:text-xl w-full max-w-lg lg:w-1/2 lg:max-w-xl'>
              Curious about how Cue comes to life? Here&apos;s a peek behind the
              curtain at some of the key processes and technologies that make
              Cue possible.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
              <Card>
                <CardHeader>
                  <span className='items-center flex space-x-1.5'>
                    <WandSparkles className='size-5' />{' '}
                    <span>Fuzzy Search Magic</span>
                  </span>
                </CardHeader>
                <CardContent>
                  <p className='tracking-micro lg:text-xl w-full'>
                    When you start typing in the search bar, Fuse.js springs
                    into action. It uses approximate string matching algorithms
                    to find results that are close to what you&apos;re typing,
                    even if you make a typo or don&apos;t remember the exact
                    title.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <span className='items-center flex space-x-1.5'>
                    <LucideMessageSquareHeart className='size-5' />{' '}
                    <span>Recommendations</span>
                  </span>
                </CardHeader>
                <CardContent>
                  <p className='tracking-micro lg:text-xl w-full'>
                    Once you select a title, Cue queries the TMDB API to fetch
                    similar content. The API uses factors like genres, cast,
                    crew, and user ratings to generate a list of recommendations
                    tailored to your selection.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <span className='items-center flex space-x-1.5'>
                    <UserRoundPen className='size-5' />{' '}
                    <span>Personalization</span>
                  </span>
                </CardHeader>
                <CardContent>
                  <p className='tracking-micro lg:text-xl w-full'>
                    Your favorites and recent searches are stored in your
                    browser&apos;s local storage. This means you can access your
                    personalized content quickly without the need for user
                    accounts or server-side storage, ensuring a fast and
                    privacy-conscious experience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <span className='items-center flex space-x-1.5'>
                    <Layers3 className='size-5' /> <span>The Stack</span>
                  </span>
                </CardHeader>
                <CardContent>
                  <p className='tracking-micro lg:text-xl w-full'>
                    Cue runs on the following technologies to provide a fast and
                    responsive experience for users.
                  </p>
                  <ul className='grid grid-cols-2 font-semibold tracking-micro lg:text-xl'>
                    <li>Vite</li>
                    <li>Remix.js</li>
                    <li>Typescript</li>
                    <li>Tailwind CSS</li>
                    <li>Fuse.js</li>
                    <li>Axios</li>
                    <li>Zod</li>
                    <li>TMDB API</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
