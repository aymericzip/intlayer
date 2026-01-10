import { useIntlayer } from 'react-intlayer';
import { getServerContent } from '../../.server/data';
import type { Route } from './+types/page.server';

// The loader runs on the server and has access to the 'request' object
export const loader = async ({ request }: Route.LoaderArgs) => {
  // We pass the request to your helper function
  const data = await getServerContent(request);

  // Return the data to the client-side component
  return { data };
};

export default function ServerExample({ loaderData }: Route.ComponentProps) {
  // Retrieve the server-fetched data
  const { data } = loaderData;
  const content = useIntlayer('server-example');

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl">{content.title}</h1>
      <p className="mt-4 text-gray-600">{content.description}</p>

      <div className="mt-6">
        <a href={`/${content.locale || ''}`}>← Back to Home</a>
      </div>

      {/* Render the server data */}
      {data && (
        <div className="mt-6 rounded border bg-gray-50 p-4">
          <h2 className="font-bold text-2xl">{data.title}</h2>
          <p className="mt-4 text-gray-600">{data.description}</p>
        </div>
      )}
    </div>
  );
}
