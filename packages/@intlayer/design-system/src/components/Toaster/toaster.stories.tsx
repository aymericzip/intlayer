import type { Meta, StoryObj } from '@storybook/react';
import { ToastAction, Toaster, useToast } from '.';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof Toaster>;

const Demo = () => {
  const { toast } = useToast();

  return (
    <div className="space-x-2">
      <button
        className="rounded bg-neutral-200 px-3 py-1 text-sm dark:bg-neutral-800"
        onClick={() =>
          toast({
            title: 'Default toast',
            description: 'This is a default toast message.',
          })
        }
      >
        Show default
      </button>
      <button
        className="rounded bg-green-600 px-3 py-1 text-sm text-white"
        onClick={() =>
          toast({
            title: 'Success',
            description: 'Your action was successful.',
            variant: 'success',
          })
        }
      >
        Show success
      </button>
      <button
        className="rounded bg-red-600 px-3 py-1 text-sm text-white"
        onClick={() =>
          toast({
            title: 'Error',
            description: 'Something went wrong.',
            variant: 'error',
            action: <ToastAction altText="Retry">Retry</ToastAction>,
          })
        }
      >
        Show error
      </button>

      <Toaster />
    </div>
  );
};

export const Playground: Story = {
  render: () => <Demo />,
};
