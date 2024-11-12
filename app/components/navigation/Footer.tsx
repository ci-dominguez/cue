import { useNav } from '~/contexts/NavContext';
import { Link, useLocation } from '@remix-run/react';
import { links } from '~/utils/links';

const Footer = () => {
  const { setExtended } = useNav();
  const route = useLocation();

  return (
    <footer className='px-6 py-4 flex flex-row justify-between bg-content'>
      <ul className='flex flex-col font-inter font-medium text-md mb-6'>
        <li className='text-text font-bold pb-4'>Tools</li>
        {links.slice(0, 3).map((i) => {
          return (
            <li
              key={i.title}
              className='text-center flex items-center justify-between py-1 space-x-1.5'
            >
              <Link
                to={i.href}
                onClick={() => setExtended(false)}
                className={
                  route.pathname === i.href
                    ? 'text-text'
                    : 'text-text-1 opacity-80'
                }
              >
                {i.title}
              </Link>
              {route.pathname === i.href && (
                <div className='size-1 rounded-full bg-text' />
              )}
            </li>
          );
        })}
      </ul>

      <ul className='flex flex-col font-inter font-medium text-md mb-6'>
        <li className='text-text font-bold pb-4'>Resources</li>
        {links.slice(3).map((i) => {
          return (
            <li
              key={i.title}
              className='text-center flex items-center justify-between py-1 space-x-1.5'
            >
              <Link
                to={i.href}
                onClick={() => setExtended(false)}
                className={
                  route.pathname === i.href
                    ? 'text-text'
                    : 'text-text-1 opacity-80'
                }
              >
                {i.title}
              </Link>
              {route.pathname === i.href && (
                <div className='size-1 rounded-full bg-text' />
              )}
            </li>
          );
        })}
        <li className='text-center flex items-center justify-between py-1 space-x-1.5'>
          <Link
            to='https://cidominguez.com/'
            onClick={() => setExtended(false)}
            className={
              route.pathname === 'https://cidominguez.com/'
                ? 'text-text'
                : 'text-orange-400'
            }
          >
            @cidominguez
          </Link>
          {route.pathname === 'https://cidominguez.com/' && (
            <div className='size-1 rounded-full bg-text' />
          )}
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
