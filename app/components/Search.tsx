import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import Fuse from 'fuse.js';
import { SearchResult, searchTMDb } from '~/utils/tmdb';

interface SearchProps {
  onItemSelect: (item: SearchResult) => void;
}

const Search = ({ onItemSelect }: SearchProps) => {
  const [query, setQuery] = useState('');
  const debouncedQ = useDebounce(query, 500);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQ || debouncedQ.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const tmdbResults = await searchTMDb(debouncedQ);

        if (!Array.isArray(tmdbResults) || tmdbResults.length === 0) {
          setResults([]);
          return;
        }

        const fuse = new Fuse(tmdbResults, {
          keys: ['title', 'name'],
          threshold: 0.4,
        });

        const fuzzyResults = fuse
          .search(debouncedQ)
          .map((result) => result.item);

        setResults(fuzzyResults);
      } catch (err) {
        console.error('Error in fetchResults:', err);
        setError('An error occurred while fetching results. Please try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQ]);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full text-3xl border-b-2 border-text border-opacity-10 focus:border-opacity-25 focus:outline-none bg-content text-accent pb-1"
      />
      {loading && <p className="mt-2 text-gray-600">Loading...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {results.length > 0 && (
        <div className="absolute z-20 w-full mt-14 overflow-hidden border-b-2 border-text border-opacity-10 pb-6 bg-content">
          <div className="max-h-60 overflow-y-auto space-y-2 bg-content">
            {results.map((result) => (
              <button
                key={result.id}
                className="px-4 py-2 cursor-pointer w-full text-left border-2 border-text border-opacity-10"
                onClick={() => {
                  onItemSelect(result);
                  setResults([]);
                  setQuery('');
                }}
              >
                {result.title}{' '}
                {result.release_date &&
                  `(${new Date(result.release_date).getFullYear()})`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
