import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Showcase_Root_Path } from '@intlayer/design-system/routes';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link';

export const ErrorComponent = ({ error, reset }: ErrorComponentProps) => {
  const content = useIntlayer('error-component', 'en');

  return (
    <main className="page-wrap relative flex min-h-[60vh] flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <p className="pointer-events-none absolute top-1/4 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-bold text-[350px] text-text/10">
        Error
      </p>

      <h1 className="display-title mb-4 font-bold text-6xl text-text">
        {content.somethingWentWrong}
      </h1>
      <Container
        padding="lg"
        roundedSize="2xl"
        className="my-10 max-w-xl gap-4 text-left"
      >
        <p className="font-bold text-lg">
          {error.message || content.unexpectedError}
        </p>
        <p className="text-neutral text-sm">{error.stack}</p>
      </Container>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          type="button"
          color="text"
          variant="outline"
          label=""
          size="xl"
        >
          {content.tryAgain}
        </Button>
        <Link to={Showcase_Root_Path} variant="button" color="text" size="xl">
          {content.backToHome}
        </Link>
      </div>
    </main>
  );
};
