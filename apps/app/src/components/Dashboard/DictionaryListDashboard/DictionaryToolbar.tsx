import {
  Button,
  Checkbox,
  Container,
  Popover,
  SearchInput,
} from '@intlayer/design-system';
import { Columns, Filter, Plus, Trash2 } from 'lucide-react';
import type { FC } from 'react';

interface DictionaryToolbarProps {
  register: any;
  searchPlaceholder: any;
  setIsFiltersModalOpen: (open: boolean) => void;
  filterLabels: any;
  hasAppliedFilters: boolean;
  appliedFiltersCount: number;
  selectColumns: any;
  visibleColumns: string;
  table: any;
  selectedRows: any[];
  handleBulkDelete: () => void;
  deleteSelectedButton: any;
  createDictionaryButton: any;
  setIsCreationModalOpen: (open: boolean) => void;
}

export const DictionaryToolbar: FC<DictionaryToolbarProps> = ({
  register,
  searchPlaceholder,
  setIsFiltersModalOpen,
  filterLabels,
  hasAppliedFilters,
  appliedFiltersCount,
  selectColumns,
  visibleColumns,
  table,
  selectedRows,
  handleBulkDelete,
  deleteSelectedButton,
  createDictionaryButton,
  setIsCreationModalOpen,
}) => (
  <div className="flex items-center justify-between gap-4 px-10">
    <div className="flex max-w-md flex-1 items-center gap-4">
      <SearchInput
        placeholder={searchPlaceholder.value}
        {...register('search')}
        className="flex-1"
      />
      <div className="flex items-center gap-0.5">
        <Popover identifier="dictionary-filters">
          <Button
            variant="hoverable"
            color="text"
            size="icon-lg"
            onClick={() => setIsFiltersModalOpen(true)}
            Icon={Filter}
            label={filterLabels.button.value}
          />
          <Popover.Detail identifier="dictionary-filters">
            <Container className="p-3" roundedSize="xl">
              <p>{filterLabels.popover}</p>
            </Container>
          </Popover.Detail>
        </Popover>
        {hasAppliedFilters && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-text text-[10px] text-card">
            {appliedFiltersCount}
          </span>
        )}

        <Popover identifier="dictionary-columns">
          <Button
            variant="hoverable"
            color="text"
            size="icon-lg"
            Icon={Columns}
            label={selectColumns.value}
          />
          <Popover.Detail identifier="dictionary-columns">
            <Container className="flex flex-col gap-2 p-3" roundedSize="xl">
              <p className="mb-2 font-bold">{visibleColumns}</p>
              {table
                .getAllLeafColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => (
                  <div key={column.id} className="flex items-center gap-2">
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
          </Popover.Detail>
        </Popover>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {selectedRows.length > 0 && (
        <Button
          color="error"
          variant="outline"
          onClick={handleBulkDelete}
          Icon={Trash2}
          label={deleteSelectedButton.label.value}
        >
          {deleteSelectedButton.text} ({selectedRows.length})
        </Button>
      )}
      <Button
        label={createDictionaryButton.ariaLabel.value}
        Icon={Plus}
        variant="default"
        color="text"
        onClick={() => setIsCreationModalOpen(true)}
      >
        {createDictionaryButton.text}
      </Button>
    </div>
  </div>
);
