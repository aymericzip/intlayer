import { cn } from '@intlayer/design-system/utils';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useHashSection } from './useHashSection';

export type SettingsSection<SectionId extends string> = {
  /** Stable id, also used as the URL hash (`#members`). */
  id: SectionId;
  label: string;
  icon: LucideIcon;
  content: ReactNode;
  /** `danger` renders the entry in the error color, set apart at the end. */
  tone?: 'default' | 'danger';
};

type SettingsSectionLayoutProps<SectionId extends string> = {
  sections: SettingsSection<SectionId>[];
  className?: string;
};

/**
 * Settings page split into sections: a vertical navigation on desktop (a
 * horizontally scrolling row on mobile) and only the active section rendered.
 * The active section lives in the URL hash so it survives reloads and can be
 * linked to.
 */
export const SettingsSectionLayout = <SectionId extends string>({
  sections,
  className,
}: SettingsSectionLayoutProps<SectionId>) => {
  const { navigationLabel } = useIntlayer('settings-section-layout');
  const [activeSectionId, setActiveSectionId] = useHashSection(
    sections.map((section) => section.id)
  );
  const activeSection =
    sections.find((section) => section.id === activeSectionId) ?? sections[0];

  if (!activeSection) return null;

  return (
    <div
      className={cn(
        'grid w-full min-w-0 items-start gap-6 md:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12',
        className
      )}
    >
      <nav
        aria-label={navigationLabel.value}
        className="min-w-0 md:sticky md:top-24"
      >
        <ul className="flex gap-1 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
          {sections.map((section) => {
            const isDanger = section.tone === 'danger';
            const isActive = section.id === activeSection.id;
            const Icon = section.icon;

            return (
              <li
                key={section.id}
                className={cn(
                  'shrink-0',
                  isDanger &&
                    'md:mt-3 md:border-t md:border-dotted md:border-neutral/20 md:pt-3'
                )}
              >
                <button
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setActiveSectionId(section.id)}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-start text-sm whitespace-nowrap transition-colors',
                    isActive
                      ? 'bg-text/10 font-medium text-text'
                      : 'text-neutral hover:bg-text/5 hover:text-text',
                    isDanger &&
                      (isActive
                        ? 'bg-error/10 text-error'
                        : 'text-error/80 hover:bg-error/5 hover:text-error')
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {section.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <section
        aria-label={activeSection.label}
        className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-4"
      >
        {activeSection.content}
      </section>
    </div>
  );
};
