'use client';

import Markdown from 'markdown-to-jsx';
import type { FC } from 'react';
import tw from 'twin.macro';
import { Container } from '../Container';
import { H1, H2, H3 } from '../Headers';
import { SectionScroller } from '../Headers/SectionScroller';
import { Code } from '../IDE';

type MarkdownRendererProps = {
  isDarkMode?: boolean;
  children: string;
};

const StyledInlineCode = tw.strong`shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] bg-card/60 p-1 rounded dark:bg-card-dark/60 shadow-sm backdrop-blur`;
const StyledUl = tw.ul`flex flex-col pl-5 mt-5 gap-3`;
const StyledOl = tw.ul`flex flex-col pl-5 mt-5 gap-3`;
const StyledWrapper = tw.div`text-text dark:text-text-dark flex flex-col gap-6 p-10`;
const StyledLink = tw.a`text-neutral dark:text-neutral-dark underline`;
const StyledImage = tw.img`max-w-full rounded-md`;
const StyledBlockquote = tw.blockquote`flex flex-col pl-5 mt-5 gap-3 border-l-4 border-card dark:border-card-dark text-neutral dark:text-neutral-dark`;

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  isDarkMode,
}) => (
  <Markdown
    options={{
      overrides: {
        h1: {
          component: H1,
        },
        h2: {
          component: H2,
        },
        h3: {
          component: H3,
        },
        code: {
          component: (props) =>
            typeof props.className === 'undefined' ? (
              <StyledInlineCode>{props.children}</StyledInlineCode>
            ) : (
              <Container className="max-w-full overflow-x-scroll">
                <Code
                  isDarkMode={isDarkMode}
                  showLineNumbers={false}
                  {...props}
                />
              </Container>
            ),
        },
        blockquote: (props) => <StyledBlockquote {...props} />,
        ul: StyledUl,
        ol: StyledOl,
        img: (props) => (
          // eslint-disable-next-line jsx-a11y/alt-text
          <StyledImage
            {...props}
            loading="lazy"
            src={`${props.src}?raw=true`}
          />
        ),
        a: StyledLink,
      },
      wrapper: (props) => (
        <>
          <SectionScroller />
          <StyledWrapper {...props} />
        </>
      ),
    }}
  >
    {children ?? ''}
  </Markdown>
);
