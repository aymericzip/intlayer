'use client';

import { Container } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { usePathname, useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';

type DocPageLayoutProps = {
  children?: ReactNode;
};

export const DocPageLayout: FC<DocPageLayoutProps> = ({ children }) => {
  const { navbar } = useIntlayer('doc-page');
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex size-full border-b-[0.5px]">
      <Container
        className="h-full flex-none"
        roundedSize="none"
        transparency="sm"
      >
        <nav className="flex flex-col gap-5 px-6 py-10">
          {navbar.map((section1) => (
            <div key={section1.title.value}>
              <button
                className={cn([
                  'text-neutral hover:text-text dark:hover:text-text-dark cursor-pointer font-semibold transition-colors dark:text-neutral-200',
                  section1.url?.value === pathname,
                ])}
                onClick={() =>
                  typeof section1.url?.value === 'string' &&
                  router.push(section1.url.value)
                }
              >
                {section1.title}
              </button>

              {section1.subSections.length > 0 && (
                <div className="border-neutral dark:border-neutral-dark mt-4 flex flex-col gap-4 border-l-[0.5px] p-1">
                  {section1.subSections.map((section2) => (
                    <div key={section2.title.value}>
                      <button
                        className={cn([
                          'text-neutral hover:text-text dark:hover:text-text-dark cursor-pointer p-2 text-sm transition-colors dark:text-neutral-200',
                          section2.url?.value === pathname,
                        ])}
                        onClick={() =>
                          typeof section2.url.value === 'string' &&
                          router.push(section2.url.value)
                        }
                      >
                        {section2.title}
                      </button>

                      {section2.subSections &&
                        section2.subSections.length > 0 && (
                          <div className="text-neutral hover:text-text dark:hover:text-text-dark border-neutral dark:border-neutral-dark flex flex-col items-start gap-2 border-l-[0.5px] p-1 transition-colors">
                            {section2.subSections.map((section3) => (
                              <button
                                className={cn([
                                  'text-neutral hover:text-text dark:hover:text-text-dark cursor-pointer p-2 text-xs transition-colors dark:text-neutral-200',
                                  section3.url?.value === pathname,
                                ])}
                                key={section3.title.value}
                                onClick={() =>
                                  typeof section3.url.value === 'string' &&
                                  router.push(section3.url.value)
                                }
                              >
                                {section3.title}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </Container>
      <div className="grow">{children}</div>
    </div>
  );
};
