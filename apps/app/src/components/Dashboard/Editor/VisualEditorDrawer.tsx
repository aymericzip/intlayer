import { Button } from '@intlayer/design-system/button';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { PenTool } from 'lucide-react';
import { type FC, memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIntlayer } from 'react-intlayer';
import { Editor } from '#components/Dashboard/Editor';
import { DictionaryLoaderVisualEditor } from '#components/Dashboard/Editor/DictionaryLoaderVisualEditor';
import { useDashboardRightPanel } from '#hooks/useDashboardRightPanel';

const DRAWER_ID = 'visual-editor';

export const VisualEditorDrawer: FC = memo(() => {
  const { open: openPanel, isOpen: checkIsOpen } = useDashboardRightPanel();
  const { buttonLabel, buttonDescription } = useIntlayer(
    'visual-editor-drawer'
  );
  const isOpen = checkIsOpen(DRAWER_ID);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.getElementById('dashboard-right-panel'));
  }, []);

  return (
    <>
      <PopoverStatic identifier={DRAWER_ID}>
        <Button
          onClick={() => openPanel(DRAWER_ID)}
          type="button"
          variant="hoverable"
          label={buttonLabel.value}
          Icon={PenTool}
          size="icon-lg"
          isActive={isOpen}
        />
        <PopoverStatic.Detail identifier={DRAWER_ID} xAlign="end">
          <span className="flex gap-4 text-nowrap py-2 pr-2 pl-4 text-neutral text-sm">
            {buttonDescription}
          </span>
        </PopoverStatic.Detail>
      </PopoverStatic>

      {isOpen &&
        portalTarget &&
        createPortal(
          <div className="flex size-full flex-col overflow-hidden">
            <Editor
              DictionariesLoader={DictionaryLoaderVisualEditor}
              suppressEditionDrawer
            />
          </div>,
          portalTarget
        )}
    </>
  );
});
