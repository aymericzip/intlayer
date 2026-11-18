import { Button } from '@intlayer/design-system/button';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type NoTagViewProps = {
  onClickCreateTag: () => void;
};

export const NoTagView: FC<NoTagViewProps> = ({ onClickCreateTag }) => {
  const { createTagButton, createTagTitle, createTagDescription } =
    useIntlayer('tag-form');

  return (
    <div className="flex size-full max-w-100 flex-1 flex-col items-center justify-center gap-3">
      <span className="font-bold">{createTagTitle}</span>
      <span className="mb-3 text-sm text-neutral">{createTagDescription}</span>
      <Button
        color="text"
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
