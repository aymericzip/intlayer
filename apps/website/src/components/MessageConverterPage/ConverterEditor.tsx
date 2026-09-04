import { Badge } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { CopyButton } from '@intlayer/design-system/copy-button';
import { CodeBlock, type CodeLanguage } from '@intlayer/design-system/ide';
import { Input } from '@intlayer/design-system/input';
import { SwitchSelector } from '@intlayer/design-system/switch-selector';
import { Tag } from '@intlayer/design-system/tag';
import { AutoSizedTextArea } from '@intlayer/design-system/text-area';
import { cn } from '@intlayer/design-system/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import {
  ArrowLeftRight,
  Braces,
  Check,
  Code2,
  Columns2,
  FileCode,
  Hash,
  Info,
  ListOrdered,
  Percent,
  Play,
  Sparkles,
  Split,
} from 'lucide-react';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { DIALECT_OPTIONS, DIALECTS, PRESET_EXAMPLES } from './constants';
import {
  convertMessage,
  evaluateMessagePreview,
  extractVariableNames,
} from './converterUtils';
import type { MessageDialect, OutputViewMode, PresetExample } from './types';

const COMMON_TEST_LOCALES: { value: LocalesValues; label: string }[] = [
  { value: 'en' as LocalesValues, label: 'en (English)' },
  { value: 'fr' as LocalesValues, label: 'fr (French)' },
  { value: 'es' as LocalesValues, label: 'es (Spanish)' },
  { value: 'de' as LocalesValues, label: 'de (German)' },
  { value: 'ja' as LocalesValues, label: 'ja (Japanese)' },
  { value: 'zh' as LocalesValues, label: 'zh (Chinese)' },
  { value: 'ar' as LocalesValues, label: 'ar (Arabic)' },
  { value: 'ru' as LocalesValues, label: 'ru (Russian)' },
];

const PRESET_ICONS: Record<string, FC<{ className?: string }>> = {
  'icu-plural': Hash,
  'icu-select': Split,
  'icu-ordinal': ListOrdered,
  'vue-pipe-plural': Columns2,
  'i18next-interpolation': Braces,
  'icu-format-number': Percent,
  'html-rich-text': Code2,
  'full-dictionary': FileCode,
};

