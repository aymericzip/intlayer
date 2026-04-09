import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { DefinePasswordForm } from '#components/Auth/DefinePassword';

export const Route = createFileRoute('/{-$locale}/_other/auth/password/reset')({
  component: ResetPasswordPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('reset-password-page', locale);

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

function ResetPasswordPage() {
  const { title, title2, description } = useIntlayer('reset-password-page');

  return (
    <>
      <h1 className="hidden">{title}</h1>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-5 md:p-10">
        <Container
          className="w-full max-w-md justify-center gap-16 p-10 text-2xl"
          padding="xl"
          roundedSize="xl"
          transparency="xs"
        >
          <div className="flex flex-col gap-3 text-center">
            <h2 className="font-extrabold">{title2}</h2>
            <span className="text-neutral text-xs">{description}</span>
          </div>
          <Suspense fallback={<Loader />}>
            <DefinePasswordForm />
          </Suspense>
        </Container>
      </div>
    </>
  );
}
