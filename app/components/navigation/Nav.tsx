import { useNav } from '~/contexts/NavContext';
import { Link, useLocation } from '@remix-run/react';
import Logo from '../../../imgs/logo.svg';
import Menu from '../../../imgs/menu.svg';
import X from '../../../imgs/x.svg';

const links = [
  {
    title: 'Search',
    href: '/search',
  },
  {
    title: 'Favorites',
    href: '/favorites',
  },
  {
    title: 'Recently Viewed',
    href: '/recently-viewed',
  },
  {
    title: 'About',
    href: '/about',
  },
];

const Nav = () => {
  const { extended, setExtended } = useNav();
  const route = useLocation();

  return (
    <nav className='px-6 py-2.5 flex flex-col bg-content'>
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
          {extended ? (
            <img src={X} alt='Close Menu' />
          ) : (
            <img src={Menu} alt='Open Menu' />
          )}
        </button>
      </div>

      {/** Mobile Links */}
      {extended && (
        <ul className='font-inter font-medium text-md mt-6'>
          {links.map((i) => {
            return (
              <li
                key={i.title}
                className='flex items-center border-b-[1px] border-text-1 border-opacity-20 py-2 space-x-1.5'
              >
                <Link
                  to={i.href}
                  onClick={() => setExtended(false)}
                  className={
                    route.pathname === i.href ? 'text-text' : 'text-text-1'
                  }
                >
                  {i.title}
                </Link>
                {route.pathname === i.href && (
                  <div className='size-1.5 rounded-full bg-text' />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default Nav;
