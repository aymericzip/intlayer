import type { FC, HTMLAttributes } from 'react';

export type UnrollablePanelTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  identifier: string;
};

type UnrollablePanelProps = HTMLAttributes<HTMLDivElement> & {
  isFocusable?: boolean;
  isHidden?: boolean;
  isOverable?: boolean;
  identifier: string;
};

export type UnrollablePanelType = FC<UnrollablePanelProps> & {
  Trigger: FC<UnrollablePanelTriggerProps>;
};
