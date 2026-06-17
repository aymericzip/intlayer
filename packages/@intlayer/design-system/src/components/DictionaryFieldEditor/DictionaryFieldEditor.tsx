'use client';

import { Container } from '@components/Container';
import { CopyToClipboard } from '@components/CopyToClipboard';
import {
  useConfiguration,
  useDictionariesRecordActions,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types/dictionary';
import { ArrowLeft } from 'lucide-react';
import { type FC, type ReactNode, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Button } from '../Button';
import { LocaleSwitcherContentProvider } from '../LocaleSwitcherContentDropDown';
import { TabSelector } from '../TabSelector';
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
  rightContent?: ReactNode;
};

export const DictionaryFieldEditor: FC<DictionaryFieldEditorProps> = ({
  dictionary,
  onClickDictionaryList,
  isDarkMode,
  mode,
  onDelete,
  onSave,
  showReturnButton = true,
  rightContent,
}) => {
  const config = useConfiguration();
  const { returnToDictionaryList } = useIntlayer('dictionary-field-editor');
  const { focusedContent, setFocusedContent } = useFocusUnmergedDictionary();
  const { setLocaleDictionary } = useDictionariesRecordActions();
  const [activeTab, setActiveTab] = useState<string>('content');

  useEffect(() => {
    setFocusedContent({
      ...(focusedContent ?? {}),
      dictionaryKey: dictionary.key,
      dictionaryLocalId: dictionary.localId,
    });
    setLocaleDictionary(dictionary);
  }, []);

  return (
    <LocaleSwitcherContentProvider
      availableLocales={config?.internationalization?.locales ?? []}
    >
      <div className="relative flex h-full min-h-0 w-full flex-1 flex-col md:overflow-hidden">
        {showReturnButton && (
          <Button
            onClick={onClickDictionaryList}
            variant="hoverable"
            className="z-10 mr-auto mb-6 ml-5 shrink-0"
            color="text"
            Icon={ArrowLeft}
            label={returnToDictionaryList.label.value}
          >
            {returnToDictionaryList.text}
          </Button>
        )}

        <div className="mb-22 flex min-h-0 flex-1 flex-col overflow-hidden">
          {/* Tab headers */}
          <div className="sticky top-0 z-10 flex shrink-0 gap-3 rounded-xl bg-background/20 p-3 pb-4">
            <TabSelector
              selectedChoice={activeTab}
              tabs={[
                ...(mode.includes('remote')
                  ? [
                      <button
                        key="details"
                        className="cursor-pointer whitespace-nowrap rounded-md px-4 py-1 font-medium text-sm transition-colors focus:outline-none"
                        data-active={activeTab === 'details'}
                        onClick={() => setActiveTab('details')}
                        type="button"
                      >
                        Details
                      </button>,
                    ]
                  : []),
                <button
                  key="structure"
                  className="cursor-pointer whitespace-nowrap rounded-md px-4 py-1 font-medium text-sm transition-colors focus:outline-none"
                  data-active={activeTab === 'structure'}
                  onClick={() => setActiveTab('structure')}
                  type="button"
                >
                  Structure
                </button>,
                <button
                  key="content"
                  className="cursor-pointer whitespace-nowrap rounded-md px-4 py-1 font-medium text-sm transition-colors focus:outline-none"
                  data-active={activeTab === 'content'}
                  onClick={() => setActiveTab('content')}
                  type="button"
                >
                  Content
                </button>,
                <button
                  key="json"
                  className="cursor-pointer whitespace-nowrap rounded-md px-4 py-1 font-medium text-sm transition-colors focus:outline-none"
                  data-active={activeTab === 'json'}
                  onClick={() => setActiveTab('json')}
                  type="button"
                >
                  JSON
                </button>,
              ]}
              hoverable
              color="text"
            />
            <div className="flex w-full items-center justify-end">
              {rightContent}
            </div>
          </div>
          {/* Tab content — only active panel is mounted */}
          <div className="min-h-0 flex-1 overflow-y-auto p-6">
            <div className="flex w-full min-w-0 flex-col items-stretch gap-6">
              {mode.includes('remote') && activeTab === 'details' && (
                <DictionaryDetailsForm
                  dictionary={dictionary}
                  mode={mode}
                  isDarkMode={isDarkMode}
                />
              )}
              {activeTab === 'structure' && (
                <StructureEditor dictionary={dictionary} />
              )}
              {activeTab === 'content' && (
                <ContentEditor
                  dictionary={dictionary}
                  isDarkMode={isDarkMode}
                />
              )}
              {activeTab === 'json' && (
                <JSONEditor dictionary={dictionary} isDarkMode={isDarkMode} />
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 z-20 w-full p-2">
          <Container
            color="card"
            roundedSize="2xl"
            padding="sm"
            className="w-full shrink-0 flex-row flex-wrap items-center justify-end gap-10 bg-background/20 md:bottom-0"
          >
            <CopyToClipboard
              text={dictionary.id!}
              className="text-nowrap text-neutral text-sm"
              size={9}
            >
              {dictionary.id}
            </CopyToClipboard>
            <SaveForm
              dictionary={dictionary}
              mode={mode}
              onDelete={() => {
                setFocusedContent(null);
                onDelete?.();
              }}
              onSave={onSave}
            />
          </Container>
        </div>
      </div>
    </LocaleSwitcherContentProvider>
  );
};
