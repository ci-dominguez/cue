import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import Fuse from "fuse.js";
import { SearchResult, searchTMDb } from "~/utils/tmdb";

interface SearchProps {
  onItemSelect: (item: SearchResult) => void;
}

const Search = ({ onItemSelect }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQ] = useDebounce(query, 500);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQ.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const tmdbResults = await searchTMDb(debouncedQ);

        const fuse = new Fuse(tmdbResults, {
          keys: ["title", "name"],
          threshold: 0.4,
        });

        const fuzzyResults = fuse
          .search(debouncedQ)
          .map((result: any) => result.item);

        setResults(fuzzyResults);
      } catch (err) {
        setError("An error occurred while fetching results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQ]);

  return (
    <div className='w-full max-w-md mx-auto'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search for a movie or TV show'
        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      {loading && <p className='mt-2 text-gray-600'>Loading...</p>}
      {error && <p className='mt-2 text-red-500'>{error}</p>}
      {results.length > 0 && (
        <ul className='mt-4 bg-white border border-gray-300 rounded-md shadow-lg'>
          {results.map((result) => (
            <li
              key={result.id}
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              onClick={() => onItemSelect(result)}
            >
              {result.title}{" "}
              {result.release_date &&
                `(${new Date(result.release_date).getFullYear()})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
