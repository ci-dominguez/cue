import { Link } from '@remix-run/react';
import Remix from '../../imgs/remix.svg';
import TMDB from '../../imgs/tmdb.svg';

const Footer = () => {
  return (
    <footer className='bg-content text-text p-6 pt-40 flex flex-col space-y-2 font-mono'>
      <Link
        to='https://cidominguez.com'
        className='text-accent underline self-start mx-auto'
      >
        @cidominguez
      </Link>
      <div className='flex flex-col text-center sm:flex-row sm:space-x-2 items-center mx-auto'>
        <span>Powered By</span>
        <img src={Remix} alt='Remix Logo' className='h-auto w-20' />
        <img src={TMDB} alt='TMDB Logo' className='h-auto w-20' />
      </div>
    </footer>
  );
};

export default Footer;
