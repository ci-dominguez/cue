import { Link } from '@remix-run/react';
import {
  Info,
  LucideMessageSquareHeart,
  SearchIcon,
  Star,
  UserRoundPen,
  WandSparkles,
} from 'lucide-react';
import Button from '~/components/ui/Button';
import Card, { CardContent, CardHeader } from '~/components/ui/Card';
import { useNav } from '~/contexts/NavContext';

const AboutPage = () => {
  const { setExtended } = useNav();
  return (
    <>
      <div className='flex flex-col space-y-4 px-6'>
        <h1 className='font-lora font-semibold text-4xl'>
          About <span className='bg-accent'>Cue</span>
        </h1>
        <p>
          Cue is an easy-to-use webapp that helps you find great movies and tv
          shows to watch. It&apos;s built using modern tools highlighted below.
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
      </div>

      <div className='flex flex-col space-y-8 py-10 px-6 mt-10 bg-stone-800'>
        <Card>
          <CardHeader>
            <span className='flex space-x-1.5 items-center'>
              <SearchIcon className='size-8' />
              <span>Smart Search</span>
            </span>
          </CardHeader>
          <CardContent>
            A fast and flexible fuzzy search powered by fuse.js.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className='flex space-x-1.5 items-center'>
              <Star className='size-8' />
              <span>Personalized</span>
            </span>
          </CardHeader>
          <CardContent>
            Save your favorites and access your recently viewed content.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <span className='flex space-x-1.5 items-center'>
              <Info className='size-8' />
              <span>Detailed Info</span>
            </span>
          </CardHeader>
          <CardContent>
            Comprehensive details including cast, descriptions, and trailers.
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col space-y-4 py-10 px-6'>
        <h2 className='font-lora font-semibold text-2xl'>How It Works</h2>
        <Card>
          <CardHeader>The Stack behind Cue</CardHeader>
          <CardContent>
            <ul className='grid grid-cols-2 font-semibold'>
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
        <Card>
          <CardHeader>Behind The Scenes</CardHeader>
          <CardContent>
            Curious about how Cue comes to life? Here&apos;s a peek behind the
            curtain at some of the key processes and technologies that make Cue
            possible.
            <div className='flex flex-col mt-10 space-y-10'>
              <div className='flex flex-col space-y-2'>
                <h4 className='font-lora font-medium text-lg items-center text-text flex space-x-1.5'>
                  <WandSparkles className='size-5' />{' '}
                  <span>Fuzzy Search Magic</span>
                </h4>
                <p>
                  When you start typing in the search bar, Fuse.js springs into
                  action. It uses approximate string matching algorithms to find
                  results that are close to what you&apos;re typing, even if you
                  make a typo or don&apos;t remember the exact title.
                </p>
              </div>

              <div className='flex flex-col space-y-2'>
                <h4 className='font-lora font-medium text-lg items-center text-text flex space-x-1.5'>
                  <LucideMessageSquareHeart className='size-5' />{' '}
                  <span>Recommendations</span>
                </h4>
                <p>
                  Once you select a title, Cue queries the TMDB API to fetch
                  similar content. The API uses factors like genres, cast, crew,
                  and user ratings to generate a list of recommendations
                  tailored to your selection.
                </p>
              </div>

              <div className='flex flex-col space-y-2'>
                <h4 className='font-lora font-medium text-lg items-center text-text flex space-x-1.5'>
                  <UserRoundPen className='size-5' />{' '}
                  <span>Personalization</span>
                </h4>
                <p>
                  Your favorites and recent searches are stored in your
                  browser&apos;s local storage. This means you can access your
                  personalized content quickly without the need for user
                  accounts or server-side storage, ensuring a fast and
                  privacy-conscious experience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <span className='text-center pt-10'>
          Made by{' '}
          <Link
            to='https://cidominguez.com'
            className='text-orange-400 underline font-semibold'
          >
            @cidominguez
          </Link>
        </span>
      </div>
    </>
  );
};

export default AboutPage;
