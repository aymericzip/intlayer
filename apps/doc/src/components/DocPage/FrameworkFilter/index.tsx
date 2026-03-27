'use client';

import {
  Button,
  Modal,
  PopoverStatic,
  TechLogo,
  TechLogoName,
} from '@intlayer/design-system';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { cn } from '@intlayer/design-system/utils';
import { Filter } from 'lucide-react';
import { type ComponentProps, type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

export type FrameworkLogoKey =
  | 'nextjs'
  | 'react'
  | 'vite'
  | 'vue'
  | 'nuxt'
  | 'solid'
  | 'tanstack'
  | 'svelte'
  | 'preact'
  | 'angular'
  | 'lynx'
  | 'astro'
  | 'express'
  | 'nest'
  | 'fastify'
  | 'hono'
  | 'adonis'
  | 'lit'
  | 'vanilla'
  | 'node';

export type FrameworkEntry = {
  /** Value stored in the filter state and matched against section.frameworks[] */
  id: string;
  label: string;
  logoKey?: FrameworkLogoKey;
};

/**
 * The "All" sentinel – selecting it clears the active filter.
 * Use `id: null` to distinguish it from real frameworks at runtime.
 */
const ALL_ID = null;

export const frameworks: FrameworkEntry[] = [
  { id: 'nextjs', label: 'Next.js', logoKey: 'nextjs' },
  { id: 'react', label: 'React', logoKey: 'react' },
  { id: 'vite', label: 'Vite', logoKey: 'vite' },
  { id: 'vue', label: 'Vue', logoKey: 'vue' },
  { id: 'nuxt', label: 'Nuxt', logoKey: 'nuxt' },
  { id: 'solid', label: 'Solid', logoKey: 'solid' },
  { id: 'tanstack', label: 'TanStack', logoKey: 'tanstack' },
  { id: 'svelte', label: 'Svelte', logoKey: 'svelte' },
  { id: 'preact', label: 'Preact', logoKey: 'preact' },
  { id: 'angular', label: 'Angular', logoKey: 'angular' },
  { id: 'lynx', label: 'Lynx', logoKey: 'lynx' },
  { id: 'astro', label: 'Astro', logoKey: 'astro' },
  { id: 'node', label: 'Node', logoKey: 'node' },
  { id: 'express', label: 'Express', logoKey: 'express' },
  { id: 'nest', label: 'NestJS', logoKey: 'nest' },
  { id: 'fastify', label: 'Fastify', logoKey: 'fastify' },
  { id: 'hono', label: 'Hono', logoKey: 'hono' },
  { id: 'adonis', label: 'Adonis', logoKey: 'adonis' },
  { id: 'lit', label: 'Lit', logoKey: 'lit' },
  { id: 'vanilla', label: 'Vanilla', logoKey: 'vanilla' },
];

const logoMap: Record<FrameworkLogoKey, TechLogoName> = {
  nextjs: TechLogoName.Nextjs,
  react: TechLogoName.React,
  vite: TechLogoName.Vite,
  vue: TechLogoName.Vue,
  nuxt: TechLogoName.Nuxt,
  solid: TechLogoName.Solid,
  tanstack: TechLogoName.Tanstack,
  svelte: TechLogoName.Svelte,
  preact: TechLogoName.Preact,
  angular: TechLogoName.Angular,
  lynx: TechLogoName.Lynx,
  astro: TechLogoName.Astro,
  express: TechLogoName.Express,
  nest: TechLogoName.NestJS,
  fastify: TechLogoName.Fastify,
  hono: TechLogoName.Hono,
  adonis: TechLogoName.Adonis,
  lit: TechLogoName.Lit,
  vanilla: TechLogoName.Vanilla,
  node: TechLogoName.Node,
};

export const FrameworkLogo: FC<
  {
    logoKey?: FrameworkLogoKey;
    className?: string;
  } & Omit<ComponentProps<typeof TechLogo>, 'name'>
> = ({ logoKey, className, ...props }) => {
  if (!logoKey) return null;

  const name = logoMap[logoKey];

  return (
    <TechLogo
      {...props}
      className={cn('size-5 shrink-0', className)}
      name={name}
    />
  );
};

export const FRAMEWORK_STORAGE_KEY = 'doc-framework-filter';

/** The selected framework ids, or null meaning "All". */
export const useFrameworkFilter = () =>
  usePersistedStore<string[] | null>(FRAMEWORK_STORAGE_KEY, null);

type FrameworkFilterUIProps = {
  selected: string[] | null;
  onSelect: (ids: string[] | null) => void;
};

const FrameworkFilterUI: FC<FrameworkFilterUIProps> = ({
  selected,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { title, popoverLabel, filterActiveLabel, allFrameworks } =
    useIntlayer('framework-filter');

  const activeEntries =
    selected?.map(
      (id) => frameworks.find((framework) => framework.id === id)!
    ) ?? [];

  const handleSelect = (id: string | null) => {
    if (id === ALL_ID) {
      onSelect(null);
    } else {
      const isAlreadySelected = selected?.includes(id);
      if (isAlreadySelected) {
        const nextSelected = selected?.filter((i) => i !== id) ?? [];
        onSelect(nextSelected.length > 0 ? nextSelected : null);
      } else {
        onSelect([...(selected ?? []), id]);
      }
    }
  };

  return (
    <>
      <PopoverStatic identifier="doc-nav-framework-filter">
        <Button
          Icon={
            activeEntries.length > 0
              ? () => (
                  <span className="flex items-center gap-1">
                    {activeEntries.length > 2 ? (
                      <div className="flex items-end gap-1">
                        <Filter className="size-4" />
                        <span className="text-text text-xs">
                          {activeEntries.length}
                        </span>
                      </div>
                    ) : (
                      activeEntries.map((entry) => (
                        <FrameworkLogo
                          key={entry.id}
                          logoKey={entry.logoKey}
                          className="-mx-0.5"
                        />
                      ))
                    )}
                  </span>
                )
              : Filter
          }
          label={title.value}
          size="icon-md"
          variant="hoverable"
          color="text"
          className={activeEntries.length > 0 ? 'opacity-70' : ''}
          onClick={() => setIsOpen(true)}
        />
        <PopoverStatic.Detail
          identifier="doc-nav-framework-filter"
          className="min-w-50 p-3 text-sm"
        >
          {activeEntries.length > 0
            ? filterActiveLabel({
                framework: activeEntries.map((e) => e.label).join(', '),
              })
            : popoverLabel}
        </PopoverStatic.Detail>
      </PopoverStatic>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        size="sm"
        padding="md"
        hasCloseButton
        className="max-h-[95vh]"
      >
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => handleSelect(ALL_ID)}
            label=""
            variant="hoverable"
            color="text"
            isActive={!selected || selected.length === 0}
            Icon={Filter}
          >
            {allFrameworks}
          </Button>

          {/* Framework options */}
          <div className="grid grid-cols-2 gap-2">
            {frameworks.map((framework) => {
              const isSelected = selected?.includes(framework.id);
              return (
                <Button
                  key={framework.id}
                  label=""
                  type="button"
                  variant="hoverable"
                  isActive={isSelected}
                  color="text"
                  onClick={() => handleSelect(framework.id)}
                  Icon={() => (
                    <FrameworkLogo
                      logoKey={framework.logoKey}
                      className={cn(
                        'size-4',
                        isSelected ? 'opacity-100' : 'opacity-60'
                      )}
                    />
                  )}
                >
                  {framework.label}
                </Button>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export const FrameworkFilter: FC<{
  selected?: string[] | null;
  onSelect?: (ids: string[] | null) => void;
}> = ({ selected: selectedProp, onSelect: onSelectProp }) => {
  const [selectedInternal, setSelectedInternal] = useFrameworkFilter();

  const selected = selectedProp !== undefined ? selectedProp : selectedInternal;
  const onSelect =
    onSelectProp !== undefined ? onSelectProp : setSelectedInternal;

  return <FrameworkFilterUI selected={selected} onSelect={onSelect} />;
};
