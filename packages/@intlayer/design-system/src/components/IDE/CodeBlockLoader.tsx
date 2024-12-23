'use client';

import { type FC, Suspense } from 'react';
import { CodeBlock, CodeBlockProps } from './CodeBlock';

const CodeDefault: FC<CodeBlockProps> = ({ children }) => (
  <pre>
    <code>
      {children.split('\n').map((line, index) => (
        <span className="line block w-full" key={index}>
          {line}
        </span>
      ))}
    </code>
  </pre>
);

export const CodeBlockLoader: FC<CodeBlockProps> = (props) => (
  <Suspense fallback={<CodeDefault {...props} />}>
    <CodeBlock {...props} />
  </Suspense>
);
