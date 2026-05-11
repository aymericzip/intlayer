import { Button } from '@intlayer/design-system/button';
import { PopoverStatic } from '@intlayer/design-system/popover';
import {
  RightDrawer,
  useRightDrawer,
} from '@intlayer/design-system/right-drawer';
import { FocusDictionaryProvider } from '@intlayer/editor-react';
import { PenTool } from 'lucide-react';
import { type FC, memo } from 'react';
import { useIntlayer } from 'react-intlayer';
import { EditorConfigurationProvider } from '#components/Dashboard/ContentDashboard/ConfigurationProvider';
import { Editor } from '#components/Dashboard/Editor';
import { DictionaryLoaderDashboard } from '#components/Dashboard/Editor/DictionaryLoaderDashboard';

const DRAWER_ID = 'visual-editor';

export const VisualEditorDrawer: FC = memo(() => {
  const {
    open: openDrawer,
    isOpen: checkIsOpen,
    close: closeDrawer,
  } = useRightDrawer();
  const { title, buttonLabel, buttonDescription } = useIntlayer(
    'visual-editor-drawer'
  );
  const isOpen = checkIsOpen(DRAWER_ID);

  return (
    <>
      <PopoverStatic identifier={DRAWER_ID}>
        <Button
          onClick={() => openDrawer(DRAWER_ID)}
          type="button"
          variant="hoverable"
          label={buttonLabel.value}
          Icon={PenTool}
          size="icon-xl"
        />
        <PopoverStatic.Detail identifier={DRAWER_ID} xAlign="end">
          <span className="flex gap-4 text-nowrap py-2 pr-2 pl-4 text-neutral text-sm">
            {buttonDescription.value}
          </span>
        </PopoverStatic.Detail>
      </PopoverStatic>

      <RightDrawer
        isOpen={isOpen}
        onClose={() => closeDrawer(DRAWER_ID)}
        identifier={DRAWER_ID}
        title={title.value}
      >
        <div className="flex size-full flex-col overflow-hidden">
          <EditorConfigurationProvider>
            <FocusDictionaryProvider>
              <Editor DictionariesLoader={DictionaryLoaderDashboard} />
            </FocusDictionaryProvider>
          </EditorConfigurationProvider>
        </div>
      </RightDrawer>
    </>
  );
});
