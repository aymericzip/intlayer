import { useIntlayer } from 'react-intlayer';
import { Link } from './Link/Link';

export function NotFoundComponent() {
  const content = useIntlayer('404');

  return (
    <main className="page-wrap relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <p className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-bold text-[350px] text-text/10">
        404
      </p>
      <h1 className="mb-4 font-bold text-6xl text-text">
        {content.pageNotFound}
      </h1>
      <p className="mb-8 max-w-md text-base text-neutral">
        {content.thePageYoureLookingFor}
      </p>
      <Link
        to="/"
        color="text"
        variant="button"
        label={content.backToHome.value}
      >
        {content.backToHome}
      </Link>
    </main>
  );
}
