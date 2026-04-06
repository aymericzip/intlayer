import { Button } from '@intlayer/design-system/button';
import { Doc_Path } from '@intlayer/design-system/routes';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#/components/Link';

export const ErrorComponent = ({ error, reset }: ErrorComponentProps) => {
  const content = useIntlayer('error-component');

  return (
    <main className="page-wrap relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <p className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-bold text-[350px] text-text/10">
        Error
      </p>

      <h1 className="display-title mb-4 font-bold text-6xl text-text">
        {content.somethingWentWrong}
      </h1>
      <p className="mb-8 max-w-md text-base text-neutral">
        {error.message || content.unexpectedError}
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          type="button"
          color="text"
          variant="outline"
          label=""
          size="lg"
        >
          {content.tryAgain}
        </Button>
        <Link to={Doc_Path} variant="button" color="text" size="lg">
          {content.backToHome}
        </Link>
      </div>
    </main>
  );
};
