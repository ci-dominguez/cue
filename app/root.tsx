import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import './tailwind.css';
import Nav from './components/navigation/Nav';
import Footer from './components/Footer';
import { NavProvider } from './contexts/NavContext';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap'
          rel='stylesheet'
        />
        <Meta />
        <Links />
      </head>
      <body>
        <NavProvider>
          <Nav />
          <main className='flex flex-col p-6 min-h-screen bg-content text-text font-inter'>
            {children}
          </main>
          <Footer />
          <ScrollRestoration />
          <Scripts />
        </NavProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
