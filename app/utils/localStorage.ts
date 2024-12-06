export interface StorageItem {
  id: number;
  title: string;
  name?: string;
  media_type: 'movie' | 'tv';
  release_date?: string;
  poster_path?: string;
  vote_average?: number;
}

const RECENTLY_VIEWED_KEY = 'recentlyViewed';
const FAVORITES_KEY = 'favorites';

// Recently viewed
export const getRecentlyViewed = (): StorageItem[] => {
  const storedRecents = localStorage.getItem(RECENTLY_VIEWED_KEY);
  return storedRecents ? JSON.parse(storedRecents) : [];
};

export const saveRecentlyViewed = (viewedItem: StorageItem[]) => {
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(viewedItem));
};

export const addRecentlyViewed = (item: StorageItem) => {
  const existingRecents = getRecentlyViewed();

  if (
    !existingRecents.some(
      (recent) => recent.id === item.id && recent.media_type === item.media_type
    )
  ) {
    saveRecentlyViewed([item, ...existingRecents]);
  }
};

//Favorites

export const getFavorites = (): StorageItem[] => {
  const storedFavorites = localStorage.getItem(FAVORITES_KEY);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const saveFavorites = (favorites: StorageItem[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const addFavorite = (item: StorageItem) => {
  const favorites = getFavorites();
  if (
    !favorites.some(
      (fav) => fav.id === item.id && fav.media_type === item.media_type
    )
  ) {
    saveFavorites([item, ...favorites]);
  }
};

export const removeFavorite = (item: StorageItem) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(
    (fav) => !(fav.id === item.id && fav.media_type === item.media_type)
  );
  saveFavorites(updatedFavorites);
};

export const isFavorite = (item: StorageItem): boolean => {
  const favorites = getFavorites();

  return favorites.some(
    (fav) => fav.id === item.id && fav.media_type === item.media_type
  );
};
