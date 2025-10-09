import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination, PaginationSize, PaginationVariant } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
    },
    totalPages: {
      control: { type: 'number', min: 1 },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(PaginationSize),
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(PaginationVariant),
    },
    showFirstLast: {
      control: { type: 'boolean' },
    },
    showPrevNext: {
      control: { type: 'boolean' },
    },
    maxVisiblePages: {
      control: { type: 'number', min: 3, max: 10 },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveExample = (args: any) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <p className="text-muted-foreground text-sm">
        Current page: {currentPage} of {args.totalPages}
      </p>
    </div>
  );
};

export const Default: Story = {
  render: InteractiveExample,
  args: {
    totalPages: 10,
    currentPage: 1,
  },
};

export const WithManyPages: Story = {
  render: InteractiveExample,
  args: {
    totalPages: 50,
    currentPage: 25,
    maxVisiblePages: 7,
  },
};

export const Small: Story = {
  render: InteractiveExample,
  args: {
    totalPages: 10,
    currentPage: 5,
    size: PaginationSize.SM,
  },
};

export const Large: Story = {
  render: InteractiveExample,
  args: {
    totalPages: 10,
    currentPage: 5,
    size: PaginationSize.LG,
  },
};

export const Bordered: Story = {
  render: InteractiveExample,
  args: {
    totalPages: 10,
    currentPage: 5,
    variant: PaginationVariant.BORDERED,
  },
};

export const Ghost: Story = {
  render: InteractiveExample,
  args: {
    totalPages: 10,
    currentPage: 5,
    variant: PaginationVariant.GHOST,
  },
};

export const WithFirstLast: Story = {
  render: InteractiveExample,
  args: {
    totalPages: 20,
    currentPage: 10,
    showFirstLast: true,
    maxVisiblePages: 5,
  },
};

export const Minimal: Story = {
  render: InteractiveExample,
  args: {
    totalPages: 10,
    currentPage: 5,
    showFirstLast: false,
    showPrevNext: false,
    maxVisiblePages: 3,
  },
};

export const Disabled: Story = {
  render: InteractiveExample,
  args: {
    totalPages: 10,
    currentPage: 5,
    disabled: true,
  },
};

export const FewPages: Story = {
  render: InteractiveExample,
  args: {
    totalPages: 3,
    currentPage: 2,
  },
};

export const SinglePage: Story = {
  render: InteractiveExample,
  args: {
    totalPages: 1,
    currentPage: 1,
  },
};
