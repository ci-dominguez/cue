import { useNav } from '~/contexts/NavContext';
import { Link, useLocation } from '@remix-run/react';
import Logo from '../../../imgs/logo.svg';
import { X, Menu } from 'lucide-react';
import { links } from '~/utils/links';

const Nav = () => {
  const { extended, setExtended } = useNav();
  const route = useLocation();

  return (
    <nav className='top-0 z-50 sticky backdrop-blur-sm border-b bg-content'>
      <div className='max-w-screen-xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16 py-4 flex flex-col '>
        <div className='w-full flex items-center justify-between'>
          <Link
            to='/'
            onClick={() => setExtended(false)}
            className='flex gap-x-3 items-center'
          >
            <img src={Logo} alt='Logo for RecMe' className='h-[2rem] w-auto' />
            <h1 className='font-inter font-bold text-xl'>Cue</h1>
          </Link>

          <button
            onClick={() => setExtended(!extended)}
            className='block md:hidden'
          >
            {extended ? <X className='size-6' /> : <Menu className='size-6' />}
          </button>

          {/** Full nav Links */}
          <ul className='hidden md:flex space-x-8 font-inter'>
            {links.map((i) => {
              return (
                <li key={i.title}>
                  <Link
                    to={i.href}
                    className={`flex space-x-1.5 items-center hover:text-text group ${
                      route.pathname === i.href
                        ? 'font-semibold text-text-1'
                        : 'font-medium text-text'
                    }`}
                  >
                    <div
                      className={`size-1 rounded-full group-hover:bg-text-1 ${
                        route.pathname === i.href
                          ? 'bg-orange-500'
                          : 'bg-content'
                      }`}
                    />
                    <span>{i.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/** Mobile Links */}
        {extended && (
          <ul className='font-inter text-md mt-6'>
            {links.map((i) => {
              return (
                <li key={i.title}>
                  <Link
                    to={i.href}
                    onClick={() => setExtended(false)}
                    className={`flex items-center py-2 gap-1.5 w-full ${
                      route.pathname === i.href
                        ? 'font-semibold text-text'
                        : 'font-medium text-text-1'
                    }`}
                  >
                    <div
                      className={`size-1 rounded-full ${
                        route.pathname === i.href
                          ? 'bg-orange-500'
                          : 'bg-content'
                      }`}
                    />
                    <span>{i.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;
