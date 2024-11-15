import { useState, useEffect } from 'react';
import PosterCard from '~/components/ui/PosterCard';
import { getFavorites, FavoriteItem } from '~/utils/localStorage';

const FavoritesPage = () => {
  const [favs, setFavs] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const storedFavorites = getFavorites();
    setFavs(storedFavorites);
  }, []);
  return (
    <>
      <div className='flex flex-col space-y-10 text-text pb-10 px-6'>
        <h1 className='font-lora font-semibold text-4xl'>Your Favorites</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 max-w-7xl mx-auto'>
          {favs.length > 0 ? (
            favs.map((i) => {
              return <PosterCard variant='alt' key={i.id} item={i} />;
            })
          ) : (
            <>No favorites</>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
