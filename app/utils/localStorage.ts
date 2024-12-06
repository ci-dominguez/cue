import { SearchResult } from './tmdb';

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
const RECENT_SEARCHES_KEY = 'recents';
const FAVORITES_KEY = 'favorites';

//Recently viewed
export const getRecentlyViewed = () => {
  const storedRecents = localStorage.getItem(RECENTLY_VIEWED_KEY);
  return storedRecents ? JSON.parse(storedRecents) : [];
};

export const saveRecentlyViewed = (viewedItem: StorageItem) => {
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(viewedItem));
};

export const addRecentlyViewed = () => {};

//Recent searches

export const getRecentSearches = () => {
  const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
  return storedSearches ? JSON.parse(storedSearches) : [];
};

export const saveRecentSearches = (searches: SearchResult[]) => {
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
};

export const addRecentSearch = (newSearch: SearchResult) => {
  const existingSearches = getRecentSearches();

  //Removing duplicates
  const filteredSearches = existingSearches.filter(
    (search: SearchResult) =>
      !(
        search.id === newSearch.id && search.media_type === newSearch.media_type
      )
  );

  const updatedSearches = [newSearch, ...filteredSearches];

  //Limit local storage to 25 items
  if (updatedSearches.length > 25) updatedSearches.pop();

  saveRecentSearches(updatedSearches);
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
    saveFavorites([...favorites, item]);
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
