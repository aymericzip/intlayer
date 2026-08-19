import { Link } from '~/components/Link/Link';

export function NotFoundComponent() {
  return (
    <main className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <p className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-bold text-350px text-text/10">
        404
      </p>
      <h1 className="mb-4 font-bold text-6xl text-text">Page not found</h1>
      <p className="mb-8 max-w-md text-base text-neutral">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/" color="text" variant="button" label="Back to home">
        Back to home
      </Link>
    </main>
  );
}
