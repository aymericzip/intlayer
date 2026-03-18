import type { FC, PropsWithChildren } from 'react';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';
import { LongPressMessage } from './LongPressMessage';

export const EditorLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="relative size-full bg-card p-3">
    {children}
    <div className="absolute right-2 bottom-2">
      <LongPressMessage />
    </div>
    <DictionaryEditionDrawerController />
    <DictionaryListDrawer />
  </div>
);
