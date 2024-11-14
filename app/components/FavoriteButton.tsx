import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import {
  isFavorite,
  addFavorite,
  removeFavorite,
  FavoriteItem,
} from '~/utils/localStorage';

interface FavButtonProps {
  item: FavoriteItem;
}

const FavoriteButton = ({ item }: FavButtonProps) => {
  const [isFav, setIsFav] = useState(false);

  //Check if item is already in favorites
  useEffect(() => {
    setIsFav(isFavorite(item));
  }, [item]);

  const handleToggleFav = () => {
    if (isFav) {
      removeFavorite(item);
      setIsFav(false);
    } else {
      addFavorite(item);
      setIsFav(true);
    }
  };

  return (
    <button onClick={handleToggleFav}>
      <Heart className={`size-5 ${isFav && 'fill-red-600 stroke-red-600'}`} />
    </button>
  );
};

export default FavoriteButton;
