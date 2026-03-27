import {
  Container,
  H2,
  H3,
  H4,
  H5,
  H6,
  MarkdownRenderer,
} from '@intlayer/design-system';
import { cn } from '@intlayer/design-system/utils';
import { useQuery } from '@tanstack/react-query';
import React, { type HTMLProps, memo } from 'react';

const parseGithubRawUrl = (githubUrl: string): string | null => {
  try {
    const url = new URL(githubUrl);
    if (!url.hostname.includes('github.com')) return null;
    const parts = url.pathname.split('/').filter(Boolean);
    const [owner, repo] = parts;
    if (!owner || !repo) return null;
    return `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`;
  } catch {
    return null;
  }
};

const fetchReadme = async (rawUrl: string): Promise<string> => {
  const res = await fetch(rawUrl);
  if (!res.ok) throw new Error('README not found');
  return res.text();
};

const markdownComponents = {
  h1: H2,
  h2: H3,
  h3: H4,
  h4: H5,
  h5: H6,
  // Use div instead of p to avoid invalid nesting (e.g. <p align="center"> inside a markdown <p>)
  p: ({ children, ...props }: HTMLProps<HTMLElement>) => (
    <div {...(props as HTMLProps<HTMLDivElement>)}>{children}</div>
  ),
};

const MarkdownWrapper = ({ className, children, ...props }: any) => (
  <div className={cn('flex flex-col gap-4 p-10', className)} {...props}>
    {children}
  </div>
);

// Isolate and memoize the heavy Markdown component
const MemoizedMarkdown = memo(({ content }: { content: string }) => (
  <MarkdownRenderer components={markdownComponents} wrapper={MarkdownWrapper}>
    {content}
  </MarkdownRenderer>
));

interface ProjectReadmeProps {
  githubUrl: string;
}

export const ProjectReadme = React.memo(({ githubUrl }: ProjectReadmeProps) => {
  const rawUrl = parseGithubRawUrl(githubUrl);

  const { data: readme, isPending } = useQuery({
    queryKey: ['readme', rawUrl],
    queryFn: () => fetchReadme(rawUrl!),
    enabled: !!rawUrl,
    retry: false,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (!rawUrl) return null;

  if (isPending) {
    return (
      <div className="space-y-3">
        {['s1', 's2', 's3', 's4', 's5', 's6'].map((key, i) => (
          <div
            key={key}
            className="h-4 animate-pulse rounded bg-neutral/20"
            style={{ width: `${85 - (i % 3) * 15}%` }}
          />
        ))}
      </div>
    );
  }

  if (!readme) return null;

  return (
    <>
      <H2 className="py-10 pl-10">Readme</H2>
      <Container
        roundedSize="2xl"
        border
        borderColor="text"
        className="max-h-[80vh] overflow-scroll bg-text-opposite"
      >
        <MemoizedMarkdown content={readme} />
      </Container>
    </>
  );
});
