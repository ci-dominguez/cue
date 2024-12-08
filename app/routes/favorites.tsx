import { useState, useEffect } from 'react';
import Recommendations from '~/components/Recommendations';
import { getFavorites, StorageItem } from '~/utils/localStorage';

const FavoritesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [favs, setFavs] = useState<StorageItem[]>([]);

  useEffect(() => {
    const storedFavorites = getFavorites();
    setFavs(storedFavorites);
    setIsLoading(false);
  }, []);
  return (
    <>
      <section className='w-full max-w-screen-2xl mx-auto pb-6 sm:pb-10 md:pb-12 lg:pb-18'>
        <div className='w-full max-w-screen-xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16'>
          <h1 className='pb-4 font-lora font-semibold tracking-tight text-4xl md:text-5xl lg:text-6xl max-w-[18ch]'>
            Your Favorites
          </h1>

          <Recommendations
            recommendations={favs}
            isLoading={isLoading}
            variant='alt'
          />
        </div>
      </section>
    </>
  );
};

export default FavoritesPage;
