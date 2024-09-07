import { useState } from 'react';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import { getRecommendations, SearchResult, searchTMDb } from '~/utils/tmdb';
import Search from '~/components/Search';
import Recommendations from '~/components/Recommendations';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'RecMe - Movie and TV Show Recommendations' },
    {
      name: 'description',
      content: 'Get personalized movie and TV show recommendations',
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const recommendationId = url.searchParams.get('recsFor');
  const mediaType = url.searchParams.get('media') as 'movie' | 'tv';
  const searchQuery = url.searchParams.get('q');

  let recommendations: SearchResult[] = [];
  let searchResults: SearchResult[] = [];
  let error: string | null = null;

  if (searchQuery) {
    try {
      searchResults = await searchTMDb(searchQuery);
    } catch (err) {
      error = 'Failed to fetch search results. Please try again.';
    }
  } else if (recommendationId && mediaType) {
    try {
      recommendations = await getRecommendations(
        parseInt(recommendationId, 10),
        mediaType
      );
    } catch (err) {
      error = 'Failed to fetch recommendations. Please try again.';
    }
  }

  return json({ recommendations, searchResults, error });
};

export default function Index() {
  const { recommendations, error } = useLoaderData<typeof loader>();
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const navigate = useNavigate();

  const handleItemSelect = (item: SearchResult) => {
    setSelectedItem(item);
    navigate(`/?recsFor=${item.id}&media=${item.media_type}`);
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
            isLoading={false}
            error={error}
          />
        </div>
      )}
    </main>
  );
}
