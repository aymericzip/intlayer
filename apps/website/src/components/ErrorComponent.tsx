import type { ErrorComponentProps } from '@tanstack/react-router';
import { Link } from '~/components/Link/Link';

/** Router error fallback; rendered inside the root document's `<main>`. */
export const ErrorComponent = ({ error, reset }: ErrorComponentProps) => {
  const errorMessage = error instanceof Error ? error.message : undefined;

  return (
    <div className="relative flex min-h-[60vh] flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <h1 className="text-foreground mb-4 text-6xl font-bold">
        Something went wrong
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md text-base">
        {errorMessage || 'An unexpected error occurred.'}
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="cursor-pointer underline"
        >
          Try again
        </button>
        <Link to="/" color="text" variant="button" label="Back to home">
          Back to home
        </Link>
      </div>
    </div>
  );
};
