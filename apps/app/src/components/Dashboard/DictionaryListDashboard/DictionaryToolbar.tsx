import {
  Button,
  Checkbox,
  Container,
  PopoverStatic,
  SearchInput,
} from '@intlayer/design-system';
import type { Dictionary } from '@intlayer/types';
import type { Table } from '@tanstack/react-table';
import { Columns, Filter, Plus, Trash2 } from 'lucide-react';
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

  const hasAppliedFilters = params.location !== 'none' || !!params.tags;
  const activeTags = params.tags ? (params.tags as string).split(',') : [];
  const activeLocations =
    params.location === 'none'
      ? []
      : params.location === 'both'
        ? ['remote', 'local']
        : params.location === 'remote'
          ? ['remote']
          : ['local'];
  const appliedFiltersCount = activeTags.length + activeLocations.length;

  return (
    <div className="flex items-center justify-between gap-4 px-10">
      <div className="flex max-w-md flex-1 items-center gap-4">
        <SearchInput
          placeholder={content.searchPlaceholder.value}
          {...register('search', {
            onChange: (e) => setParam('search', e.target.value),
          })}
        />

        <div className="flex items-center gap-0.5">
          <PopoverStatic identifier="dictionary-filters">
            <Button
              variant="hoverable"
              color="text"
              size="icon-lg"
              onClick={() => state.setIsFiltersModalOpen(true)}
              Icon={Filter}
              label={content.filterLabels.button.value}
            />
            <PopoverStatic.Detail identifier="dictionary-filters">
              <Container className="p-3" roundedSize="xl">
                <p>{content.filterLabels.popover}</p>
              </Container>
            </PopoverStatic.Detail>
          </PopoverStatic>
          {hasAppliedFilters && (
            <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-text text-[10px] text-card">
              {appliedFiltersCount}
            </span>
          )}

          <PopoverStatic identifier="dictionary-columns">
            <Button
              variant="hoverable"
              color="text"
              size="icon-lg"
              Icon={Columns}
              label={content.selectColumns.value}
            />
            <PopoverStatic.Detail identifier="dictionary-columns">
              <Container className="flex flex-col gap-2 p-3" roundedSize="xl">
                <p className="mb-2 font-bold">{content.visibleColumns}</p>
                {table
                  .getAllLeafColumns()
                  .filter((column: any) => column.getCanHide())
                  .map((column: any) => (
                    <div
                      key={column.id}
                      className="flex items-center gap-2 p-2"
                    >
                      <Checkbox
                        id={`col-${column.id}`}
                        name={`col-${column.id}`}
                        checked={column.getIsVisible()}
                        onChange={(e) =>
                          column.toggleVisibility(e.target.checked)
                        }
                        size="sm"
                      />
                      <label
                        htmlFor={`col-${column.id}`}
                        className="cursor-pointer"
                      >
                        {column.id.charAt(0).toUpperCase() + column.id.slice(1)}
                      </label>
                    </div>
                  ))}
              </Container>
            </PopoverStatic.Detail>
          </PopoverStatic>
        </div>
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
