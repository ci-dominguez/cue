import Logo from '../../public/imgs/logo.svg';

const Nav = () => {
  return (
    <nav className="p-6 pb-0 flex gap-x-2 bg-content text-text">
      <img src={Logo} alt="Logo for RecMe" className="h-[2.5rem] w-auto" />
      <h1 className="font-mono text-3xl">Rm</h1>
    </nav>
  );
};

export default Nav;
