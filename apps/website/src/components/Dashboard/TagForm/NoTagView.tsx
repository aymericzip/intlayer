'use client';

import { Button, useForm } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useTagSchema } from './useTagFormSchema';

type NoTagViewProps = {
  onClickCreateTag: () => void;
};

export const NoTagView: FC<NoTagViewProps> = ({ onClickCreateTag }) => {
  const TagSchema = useTagSchema();
  const { isSubmitting } = useForm(TagSchema);
  const { createTagButton, createTagTitle, createTagDescription } =
    useIntlayer('tag-form');

  return (
    <div className="flex size-full max-w-[400px] flex-1 flex-col items-center justify-center gap-3">
      <span className="font-bold">{createTagTitle}</span>
      <span className="text-neutral mb-3 text-sm">{createTagDescription}</span>
      <Button
        type="submit"
        color="text"
        isLoading={isSubmitting}
        label={createTagButton.ariaLabel.value}
        isFullWidth={false}
        variant="outline"
        onClick={onClickCreateTag}
      >
        {createTagButton.text}
      </Button>
    </div>
  );
};
