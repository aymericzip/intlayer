import { Button } from '@intlayer/design-system/button';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { Modal } from '@intlayer/design-system/modal';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { TechLogo, type TechLogoName } from '@intlayer/design-system/tech-logo';
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
  | 'elysia'
  | 'fastify'
  | 'hono'
  | 'adonis'
  | 'lit'
  | 'vanilla'
  | 'js'
  | 'htmx'
  | 'remix'
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
  { id: 'remix', label: 'Remix', logoKey: 'remix' },
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
  { id: 'elysia', label: 'Elysia', logoKey: 'elysia' },
  { id: 'adonis', label: 'Adonis', logoKey: 'adonis' },
  { id: 'lit', label: 'Lit', logoKey: 'lit' },
  { id: 'vanilla', label: 'Vanilla', logoKey: 'vanilla' },
  { id: 'htmx', label: 'htmx', logoKey: 'htmx' },
];

const logoMap: Record<FrameworkLogoKey, TechLogoName> = {
  nextjs: 'nextjs',
  react: 'react',
  remix: 'remix',
  vite: 'vite',
  vue: 'vue',
  nuxt: 'nuxt',
  solid: 'solid',
  tanstack: 'tanstack',
  svelte: 'svelte',
  preact: 'preact',
  angular: 'angular',
  lynx: 'lynx',
  astro: 'astro',
  express: 'express',
  nest: 'nestjs',
  fastify: 'fastify',
  hono: 'hono',
  adonis: 'adonis',
  lit: 'lit',
  vanilla: 'vanilla',
  js: 'vanilla',
  htmx: 'htmx',
  node: 'node',
  elysia: 'elysia',
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

/** DOM id of the sprite `<symbol>` holding a framework logo. */
const getFrameworkLogoSymbolId = (logoKey: FrameworkLogoKey): string =>
  `framework-logo-${logoMap[logoKey]}`;

const isFrameworkLogoKey = (value: string): value is FrameworkLogoKey =>
  value in logoMap;

/**
 * Collects the logo keys a navigation tree displays, deduplicated by the logo
 * they resolve to (`js` and `vanilla` share one).
 *
 * @param section - Navigation tree whose nodes may carry `frameworks`.
 * @returns One logo key per distinct logo.
 */
export const collectFrameworkLogoKeys = <
  Node extends { frameworks?: string[]; subSections?: Record<string, Node> },
>(
  section: Record<string, Node>
): FrameworkLogoKey[] => {
  const logoKeysByLogo = new Map<TechLogoName, FrameworkLogoKey>();

  const visit = (nodes: Record<string, Node>): void => {
    for (const node of Object.values(nodes)) {
      for (const framework of node.frameworks ?? []) {
        if (!isFrameworkLogoKey(framework)) continue;
        const logoName = logoMap[framework];
        if (!logoKeysByLogo.has(logoName)) {
          logoKeysByLogo.set(logoName, framework);
        }
      }
      if (node.subSections) visit(node.subSections);
    }
  };

  visit(section);

  return [...logoKeysByLogo.values()];
};

/**
 * Renders each logo once as a `<symbol>`, so long navigation trees reference
 * them through {@link FrameworkLogoReference} instead of inlining the same SVG
 * paths for every entry. Hidden without `display: none`, which would break
 * gradients referenced from inside the symbols.
 */
export const FrameworkLogoSprite: FC<{ logoKeys: FrameworkLogoKey[] }> = ({
  logoKeys,
}) => {
  if (logoKeys.length === 0) return null;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="pointer-events-none absolute size-0 overflow-hidden"
    >
      <defs>
        {logoKeys.map((logoKey) => (
          <symbol
            key={logoKey}
            id={getFrameworkLogoSymbolId(logoKey)}
            viewBox="0 0 24 24"
          >
            <TechLogo
              name={logoMap[logoKey]}
              width="24"
              height="24"
              fallback={null}
            />
          </symbol>
        ))}
      </defs>
    </svg>
  );
};

/**
 * Displays a logo rendered by {@link FrameworkLogoSprite} elsewhere on the
 * page. Decorative: the label next to it carries the meaning.
 */
export const FrameworkLogoReference: FC<
  {
    logoKey?: FrameworkLogoKey;
  } & Omit<ComponentProps<'svg'>, 'children'>
> = ({ logoKey, className, ...props }) => {
  if (!logoKey || !isFrameworkLogoKey(logoKey)) return null;

  return (
    <svg
      {...props}
      aria-hidden="true"
      focusable="false"
      className={cn('size-5 shrink-0', className)}
    >
      <use href={`#${getFrameworkLogoSymbolId(logoKey)}`} />
    </svg>
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
      } else if ((selected?.length ?? 0) >= 2) {
        // When clicking a 3rd item, replace the 2nd one and keep the 1st (primary)
        onSelect([selected![0], id]);
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
                        <span className="text-foreground text-xs">
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
        roundedSize="3xl"
        hasCloseButton
        className="max-h-[95vh]"
        border
        closeButtonColor="neutral"
      >
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => handleSelect(ALL_ID)}
            label={allFrameworks.value}
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
                  label={framework.label}
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
