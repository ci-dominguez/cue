import { useNav } from '~/contexts/NavContext';
import { Link, useLocation } from '@remix-run/react';
import { links } from '~/utils/links';
import Logo from '../../../imgs/logo.svg';

const Footer = () => {
  const { setExtended } = useNav();
  const route = useLocation();

  return (
    <footer className='max-w-screen-xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16 pb-6 sm:pb-10 md:pb-12 lg:pb-18 flex flex-col'>
      <Link
        to='/'
        onClick={() => setExtended(false)}
        className='flex gap-x-3 items-center'
      >
        <img src={Logo} alt='Logo for RecMe' className='h-[2rem] w-auto' />
        <h1 className='font-inter font-bold text-xl'>Cue</h1>
      </Link>
      <div className='flex flex-col gap-3 mt-3'>
        <ul>
          <li className='text-lg font-bold pb-1'>Tools</li>
          {links.map((link) => {
            return (
              <li key={link.title}>
                <Link
                  to={link.href}
                  className={` text-lg hover:underline hover:font-medium ${
                    route.pathname === link.href
                      ? 'text-text font-semibold underline'
                      : 'text-text-1 font-normal'
                  }`}
                >
                  <span>{link.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <span className='text-lg'>
          Made by{' '}
          <Link
            to='https://cidominuguez.com'
            className='underline font-semibold hover:font-bold text-orange-500'
          >
            @cidominguez
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
