import { createFileRoute } from '@tanstack/react-router';
import { DemoPageUI } from '#components/Demo/DemoPageUI';
import { redirectIfSelfHosted } from '#utils/selfHosted';

export const Route = createFileRoute('/{-$locale}/demo')({
  beforeLoad: async ({ params }) => redirectIfSelfHosted(params.locale),
  component: DemoPage,
});

function DemoPage() {
  return <DemoPageUI autoBootstrap={false} />;
}
