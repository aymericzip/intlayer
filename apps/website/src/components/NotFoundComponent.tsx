import { Link } from '~/components/Link/Link';

export function NotFoundComponent() {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <p className="text-350px text-foreground/10 pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-bold">
        404
      </p>
      <h1 className="text-foreground mb-4 text-6xl font-bold">
        Page not found
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md text-base">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/" color="text" variant="button" label="Back to home">
        Back to home
      </Link>
    </div>
  );
}
