import { useState, useEffect } from 'react';
import {
  Form,
  useSubmit,
  useSearchParams,
  useLoaderData,
} from '@remix-run/react';
import useDebounce from '../hooks/useDebounce';
import Fuse from 'fuse.js';
import { SearchResult } from '~/utils/tmdb';

interface SearchProps {
  onItemSelect: (item: SearchResult) => void;
}

const Search = ({ onItemSelect }: SearchProps) => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const { searchResults } = useLoaderData<{ searchResults: SearchResult[] }>();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const debouncedQ = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQ && debouncedQ.length >= 2) {
      submit({ q: debouncedQ }, { replace: true });
    }
  }, [debouncedQ, submit]);

  const fuse = new Fuse(searchResults, {
    keys: ['title', 'name'],
    threshold: 0.3,
  });

  const fuzzyResults =
    debouncedQ && debouncedQ.length >= 2
      ? fuse.search(debouncedQ).map((result) => result.item)
      : [];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto relative">
      <Form method="get" className="w-full">
        <input
          type="text"
          name="q"
          id="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full text-3xl border-b-2 border-text border-opacity-10 focus:border-opacity-25 focus:outline-none bg-content text-accent pb-1"
        />
      </Form>
      {fuzzyResults.length > 0 && (
        <div className="absolute z-20 w-full mt-14 overflow-hidden border-b-2 border-text border-opacity-10 pb-6 bg-content">
          <div className="max-h-60 overflow-y-auto space-y-2 bg-content">
            {fuzzyResults.map((result) => (
              <button
                key={result.id}
                className="px-4 py-2 cursor-pointer w-full text-left border-2 border-text border-opacity-10"
                onClick={() => {
                  onItemSelect(result);
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
