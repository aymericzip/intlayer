import {
  Button,
  Checkbox,
  Container,
  PopoverStatic,
  SearchInput,
} from '@intlayer/design-system';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useCasesList } from '@/data/useCases';

interface FiltersBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedUseCases: string[];
  onUseCasesChange: (useCases: string[]) => void;
  isOpenSource: boolean;
  onOpenSourceChange: (isOpenSource: boolean) => void;
}

export const FiltersBar = ({
  searchQuery,
  onSearchChange,
  selectedUseCases,
  onUseCasesChange,
  isOpenSource,
  onOpenSourceChange,
}: FiltersBarProps) => {
  const content = useIntlayer('app');

  return (
    <Container
      className="sticky top-20 z-10 mx-auto my-3 w-full max-w-5xl shadow"
      roundedSize="3xl"
      padding="sm"
      transparency="lg"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <SearchInput
          color="text"
          placeholder={content.showcase.searchPlaceholder.value}
          defaultValue={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e.target.value)
          }
          type="text"
        />

        <PopoverStatic identifier="use-case-filter">
          <Button
            variant="hoverable"
            size="sm"
            color="text"
            label={content.showcase.filters.useCase.value}
          >
            <span className="flex flex-row items-center gap-1.5 rounded-md px-3 py-1.5 text-xs">
              <SlidersHorizontal className="size-3.5" />
              <span>{content.showcase.filters.useCase}</span>
              <ChevronDown className="size-3.5" />
            </span>
          </Button>

          <PopoverStatic.Detail identifier="use-case-filter" xAlign="start">
            <Container className="min-w-[180px]" roundedSize="xl" padding="sm">
              <div className="z-50 flex flex-col gap-2">
                {useCasesList.map((uc) => (
                  <Checkbox
                    key={uc}
                    name={uc}
                    label={uc}
                    size="sm"
                    checked={selectedUseCases.includes(uc)}
                    onChange={() => {
                      const newSelected = selectedUseCases.includes(uc)
                        ? selectedUseCases.filter((item) => item !== uc)
                        : [...selectedUseCases, uc];

                      onUseCasesChange(newSelected);
                    }}
                  />
                ))}
              </div>
            </Container>
          </PopoverStatic.Detail>
        </PopoverStatic>
        <div className="py-0">
          <Checkbox
            name="opensource"
            color="text"
            size="xs"
            labelClassName="text-xs"
            label={content.showcase.filters.openSource}
            checked={isOpenSource}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onOpenSourceChange(e.target.checked)
            }
          />
        </div>
      </div>
    </Container>
  );
};
