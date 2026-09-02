import { createFileRoute } from '@tanstack/react-router';
import { DemoPageUI } from '#components/Demo/DemoPageUI';
import { redirectIfSelfHosted } from '#utils/selfHosted';

export const Route = createFileRoute('/{-$locale}/_other/auth/demo')({
  beforeLoad: ({ params }) => redirectIfSelfHosted(params.locale),
  component: AuthDemoPage,
});

function AuthDemoPage() {
  return <DemoPageUI autoBootstrap={true} />;
}
