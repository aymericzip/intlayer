import {
  Button,
  Container,
  PopoverStatic,
  SearchInput,
} from '@intlayer/design-system';
import type { Dictionary } from '@intlayer/types';
import type { Table } from '@tanstack/react-table';
import { Filter, Plus, Trash2 } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import type { useDictionaryDashboard } from './useDictionaryDashboard';

interface DictionaryToolbarProps {
  dashboard: ReturnType<typeof useDictionaryDashboard>;
  table: Table<Dictionary>;
}

export const DictionaryToolbar: FC<DictionaryToolbarProps> = ({
  dashboard,
  table,
}) => {
  const content = useIntlayer('dictionary-list');
  const { params, setParam, state } = dashboard;
  const { register } = useForm({ defaultValues: { search: params.search } });

  const selectedCount = Object.keys(state.rowSelection).length;

  return (
    <div className="flex items-center justify-between gap-4 px-10">
      <div className="flex max-w-md flex-1 items-center gap-4">
        <SearchInput
          placeholder={content.searchPlaceholder.value}
          {...register('search', {
            onChange: (e) => setParam('search', e.target.value),
          })}
        />
        <Button
          variant="hoverable"
          Icon={Filter}
          onClick={() => state.setIsFiltersModalOpen(true)}
          label={content.filterLabels.button.value}
        />
      </div>

      <div className="flex items-center gap-2">
        {selectedCount > 0 && (
          <Button
            color="error"
            variant="outline"
            Icon={Trash2}
            label={content.deleteSelectedButton.label.value}
            onClick={() => {
              const ids = table
                .getSelectedRowModel()
                .rows.map((r: any) => r.original.id);
              state.setDictionaryToDelete(ids);
            }}
          >
            {content.deleteSelectedButton.text} ({selectedCount})
          </Button>
        )}
        <PopoverStatic identifier="create-dictionary-toolbar">
          <Button
            Icon={Plus}
            color="text"
            label={content.createDictionaryButton.label.value}
            onClick={() => state.setIsCreationModalOpen(true)}
          >
            {content.createDictionaryButton.text}
          </Button>
          <PopoverStatic.Detail
            xAlign="end"
            identifier="create-dictionary-toolbar"
          >
            <Container className="p-3">
              <p>{content.createDictionaryButton.popover}</p>
            </Container>
          </PopoverStatic.Detail>
        </PopoverStatic>
      </div>
    </div>
  );
};
