'use client';

import { Editor, OnChange, OnMount } from '@monaco-editor/react';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { type FC, useEffect, useState, useRef, useMemo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { Loader } from '../Loader';

type CodeCompProps = {
  children: string;
  language: string;
  isDarkMode?: boolean;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  isReadOnly?: boolean;
  onChange?: OnChange;
};

export const MonacoCode: FC<CodeCompProps> = ({
  children,
  language,
  isDarkMode,
  showLineNumbers,
  showCopyButton = true,
  isReadOnly = false,
  onChange,
}) => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ideRef = useRef(null);
  const [editorSize, setEditorSize] = useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  const theme = useMemo(
    () => (isDarkMode ? 'vs-dark-transparent' : 'hc-light-theme'),
    [isDarkMode]
  );

  const handleMountIde: OnMount = (editor, monaco) => {
    // first time you set the height based on content Height
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ideRef.current = editor as any;
    const contentHeight = (editor.getContentHeight() ?? 0) + 25;

    monaco.editor.defineTheme('vs-dark-transparent', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#00000000',
      },
    });
    monaco.editor.defineTheme('hc-light-theme', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#00000000',
      },
    });

    monaco.editor.setTheme(theme);

    // Disable TypeScript diagnostics
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true, // Disables type checking
      noSyntaxValidation: true, // Disables syntax errors
    });

    // Disable JavaScript diagnostics
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    // Disable unnecessary language features (e.g., suggestions, quick fixes)
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      noLib: true,
      allowNonTsExtensions: true,
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      noLib: true,
      allowNonTsExtensions: true,
    });

    setEditorSize({
      height: contentHeight,
      width: containerRef.current?.clientWidth ?? 0,
    });
  };

  const isShowLineNumbers = showLineNumbers ?? children.split('\n').length > 1;

  return (
    <div
      className={cn(
        'relative h-full w-full text-sm',
        showLineNumbers && 'ml-0'
      )}
    >
      {showCopyButton && (
        <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
          <Button
            className={cn(
              'absolute right-3 top-3 z-50',
              copied && '!text-success/70 !dark:text-success-dark/70'
            )}
            label="Copy code"
            variant="hoverable"
            color="text"
            size="icon-sm"
            Icon={copied ? CopyCheckIcon : CopyIcon}
          />
        </CopyToClipboard>
      )}
      <div
        className="grid size-full grid-cols-[0px] overflow-auto"
        ref={containerRef}
      >
        <Editor
          {...editorSize}
          defaultLanguage="typescript"
          language={language}
          loading={<Loader />}
          defaultValue={String(children).replace(/\n$/, '')}
          onMount={handleMountIde}
          onChange={onChange}
          options={{
            readOnly: isReadOnly,
            cursorStyle: 'line',
            minimap: { enabled: false },
            scrollbar: {
              vertical: 'hidden',
              verticalScrollbarSize: 0,
              alwaysConsumeMouseWheel: false,
            },
            folding: false, // Disable code folding
            renderValidationDecorations: 'off', // Disable error/warning decorations
            quickSuggestions: false, // Disable IntelliSense
            parameterHints: { enabled: false }, // Disable parameter hints
            suggestOnTriggerCharacters: false, // Disable suggestions on typing

            mouseWheelScrollSensitivity: 0,
            fastScrollSensitivity: 0,
            scrollBeyondLastLine: false,
            lineNumbers: isShowLineNumbers ? 'on' : 'off',
          }}
          theme={theme}
          className="my-2 rounded-md"
        />
      </div>
    </div>
  );
};
