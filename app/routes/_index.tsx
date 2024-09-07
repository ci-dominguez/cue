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
    <div className="font-sans p-4 max-w-4xl mx-auto">
      <div className="font-mono">This text will be in Roboto Mono</div>
      <h1 className="text-3xl font-bold mb-6 text-center">RecMe</h1>
      <p className="text-center mb-8">
        Enter a movie or TV show you like, and we&apos;ll recommend similar
        ones!
      </p>

      <Search onItemSelect={handleItemSelect} />

      {selectedItem && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Recommendations based on: {selectedItem.title}
          </h2>
          <Recommendations
            recommendations={recommendations}
            isLoading={isLoading}
            error={error}
          />
        </div>
      )}
    </div>
  );
}
