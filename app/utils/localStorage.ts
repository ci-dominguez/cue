import { SearchResult } from './tmdb';

export interface FavoriteItem {
  id: number;
  title: string;
  name?: string;
  media_type: 'movie' | 'tv';
  release_date?: string;
  poster_path?: string;
  vote_average?: number;
}

const RECENT_SEARCHES_KEY = 'recents';
const FAVORITES_KEY = 'favorites';

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

export const getFavorites = (): FavoriteItem[] => {
  const storedFavorites = localStorage.getItem(FAVORITES_KEY);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const saveFavorites = (favorites: FavoriteItem[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const addFavorite = (item: FavoriteItem) => {
  const favorites = getFavorites();
  if (
    !favorites.some(
      (fav) => fav.id === item.id && fav.media_type === item.media_type
    )
  ) {
    saveFavorites([...favorites, item]);
  }
};

export const removeFavorite = (item: FavoriteItem) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(
    (fav) => !(fav.id === item.id && fav.media_type === item.media_type)
  );
  saveFavorites(updatedFavorites);
};

export const isFavorite = (item: FavoriteItem): boolean => {
  const favorites = getFavorites();

  return favorites.some(
    (fav) => fav.id === item.id && fav.media_type === item.media_type
  );
};
