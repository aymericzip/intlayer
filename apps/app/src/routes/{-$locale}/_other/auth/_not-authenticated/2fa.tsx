import { Container } from '@intlayer/design-system/container';
import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { TotpForm } from '#components/Auth/TotpForm';

export const Route = createFileRoute(
  '/{-$locale}/_other/auth/_not-authenticated/2fa'
)({
  component: TwoFactorPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('2fa-page', locale);

    return {
      title: content.metadata.title,
      meta: [
        {
          name: 'description',
          content: content.metadata.description,
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    };
  },
});

function TwoFactorPage() {
  const { title, title2, description } = useIntlayer('2fa-page');

  return (
    <>
      <h1 className="hidden">{title}</h1>
      <div className="flex h-full flex-1 flex-col items-center justify-center p-5 md:p-10">
        <Container
          className="w-full max-w-md justify-center gap-10 p-10 text-2xl"
          padding="xl"
          roundedSize="3xl"
          transparency="xs"
        >
          <div className="flex flex-col gap-3 py-3 text-center">
            <h2 className="font-extrabold">{title2}</h2>
            <span className="text-neutral text-xs">{description}</span>
          </div>
          <TotpForm />
        </Container>
      </div>
    </>
  );
}
