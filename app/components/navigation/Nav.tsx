import { useNav } from '~/contexts/NavContext';
import { Link, useLocation } from '@remix-run/react';
import Logo from '../../../imgs/logo.svg';
import { X, Menu } from 'lucide-react';
import { links } from '~/utils/links';

const Nav = () => {
  const { extended, setExtended } = useNav();
  const route = useLocation();

  return (
    <nav className='px-6 py-4 flex flex-col bg-content'>
      <div className='w-full flex items-center justify-between'>
        <Link
          to='/'
          onClick={() => setExtended(false)}
          className='flex gap-x-3 items-center'
        >
          <img src={Logo} alt='Logo for RecMe' className='h-[2rem] w-auto' />
          <h1 className='font-inter font-bold text-xl'>Cue</h1>
        </Link>
        <button onClick={() => setExtended(!extended)}>
          {extended ? <X className='size-6' /> : <Menu className='size-6' />}
        </button>
      </div>

      {/** Mobile Links */}
      {extended && (
        <ul className='font-inter font-medium text-md mt-6'>
          {links.map((i) => {
            return (
              <li key={i.title}>
                <Link
                  to={i.href}
                  onClick={() => setExtended(false)}
                  className={`flex items-center justify-between border-b-2 border-text-1 py-2 space-x-1.5 w-full ${
                    route.pathname === i.href
                      ? 'text-text border-opacity-100'
                      : 'text-text-1 border-opacity-20'
                  }`}
                >
                  <span>{i.title}</span>
                  {route.pathname === i.href && (
                    <div className='size-1 rounded-full bg-text' />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default Nav;
