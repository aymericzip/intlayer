'use client';

import {
  useConfiguration,
  useDictionariesRecordActions,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types';
import { ArrowLeft } from 'lucide-react';
import { type FC, useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Button, ButtonColor, ButtonVariant } from '../Button';
import { LocaleSwitcherContentProvider } from '../LocaleSwitcherContentDropDown';
import { Tab } from '../Tab';
import { ContentEditor } from './ContentEditor';
import { DictionaryDetailsForm } from './DictionaryDetails/DictionaryDetailsForm';
import { JSONEditor } from './JSONEditor';
import { SaveForm } from './SaveForm/SaveForm';
import { StructureEditor } from './StructureEditor';

type DictionaryFieldEditorProps = {
  dictionary: Dictionary;
  onClickDictionaryList?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  isDarkMode?: boolean;
  mode: ('local' | 'remote')[];
  showReturnButton?: boolean;
};

export const DictionaryFieldEditor: FC<DictionaryFieldEditorProps> = ({
  dictionary,
  onClickDictionaryList,
  isDarkMode,
  mode,
  onDelete,
  onSave,
  showReturnButton = true,
}) => {
  const config = useConfiguration();
  const { returnToDictionaryList } = useIntlayer('dictionary-field-editor');
  const { setFocusedContent } = useFocusUnmergedDictionary();
  const { setLocaleDictionaries } = useDictionariesRecordActions();

  useEffect(() => {
    // Focus the dictionary if not focused
    setFocusedContent((prev) => ({
      ...(prev ?? {}),
      dictionaryKey: dictionary.key,
      dictionaryLocalId: dictionary.localId,
    }));
    setLocaleDictionaries((prev) => ({
      ...prev,
      [dictionary.localId!]: dictionary,
    }));
  }, []);

  return (
    <LocaleSwitcherContentProvider
      availableLocales={config?.internationalization.locales ?? []}
    >
      <div className="relative flex h-full min-h-0 w-full flex-1 flex-col gap-6 overflow-hidden">
        {showReturnButton && (
          <Button
            onClick={onClickDictionaryList}
            variant={ButtonVariant.HOVERABLE}
            className="z-10 mr-auto ml-5 shrink-0"
            color={ButtonColor.TEXT}
            Icon={ArrowLeft}
            label={returnToDictionaryList.label.value}
          >
            {returnToDictionaryList.text}
          </Button>
        )}

        <div className="min-h-0 flex-1 px-2">
          <Tab
            defaultTab="content"
            variant="ghost"
            fullHeight
            headerClassName="sticky top-0 z-10 rounded-xl bg-background/20 pb-4"
          >
            {mode.includes('remote') && (
              <Tab.Item label="Details" value="details">
                <DictionaryDetailsForm dictionary={dictionary} mode={mode} />
              </Tab.Item>
            )}
            <Tab.Item label="Structure" value="structure">
              <StructureEditor dictionary={dictionary} />
            </Tab.Item>
            <Tab.Item label="Content" value="content">
              <ContentEditor dictionary={dictionary} isDarkMode={isDarkMode} />
            </Tab.Item>
            <Tab.Item label="JSON" value="json">
              <JSONEditor dictionary={dictionary} isDarkMode={isDarkMode} />
            </Tab.Item>
          </Tab>
        </div>

        <div className="shrink-0 border-card border-t p-4">
          <SaveForm
            dictionary={dictionary}
            mode={mode}
            onDelete={() => {
              setFocusedContent(null as any);
              onDelete?.();
            }}
            onSave={onSave}
          />
        </div>
      </div>
    </LocaleSwitcherContentProvider>
  );
};
