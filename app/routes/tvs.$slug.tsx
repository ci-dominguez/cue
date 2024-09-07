import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getShowDetails } from '~/utils/tmdb';
import ShowDetails from '~/components/ShowDetails';

export const loader: LoaderFunction = async ({ params }) => {
  const showId = params.slug;
  if (!showId) {
    throw new Response('Not Found', { status: 404 });
  }
  const showDetails = await getShowDetails(parseInt(showId, 10));
  return json({ showDetails });
};

export default function ShowRoute() {
  const { showDetails } = useLoaderData<typeof loader>();
  return <ShowDetails show={showDetails} />;
}
