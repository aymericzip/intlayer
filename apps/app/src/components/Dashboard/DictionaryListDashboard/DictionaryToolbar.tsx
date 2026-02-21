import { Button, SearchInput } from '@intlayer/design-system';
import type { Dictionary } from '@intlayer/types';
import type { Table } from '@tanstack/react-table';
import { Filter, Plus, Trash2 } from 'lucide-react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import type { useDictionaryDashboard } from './useDictionaryDashboard';

interface DictionaryToolbarProps {
  dashboard: ReturnType<typeof useDictionaryDashboard>;
  table: Table<Dictionary>; // Ideally typed to Table<Dictionary>
}

export const DictionaryToolbar: FC<DictionaryToolbarProps> = ({
  dashboard,
  table,
}) => {
  const { content, params, setParam, state } = dashboard;
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
            label=""
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
        <Button
          Icon={Plus}
          color="text"
          label=""
          onClick={() => state.setIsCreationModalOpen(true)}
        >
          {content.createDictionaryButton?.text}
        </Button>
      </div>
    </div>
  );
};
