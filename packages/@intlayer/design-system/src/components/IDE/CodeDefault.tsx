import type { FC, ReactNode } from 'react';

export const CodeDefault: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="min-w-0 max-w-full overflow-x-auto">
    <pre className="min-w-0 max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <code>
        {typeof children === 'string'
          ? children.split('\n').map((line, index) => (
              <span
                className="line block w-full"
                key={`line-${index}-${line.slice(0, 10)}`}
              >
                {line}
              </span>
            ))
          : children}
      </code>
    </pre>
  </div>
);
