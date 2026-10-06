import type { FunctionComponent } from 'preact';
import { DictionaryEditionDrawerController } from './DictionaryEditionDrawer';
import { DictionaryListDrawer } from './DictionaryListDrawer';
import { LongPressMessage } from './LongPressMessage';

export const EditorLayout: FunctionComponent = ({ children }) => (
  <div className="relative size-full bg-card p-3">
    {children}
    <div className="absolute inset-e-2 bottom-2">
      <LongPressMessage />
    </div>
    <DictionaryEditionDrawerController />
    <DictionaryListDrawer />
  </div>
);