export const ConverterEditor: FC = () => {
  const content = useIntlayer('message-converter-page');

  const [sourceDialect, setSourceDialect] = useState<MessageDialect>('icu');
  const [targetDialect, setTargetDialect] = useState<MessageDialect>('i18next');
  const [inputContent, setInputContent] = useState<string>(
    PRESET_EXAMPLES[0].input
  );
  const [activePresetId, setActivePresetId] = useState<string>(
    PRESET_EXAMPLES[0].id
  );
  const [outputViewMode, setOutputViewMode] =
    useState<OutputViewMode>('content_ts');

  // Test variables state
  const [testVariables, setTestVariables] = useState<Record<string, string>>({
    count: '1',
  });
  const [testLocale, setTestLocale] = useState<LocalesValues>(
    'en' as LocalesValues
  );

  // Auto-detect variables on input change
  useEffect(() => {
    const discoveredVars = extractVariableNames(inputContent);
    if (discoveredVars.length > 0) {
      setTestVariables((prev) => {
        const nextVars: Record<string, string> = { ...prev };
        for (const variableName of discoveredVars) {
          if (!(variableName in nextVars)) {
            nextVars[variableName] =
              variableName === 'count' || variableName === 'rank'
                ? '1'
                : 'Example';
          }
        }
        return nextVars;
      });
    }
  }, [inputContent]);

  // Perform conversion
  const conversionResult = useMemo(() => {
    return convertMessage(inputContent, sourceDialect, targetDialect);
  }, [inputContent, sourceDialect, targetDialect]);

  // Evaluate message with test variables
  const evaluatedPreview = useMemo(() => {
    if (!inputContent.trim()) return '';

    // Convert string inputs to proper types if numeric
    const parsedValues: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(testVariables)) {
      if (/^-?\d+(\.\d+)?$/.test(val)) {
        parsedValues[key] = Number(val);
      } else {
        parsedValues[key] = val;
      }
    }

    return evaluateMessagePreview(
      inputContent,
      parsedValues,
      testLocale,
      sourceDialect
    );
  }, [inputContent, testVariables, testLocale, sourceDialect]);

  // Swapping source and target dialects
  const handleSwapDialects = () => {
    const newSource = targetDialect;
    const newTarget = sourceDialect;
    setSourceDialect(newSource);
    setTargetDialect(newTarget);
    if (conversionResult.success && conversionResult.output) {
      setInputContent(conversionResult.output);
    }
    setActivePresetId('');
  };

  // Applying a preset
  const handleSelectPreset = (preset: PresetExample) => {
    setActivePresetId(preset.id);
    setSourceDialect(preset.sourceDialect);
    setInputContent(preset.input);
    const initialVars: Record<string, string> = {};
    for (const [key, val] of Object.entries(preset.defaultVariables)) {
      initialVars[key] = String(val);
    }
    setTestVariables(initialVars);
    if (preset.defaultLocale) {
      setTestLocale(preset.defaultLocale);
    }
  };

  // Determine which output string to display based on view mode
  const displayedOutput = useMemo(() => {
    if (!conversionResult.success) {
      return conversionResult.error || content.conversionError.value;
    }

    if (targetDialect === 'intlayer') {
      if (outputViewMode === 'content_ts') {
        return conversionResult.contentDeclaration || '';
      }
      if (outputViewMode === 'content_json') {
        return conversionResult.contentJsonDeclaration || '';
      }
      if (outputViewMode === 'clean') {
        return conversionResult.output;
      }
    }

    return conversionResult.output;
  }, [
    conversionResult,
    targetDialect,
    outputViewMode,
    content.conversionError,
  ]);

  // Language for syntax highlighting in CodeBlock
  const outputLanguage = useMemo((): CodeLanguage => {
    if (targetDialect === 'intlayer') {
      if (outputViewMode === 'content_ts') return 'typescript';
      if (outputViewMode === 'content_json' || outputViewMode === 'clean') {
        return 'json';
      }
    }
    const trimmed = (displayedOutput || '').trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      return 'json';
    }
    return 'typescript';
  }, [targetDialect, outputViewMode, displayedOutput]);

  const shouldUseCodeBlock = useMemo(() => {
    if (!conversionResult.success || !displayedOutput) return false;
    if (targetDialect === 'intlayer') return true;
    const trimmed = displayedOutput.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) return true;
    return false;
  }, [conversionResult.success, displayedOutput, targetDialect]);

  const sourceDialectChoices = useMemo(
    () =>
      DIALECT_OPTIONS.map((dialect) => ({
        content: DIALECTS[dialect].name,
        value: dialect,
      })),
    []
  );

  const targetDialectChoices = useMemo(
    () =>
      DIALECT_OPTIONS.map((dialect) => ({
        content: DIALECTS[dialect].name,
        value: dialect,
      })),
    []
  );

  const viewModeChoices = useMemo(
    () => [
      {
        content: content.viewMode.contentTs.value,
        value: 'content_ts' as OutputViewMode,
      },
      {
        content: content.viewMode.contentJson.value,
        value: 'content_json' as OutputViewMode,
      },
      {
        content: content.viewMode.clean.value,
        value: 'clean' as OutputViewMode,
      },
    ],
    [content.viewMode]
  );

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Presets Bar */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium text-muted-foreground text-sm">
            <Sparkles className="size-4 text-foreground" />
            {content.presetsLabel}
          </span>
          {activePresetId && (
            <button
              type="button"
              onClick={() => {
                setActivePresetId('');
                setInputContent('');
                setTestVariables({});
              }}
              className="text-muted-foreground text-xs hover:text-foreground hover:underline"
            >
              {content.clearInput}
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_EXAMPLES.map((preset) => {
            const isSelected = activePresetId === preset.id;
            const PresetIcon = PRESET_ICONS[preset.id];

            return (
              <Container
                key={preset.id}
                role="button"
                tabIndex={0}
                padding="sm"
                roundedSize="xl"
                transparency={isSelected ? 'xs' : 'lg'}
                border
                borderColor={isSelected ? 'text' : 'neutral'}
                className={cn(
                  'cursor-pointer select-none flex-row items-center gap-2 text-xs transition-all duration-200 sm:text-sm',
                  isSelected
                    ? 'bg-muted/90 text-foreground shadow-sm ring-1 ring-foreground/25'
                    : 'bg-card/40 text-muted-foreground hover:bg-card/80 hover:text-foreground'
                )}
                onClick={() => handleSelectPreset(preset)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectPreset(preset);
                  }
                }}
              >
                {PresetIcon && (
                  <PresetIcon
                    className={cn(
                      'size-3.5 shrink-0 transition-colors',
                      isSelected ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  />
                )}
                <Tag
                  size="xs"
                  color="neutral"
                  className={cn(
                    'font-mono text-[10px] uppercase tracking-wider',
                    isSelected
                      ? 'bg-background/80 text-foreground'
                      : 'opacity-75'
                  )}
                >
                  {preset.sourceDialect}
                </Tag>
                <span className="whitespace-nowrap font-medium">
                  {preset.title}
                </span>
              </Container>
            );
          })}
        </div>
      </div>

      {/* Main Dual-Pane Converter Editor */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* SOURCE INPUT CARD */}
        <Container
          roundedSize="xl"
          transparency="sm"
          className="flex flex-col gap-4 border border-border/80 bg-card/60 p-5 shadow-sm backdrop-blur-md transition-all"
        >
          {/* Header & Dialect Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-border/50 border-b pb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground text-sm">
                {content.sourceDialectLabel}
              </span>
              <Badge size="sm" color="neutral" className="text-text/50 text-xs">
                {DIALECTS[sourceDialect].badge}
              </Badge>
            </div>
            <div className="flex flex-nowrap items-center overflow-x-auto whitespace-nowrap">
              <SwitchSelector
                choices={sourceDialectChoices}
                value={sourceDialect}
                onChange={(value) => {
                  setSourceDialect(value);
                  setActivePresetId('');
                }}
                color="text"
                size="sm"
                className="flex-nowrap whitespace-nowrap"
              />
            </div>
          </div>

          {/* Editor Area */}
          <div className="relative flex flex-1 flex-col">
            <AutoSizedTextArea
              value={inputContent}
              onChange={(event) => {
                setInputContent(event.target.value);
                setActivePresetId('');
              }}
              placeholder={DIALECTS[sourceDialect].placeholder}
              rows={8}
              className="font-mono text-foreground text-sm leading-relaxed"
            />

            {/* Editor Footer / Info */}
            <div className="mt-2 flex items-center justify-between text-muted-foreground text-xs">
              <span>
                {inputContent.length} {content.characters}
              </span>
              <button
                type="button"
                onClick={() => setInputContent('')}
                className="hover:text-foreground hover:underline"
              >
                {content.clearInput}
              </button>
            </div>
          </div>
        </Container>

        {/* TARGET OUTPUT CARD */}
        <Container
          roundedSize="xl"
          transparency="sm"
          className="flex flex-col gap-4 border border-border/80 bg-card/60 p-5 shadow-sm backdrop-blur-md transition-all"
        >
          {/* Header & Target Dialect Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-border/50 border-b pb-4">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                label={content.swapFormats.value}
                onClick={handleSwapDialects}
                className="size-7 rounded-full p-1"
              >
                <ArrowLeftRight className="size-3.5" />
              </Button>
              <span className="font-semibold text-foreground text-sm">
                {content.targetDialectLabel}
              </span>
              <Badge size="sm" color="neutral" className="text-text/50 text-xs">
                {DIALECTS[targetDialect].badge}
              </Badge>
            </div>
            <div className="flex flex-nowrap items-center overflow-x-auto whitespace-nowrap">
              <SwitchSelector
                choices={targetDialectChoices}
                value={targetDialect}
                onChange={(value) => setTargetDialect(value)}
                color="text"
                size="sm"
                className="flex-nowrap whitespace-nowrap"
              />
            </div>
          </div>

          {/* Intlayer Sub-View Selector (when target is Intlayer) */}
          {targetDialect === 'intlayer' && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                {content.outputFormatLabel}
              </span>
              <div className="flex flex-nowrap items-center overflow-x-auto whitespace-nowrap">
                <SwitchSelector
                  choices={viewModeChoices}
                  value={outputViewMode}
                  onChange={(value) => setOutputViewMode(value)}
                  color="text"
                  size="xs"
                  className="flex-nowrap whitespace-nowrap"
                />
              </div>
            </div>
          )}

          {/* Output Display Area */}
          <div className="relative flex flex-1 flex-col">
            <div
              className={cn(
                'min-h-47.5 w-full flex-1 overflow-x-auto rounded-lg border p-3 font-mono text-xs leading-relaxed transition-all',
                conversionResult.success
                  ? 'border-border/70 bg-background/80 text-foreground'
                  : 'border-error/50 bg-error/10 text-error'
              )}
            >
              {shouldUseCodeBlock ? (
                <CodeBlock lang={outputLanguage} className="w-full text-xs">
                  {displayedOutput}
                </CodeBlock>
              ) : (
                <pre className="wrap-break-word whitespace-pre-wrap">
                  {displayedOutput || content.outputPlaceholder}
                </pre>
              )}
            </div>

            {/* Output Actions Bar */}
            <div className="mt-2 flex items-center justify-between">
              <span className="text-muted-foreground text-xs">
                {conversionResult.success ? (
                  <span className="flex items-center gap-1 text-emerald-500">
                    <Check className="size-3.5" />
                    {content.validSyntax}
                  </span>
                ) : (
                  <span className="text-error">{content.syntaxIssue}</span>
                )}
              </span>

              {displayedOutput && (
                <CopyButton
                  content={displayedOutput}
                  variant="outline"
                  size="icon-sm"
                  label={content.copyResult.value}
                  className="gap-1.5 text-xs"
                />
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Interactive Live Preview & Testing Section */}
      <Container
        roundedSize="xl"
        transparency="sm"
        className="flex flex-col gap-5 border border-border/80 bg-card/40 p-6 shadow-md backdrop-blur-md"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-border/50 border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-foreground">
              <Play className="size-4 fill-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-foreground">
                {content.testVariablesTitle}
              </h3>
              <p className="text-muted-foreground text-xs">
                {content.testVariablesDescription}
              </p>
            </div>
          </div>

          {/* Locale Selector */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-muted-foreground text-xs">
              {content.localeLabel}:
            </span>
            <select
              value={testLocale}
              onChange={(e) => setTestLocale(e.target.value as LocalesValues)}
              className="h-8 rounded-md border border-border bg-background px-2 font-mono text-foreground text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {COMMON_TEST_LOCALES.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Variables Inputs Grid */}
        <div>
          {Object.keys(testVariables).length === 0 ? (
            <div className="flex items-center gap-2 text-muted-foreground text-xs italic">
              <Info className="size-4" />
              {content.noVariablesDetected}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(testVariables).map(([variableName, val]) => (
                <div
                  key={variableName}
                  className="flex flex-col gap-1 rounded-lg border border-border/60 bg-background/60 p-2.5 backdrop-blur-sm"
                >
                  <label
                    htmlFor={`var-${variableName}`}
                    className="font-medium font-mono text-foreground text-xs"
                  >
                    {variableName}
                  </label>
                  <Input
                    id={`var-${variableName}`}
                    value={val}
                    onChange={(e) =>
                      setTestVariables((prev) => ({
                        ...prev,
                        [variableName]: e.target.value,
                      }))
                    }
                    placeholder={content.variableValuePlaceholder.value}
                    className="h-8 font-mono text-xs"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Evaluated Output Banner */}
        <div className="flex flex-col gap-1.5 rounded-lg border border-border/60 bg-background/90 p-4 shadow-inner">
          <span className="font-medium text-muted-foreground text-xs">
            {content.previewLabel} ({testLocale}):
          </span>
          <div className="font-semibold text-foreground text-lg leading-snug">
            {evaluatedPreview || (
              <span className="text-muted-foreground italic">
                {content.enterMessagePrompt}
              </span>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
