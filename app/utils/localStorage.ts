import { SearchResult } from './tmdb';

const RECENT_SEARCHES_KEY = 'recents';

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
