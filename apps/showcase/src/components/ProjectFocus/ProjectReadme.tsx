import {
  Container,
  ExpandCollapse,
  H2,
  H3,
  H4,
  H5,
  H6,
  MarkdownRenderer,
} from '@intlayer/design-system';
import { useQuery } from '@tanstack/react-query';
import { cn } from '#/utils/cn';

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

interface ProjectReadmeProps {
  githubUrl: string;
}

export const ProjectReadme = ({ githubUrl }: ProjectReadmeProps) => {
  const rawUrl = parseGithubRawUrl(githubUrl);

  const { data: readme, isPending } = useQuery({
    queryKey: ['readme', rawUrl],
    queryFn: () => fetchReadme(rawUrl!),
    enabled: !!rawUrl,
    retry: false,
    staleTime: 1000 * 60 * 60,
  });

  if (!rawUrl) return null;

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
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
        className="overflow-hidden bg-text-opposite"
      >
        <ExpandCollapse>
          <MarkdownRenderer
            components={{ h1: H2, h2: H3, h3: H4, h4: H5, h5: H6 }}
            wrapper={({ className, children, ...props }) => (
              <div
                className={cn('flex flex-col gap-4 p-10', className)}
                {...props}
              >
                {children}
              </div>
            )}
          >
            {readme}
          </MarkdownRenderer>
        </ExpandCollapse>
      </Container>
    </>
  );
};
