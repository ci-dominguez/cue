import { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import Search from '~/components/Search';
import Recommendations from '~/components/Recommendations';
import { SearchResult, getRecommendations } from '~/utils/tmdb';

export const meta: MetaFunction = () => {
  return [
    { title: 'RecMe - Movie and TV Show Recommendations' },
    {
      name: 'description',
      content: 'Get personalized movie and TV show recommendations',
    },
  ];
};

export default function Index() {
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [recommendations, setRecommendations] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleItemSelect = async (item: SearchResult) => {
    setSelectedItem(item);
    setIsLoading(true);
    setError(null);

    try {
      const recs = await getRecommendations(item.id, item.media_type);
      setRecommendations(recs);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="px-6 pt-12 flex flex-col bg-content text-text min-h-screen font-mono">
      <h1 className="mx-auto text-center text-3xl pb-4">Give me recs for...</h1>

      <Search onItemSelect={handleItemSelect} />

      {selectedItem && (
        <div className="mt-20">
          <h2 className="text-2xl mb-4 mx-auto text-center">
            Best recs for people that like{' '}
            <span className="text-accent">{selectedItem.title}</span>
          </h2>
          <Recommendations
            recommendations={recommendations}
            isLoading={isLoading}
            error={error}
          />
        </div>
      )}
    </main>
  );
}
