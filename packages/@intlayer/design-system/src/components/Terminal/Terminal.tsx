'use client';

import { Container } from '@components/Container';
import { Input } from '@components/Input';
import { cn } from '@utils/cn';
import {
  type FC,
  type HTMLAttributes,
  type KeyboardEvent,
  useMemo,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';

// ANSI color code mappings to CSS colors
const ANSI_COLORS: Record<string, { light: string; dark: string }> = {
  '\x1b[0m': { light: '', dark: '' }, // RESET
  '\x1b[90m': { light: 'text-gray-500', dark: 'text-gray-400' }, // GREY
  '\x1b[38;5;239m': { light: 'text-gray-600', dark: 'text-gray-500' }, // GREY_DARK
  '\x1b[38;5;252m': { light: 'text-gray-300', dark: 'text-gray-300' }, // GREY_LIGHT
  '\x1b[34m': { light: 'text-blue-600', dark: 'text-blue-400' }, // BLUE
  '\x1b[31m': { light: 'text-red-600', dark: 'text-red-400' }, // RED
  '\x1b[32m': { light: 'text-green-600', dark: 'text-green-400' }, // GREEN
  '\x1b[38;5;226m': { light: 'text-yellow-500', dark: 'text-yellow-300' }, // YELLOW
  '\x1b[35m': { light: 'text-purple-600', dark: 'text-purple-400' }, // MAGENTA
  '\x1b[38;5;3m': { light: 'text-amber-600', dark: 'text-amber-300' }, // BEIGE
  '\x1b[38;5;208m': { light: 'text-orange-600', dark: 'text-orange-400' }, // ORANGE
  '\x1b[36m': { light: 'text-cyan-600', dark: 'text-cyan-400' }, // CYAN
  '\x1b[37m': { light: 'text-gray-800', dark: 'text-gray-200' }, // WHITE
  '\x1b[1m': { light: 'font-bold', dark: 'font-bold' }, // BOLD
};

interface AnsiSegment {
  text: string;
  color?: string;
  isBold?: boolean;
}

const parseAnsiCodes = (text: string, isDarkMode: boolean): AnsiSegment[] => {
  const segments: AnsiSegment[] = [];
  // biome-ignore lint/suspicious/noControlCharactersInRegex: we need to parse ANSI codes
  const ansiRegex = /(\x1b\[[0-9;]*m)/g;
  const parts = text.split(ansiRegex);

  let currentColor: string | undefined;
  let isBold = false;

  for (const part of parts) {
    if (ansiRegex.test(part)) {
      // This is an ANSI code
      const colorMapping = ANSI_COLORS[part];
      if (colorMapping) {
        if (part === '\x1b[0m') {
          // RESET
          currentColor = undefined;
          isBold = false;
        } else if (part === '\x1b[1m') {
          // BOLD
          isBold = true;
        } else {
          currentColor = isDarkMode ? colorMapping.dark : colorMapping.light;
        }
      }
    } else if (part) {
      // This is actual text
      segments.push({
        text: part,
        color: currentColor,
        isBold,
      });
    }
  }

  return segments;
};

export type TerminalProps = {
  children: string;
  isDarkMode?: boolean;
  title?: string;
  onClose?: () => void;
  onSubmit?: (value: string) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onSubmit'>;

export const Terminal: FC<TerminalProps> = ({
  className,
  children,
  isDarkMode = false,
  title = 'bash',
  onClose,
  onSubmit,
  ...props
}) => {
  const content = useIntlayer('terminal');
  const lines = useMemo(() => children.split('\n'), [children]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onSubmit?.(inputValue);
      setInputValue('');
    }
  };

  // Explicitly type the container props to avoid type conflicts
  const containerProps = props as Omit<
    HTMLAttributes<HTMLDivElement>,
    'children' | 'onSubmit'
  >;

  return (
    <Container
      roundedSize="2xl"
      className={cn(
        'flex min-w-0 max-w-full flex-col overflow-hidden font-mono',
        className
      )}
      {...containerProps}
    >
      {/* Tab bar */}
      <div className="flex w-full flex-row items-center justify-start gap-1 bg-neutral-200 text-neutral text-xs dark:bg-neutral-950">
        <div className="mx-2 flex items-center justify-start gap-2 p-1">
          <div className="size-3 rounded-full bg-red-500" />
          <div className="size-3 rounded-full bg-yellow-500" />
          <div className="size-3 rounded-full bg-green-500" />
        </div>
        <div className="flex size-full overflow-y-auto">
          <div className="flex h-8 min-w-20 items-center justify-between gap-2 bg-card px-3 py-1">
            <span>{title}</span>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="text-neutral transition-colors hover:text-text"
                aria-label={content.closeTab.value}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Terminal content - hide scrollbar */}
      <pre className="min-w-0 max-w-full overflow-x-auto overflow-y-auto border-neutral/30 border-b p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <code>
          {lines.map((line, lineIndex) => {
            const segments = parseAnsiCodes(line, isDarkMode);

            return (
              <span className="line block w-full" key={`line-${lineIndex}`}>
                {segments.length === 0
                  ? '\n'
                  : segments.map((segment, segIndex) => (
                      <span
                        key={`seg-${lineIndex}-${segIndex}`}
                        className={cn(segment.color, {
                          'font-bold': segment.isBold,
                        })}
                      >
                        {segment.text}
                      </span>
                    ))}
              </span>
            );
          })}
        </code>
      </pre>

      {/* Input area */}
      <Container className="p-2">
        <span className="text-neutral">~/Desktop/MyApp</span>
        <Input
          className="m-0.5 w-full"
          variant="invisible"
          value={inputValue}
          aria-label={content.terminalInput.value}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Container>
    </Container>
  );
};
