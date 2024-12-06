import { useState, useEffect } from 'react';
import PosterCard from '~/components/ui/PosterCard';
import { getRecentlyViewed, StorageItem } from '~/utils/localStorage';

const RecentsPage = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<StorageItem[]>([]);

  useEffect(() => {
    const storedRecents = getRecentlyViewed();
    setRecentlyViewed(storedRecents);
  }, []);
  return (
    <>
      <section className='w-full max-w-screen-2xl mx-auto pb-6 sm:pb-10 md:pb-12 lg:pb-18'>
        <div className='w-full max-w-screen-xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16'>
          <h1 className='pb-4 font-lora font-semibold tracking-tight text-4xl md:text-5xl lg:text-6xl max-w-[18ch]'>
            Recently Viewed
          </h1>

          <div className='pt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 max-w-7xl mx-auto'>
            {recentlyViewed.length > 0 ? (
              recentlyViewed.map((i) => {
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
              <>No activity saved.</>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentsPage;
