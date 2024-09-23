import type { HTMLAttributes, FC } from 'react';

export type DropDownProps = HTMLAttributes<HTMLDivElement> & {
  identifier: string;
};

export type DropDownType = FC<DropDownProps> & {
  Trigger: FC<TriggerProps>;
  Panel: FC<PanelProps>;
};

export type TriggerProps = HTMLAttributes<HTMLButtonElement> & {
  identifier: string;
};

export type PanelProps = HTMLAttributes<HTMLDivElement> & {
  isFocusable?: boolean;
  isHidden?: boolean;
  isOverable?: boolean;
  identifier: string;
  align?: 'start' | 'end';
};
