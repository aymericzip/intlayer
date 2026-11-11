import { Button } from '@intlayer/design-system/button';
import { Loader } from '@intlayer/design-system/loader';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { PenTool } from 'lucide-react';
import { type FC, memo, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useIntlayer } from 'react-intlayer';
import { Editor } from '#components/Dashboard/Editor';
import { DictionaryLoaderVisualEditor } from '#components/Dashboard/Editor/DictionaryLoaderVisualEditor';
import {
  DashboardRightPanelId,
  useDashboardRightPanel,
  useDashboardRightPanelContainer,
  useRegisterDashboardRightPanel,
} from '#hooks/useDashboardRightPanel';

const DRAWER_ID = DashboardRightPanelId.VisualEditor;

export const VisualEditorDrawer: FC = memo(() => {
  const { toggle: togglePanel, isOpen: checkIsOpen } = useDashboardRightPanel();
  useRegisterDashboardRightPanel(DRAWER_ID);
  const { buttonLabel, buttonDescription } = useIntlayer(
    'visual-editor-drawer'
  );
  const isOpen = checkIsOpen(DRAWER_ID);
  const portalTarget = useDashboardRightPanelContainer();

  return (
    <>
      <PopoverStatic identifier={DRAWER_ID}>
        <Button
          onClick={() => togglePanel(DRAWER_ID)}
          type="button"
          variant="hoverable"
          label={buttonLabel.value}
          Icon={PenTool}
          size="icon-lg"
          isActive={isOpen}
        />
        <PopoverStatic.Detail identifier={DRAWER_ID} xAlign="end">
          <span className="flex gap-4 py-2 ps-4 pe-2 text-sm text-nowrap text-neutral">
            {buttonDescription}
          </span>
        </PopoverStatic.Detail>
      </PopoverStatic>

      {isOpen &&
        portalTarget &&
        createPortal(
          <div className="flex size-full flex-col overflow-hidden p-1.5">
            {/* Own boundary: dynamic dictionaries suspend on first use, which
                would otherwise hide the navbar drawer and leave the panel empty */}
            <Suspense fallback={<Loader />}>
              <Editor
                DictionariesLoader={DictionaryLoaderVisualEditor}
                suppressEditionDrawer
              />
            </Suspense>
          </div>,
          portalTarget
        )}
    </>
  );
});
