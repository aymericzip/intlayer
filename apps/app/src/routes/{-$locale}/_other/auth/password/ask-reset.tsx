import { Container } from '@intlayer/design-system/container';
import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { AskResetPasswordForm } from '#components/Auth/AskResetPassword';

export const Route = createFileRoute(
  '/{-$locale}/_other/auth/password/ask-reset'
)({
  component: AskResetPasswordPage,
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

function AskResetPasswordPage() {
  const { title, title2, description } = useIntlayer('reset-password-page');

  return (
    <>
      <h1 className="hidden">{title}</h1>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-5 md:p-10">
        <Container
          className="w-full max-w-md justify-center gap-16 p-10 text-2xl"
          padding="xl"
          roundedSize="2xl"
          transparency="xs"
        >
          <div className="flex flex-col gap-3 text-center">
            <h2 className="font-extrabold">{title2}</h2>
            <span className="text-neutral text-xs">{description}</span>
          </div>
          <AskResetPasswordForm />
        </Container>
      </div>
    </>
  );
}
