'use client';

import { type OnChange, type OnMount, Editor } from '@monaco-editor/react';
import { type FC, useMemo, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { CopyButton } from '../CopyButton';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const ideRef = useRef(null);
  const [editorSize, setEditorSize] = useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });

  const theme = useMemo(
    () => (isDarkMode ? 'vs-dark-transparent' : 'hc-light-theme'),
    [isDarkMode]
  );

  const handleMountIde: OnMount = (editor, monaco) => {
    // first time you set the height based on content Height

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
        <div className="sticky top-5 z-10">
          <div
            className={cn('absolute bottom-0 right-2 flex h-7 items-center')}
          >
            <CopyButton content={children} />
          </div>
        </div>
      )}
      <div
        className="z-0 grid size-full grid-cols-[0px] overflow-auto"
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
