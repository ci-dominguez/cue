import { useState, useEffect } from 'react';
import PosterCard from '~/components/ui/PosterCard';
import { getRecentSearches } from '~/utils/localStorage';
import { SearchResult } from '~/utils/tmdb';

const RecentsPage = () => {
  const [recents, setRecents] = useState<SearchResult[]>([]);

  useEffect(() => {
    const storedRecents = getRecentSearches();
    setRecents(storedRecents);
  }, []);
  return (
    <>
      <div className='flex flex-col space-y-10 text-text pb-10 px-6'>
        <h1 className='font-lora font-semibold text-4xl'>Recently Viewed</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 max-w-7xl mx-auto'>
          {recents.length > 0 ? (
            recents.map((i) => {
              return (
                <PosterCard
                  variant='alt'
                  key={i.id}
                  item={{
                    ...i,
                    title: i.title ?? 'Untitled',
                    release_date: i.release_date ?? 'Not Released',
                    poster_path: i.poster_path ?? '',
                  }}
                />
              );
            })
          ) : (
            <>No favorites</>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentsPage;
