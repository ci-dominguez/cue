import { Link } from '@remix-run/react';
import Logo from '../../public/imgs/logo.svg';

const Nav = () => {
  return (
    <nav className="p-6 flex bg-content text-text">
      <Link to="/" className="flex gap-x-3">
        <img src={Logo} alt="Logo for RecMe" className="h-[2.75rem] w-auto" />
        <h1 className="font-mono text-3xl">Rm</h1>
      </Link>
    </nav>
  );
};

export default Nav;
