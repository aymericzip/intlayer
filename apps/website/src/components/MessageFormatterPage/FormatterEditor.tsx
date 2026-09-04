import { Badge } from '@intlayer/design-system/badge';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { CopyButton } from '@intlayer/design-system/copy-button';
import { CodeBlock } from '@intlayer/design-system/ide';
import { Input } from '@intlayer/design-system/input';
import { Tag } from '@intlayer/design-system/tag';
import { AutoSizedTextArea } from '@intlayer/design-system/text-area';
import { cn } from '@intlayer/design-system/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import {
  AlertTriangle,
  Bell,
  Bold,
  Briefcase,
  Calculator,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Code2,
  FileCode,
  GitBranch,
  Hash,
  Heart,
  Info,
  Layers,
  ListOrdered,
  Play,
  Plus,
  RectangleEllipsis,
  RotateCcw,
  RotateCw,
  Search,
  ShoppingCart,
  Sparkles,
  Trash2,
  Type,
  Zap,
} from 'lucide-react';
import { type FC, useEffect, useMemo, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  convertMessage,
  evaluateMessagePreview,
  extractVariableNames,
} from '../MessageConverterPage/converterUtils';
import { SNIPPETS_BY_DIALECT } from './snippets';
import { TEMPLATE_CATEGORIES, TEMPLATES_BY_DIALECT } from './templates';
import type {
  FormatterDialect,
  MessageTemplate,
  QuickSnippet,
  TemplateCategory,
} from './types';
import { validateMessageSyntax } from './validation';

const CATEGORY_ICONS: Record<TemplateCategory, FC<{ className?: string }>> = {
  basic: Type,
  pluralization: Hash,
  select: GitBranch,
  ordinal: ListOrdered,
  nested: Layers,
  numbers: Calculator,
  dates: Calendar,
  lists: ListOrdered,
  'rich-text': Bold,
  social: Heart,
  ecommerce: ShoppingCart,
  forms: RectangleEllipsis,
  notifications: Bell,
  time: Clock,
  advanced: Zap,
  'real-world': Briefcase,
};

const COMMON_TEST_LOCALES: {
  value: LocalesValues;
  label: string;
  flag: string;
}[] = [
  { value: 'en' as LocalesValues, label: 'English (en)', flag: '🇺🇸' },
  { value: 'fr' as LocalesValues, label: 'Français (fr)', flag: '🇫🇷' },
  { value: 'es' as LocalesValues, label: 'Español (es)', flag: '🇪🇸' },
  { value: 'de' as LocalesValues, label: 'Deutsch (de)', flag: '🇩🇪' },
  {
    value: 'ar' as LocalesValues,
    label: 'العربية (ar - 6 Plural Forms)',
    flag: '🇸🇦',
  },
  {
    value: 'ru' as LocalesValues,
    label: 'Русский (ru - Slavic Plurals)',
    flag: '🇷🇺',
  },
  { value: 'pl' as LocalesValues, label: 'Polski (pl)', flag: '🇵🇱' },
  { value: 'ja' as LocalesValues, label: '日本語 (ja)', flag: '🇯🇵' },
  { value: 'zh' as LocalesValues, label: '中文 (zh)', flag: '🇨🇳' },
  { value: 'pt' as LocalesValues, label: 'Português (pt)', flag: '🇧🇷' },
  { value: 'it' as LocalesValues, label: 'Italiano (it)', flag: '🇮🇹' },
  { value: 'hi' as LocalesValues, label: 'हिन्दी (hi)', flag: '🇮🇳' },
  { value: 'tr' as LocalesValues, label: 'Türkçe (tr)', flag: '🇹🇷' },
];

export const FormatterEditor: FC<{ dialect: FormatterDialect }> = ({
  dialect,
}) => {
  const content = useIntlayer('message-formatter-page');

  const allTemplates = useMemo(
    () => TEMPLATES_BY_DIALECT[dialect] || [],
    [dialect]
  );
  const defaultTemplate = allTemplates[0] || {
    id: 'default',
    title: 'Default',
    description: '',
    category: 'basic' as TemplateCategory,
    dialect,
    tags: [],
    template: '',
    defaultVariables: {},
    defaultLocale: 'en' as LocalesValues,
  };

  // State
  const [activeCategory, setActiveCategory] =
    useState<TemplateCategory>('basic');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    defaultTemplate.id
  );
  const [messageContent, setMessageContent] = useState<string>(
    defaultTemplate.template
  );

  // Undo / Redo history
  const [history, setHistory] = useState<string[]>([defaultTemplate.template]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Quick insert dropdown open state
  const [isInsertMenuOpen, setIsInsertMenuOpen] = useState<boolean>(false);
  const insertMenuRef = useRef<HTMLDivElement>(null);

  // Test variables & locale
  const [testVariables, setTestVariables] = useState<Record<string, string>>(
    () => {
      const init: Record<string, string> = {};
      for (const [k, v] of Object.entries(
        defaultTemplate.defaultVariables || {}
      )) {
        init[k] = String(v);
      }
      return init;
    }
  );
  const [testLocale, setTestLocale] = useState<LocalesValues>(
    defaultTemplate.defaultLocale || ('en' as LocalesValues)
  );

  // Intlayer export view mode
  const [exportViewMode, setExportViewMode] = useState<
    'content_ts' | 'content_json'
  >('content_ts');

  // Close insert menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        insertMenuRef.current &&
        !insertMenuRef.current.contains(e.target as Node)
      ) {
        setIsInsertMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update editor content with history tracking
  const updateMessage = (newText: string) => {
    setMessageContent(newText);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newText);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setMessageContent(history[nextIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setMessageContent(history[nextIndex]);
    }
  };

  // Insert snippet helper
  const handleInsertSnippet = (snippet: QuickSnippet) => {
    const updated = messageContent
      ? `${messageContent} ${snippet.code}`
      : snippet.code;
    updateMessage(updated);
    setIsInsertMenuOpen(false);
  };

  // Select a template
  const handleSelectTemplate = (template: MessageTemplate) => {
    setSelectedTemplateId(template.id);
    updateMessage(template.template);
    const vars: Record<string, string> = {};
    for (const [k, v] of Object.entries(template.defaultVariables || {})) {
      vars[k] = String(v);
    }
    setTestVariables(vars);
    if (template.defaultLocale) {
      setTestLocale(template.defaultLocale);
    }
  };

  // Auto-discover variables in messageContent
  useEffect(() => {
    const discovered = extractVariableNames(messageContent);
    if (discovered.length > 0) {
      setTestVariables((prev) => {
        const nextVars: Record<string, string> = { ...prev };
        for (const variableName of discovered) {
          if (!(variableName in nextVars)) {
            nextVars[variableName] =
              variableName === 'count' ||
              variableName === 'rank' ||
              variableName === 'score' ||
              variableName === 'diff' ||
              variableName === 'floor' ||
              variableName === 'step' ||
              variableName === 'views' ||
              variableName === '0' ||
              variableName === 'n'
                ? '3'
                : 'Example';
          }
        }
        return nextVars;
      });
    }
  }, [messageContent]);

  // Syntax validation
  const validationResult = useMemo(() => {
    return validateMessageSyntax(messageContent, dialect);
  }, [messageContent, dialect]);

  // Live evaluation preview
  const evaluatedPreview = useMemo(() => {
    if (!messageContent.trim()) return '';

    const parsedValues: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(testVariables)) {
      if (/^-?\d+(\.\d+)?$/.test(val)) {
        parsedValues[key] = Number(val);
      } else {
        parsedValues[key] = val;
      }
    }

    return evaluateMessagePreview(
      messageContent,
      parsedValues,
      testLocale,
      dialect
    );
  }, [messageContent, testVariables, testLocale, dialect]);

  // Conversion to Intlayer
  const intlayerConversion = useMemo(() => {
    return convertMessage(messageContent, dialect, 'intlayer');
  }, [messageContent, dialect]);

  // Filter templates by active category and search
  const filteredTemplates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allTemplates.filter((item) => {
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        (item.tags ?? []).some((t) => t.toLowerCase().includes(q));

      if (q) return matchesSearch; // If searching, search across all categories
      return item.category === activeCategory;
    });
  }, [allTemplates, activeCategory, searchQuery]);

  // Available categories with counts
  const categoriesWithCounts = useMemo(() => {
    return TEMPLATE_CATEGORIES.map((cat) => ({
      ...cat,
      count: allTemplates.filter((t) => t.category === cat.id).length,
    })).filter((cat) => cat.count > 0);
  }, [allTemplates]);

  const snippets = useMemo(() => SNIPPETS_BY_DIALECT[dialect] || [], [dialect]);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
        {/* ========================================================= */}
        {/* LEFT COLUMN: TEMPLATES EXPLORER PANEL                     */}
        {/* ========================================================= */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/60 shadow-lg backdrop-blur-md lg:h-180">
          {/* Header & Search */}
          <div className="flex flex-col gap-3 border-border/60 border-b bg-muted/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                <Sparkles className="size-4 text-foreground" />
                <span>{content.editor.templatesHeader}</span>
                <Badge size="sm" color="text" className="font-mono text-[10px]">
                  {allTemplates.length}
                </Badge>
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="cursor-pointer text-muted-foreground text-xs hover:text-foreground hover:underline"
                >
                  {content.editor.clearSearch}
                </button>
              )}
            </div>

            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={content.editor.searchPlaceholder.value}
                className="h-8 pl-9 font-sans text-xs"
              />
            </div>
          </div>

          {/* Body: Split Categories Sidebar + Template Cards */}
          <div className="flex min-h-0 flex-1 overflow-hidden">
            {/* Category selection sidebar (visible when not searching) */}
            {!searchQuery && (
              <div className="w-35 shrink-0 space-y-1 overflow-y-auto border-border/50 border-r bg-muted/10 p-1.5">
                {categoriesWithCounts.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.id] || Type;
                  const isSelected = activeCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        'flex w-full cursor-pointer items-center justify-between gap-1.5 rounded-lg px-2.5 py-2 text-left font-medium text-xs transition-all',
                        isSelected
                          ? 'border border-border/80 bg-muted/90 text-foreground shadow-xs'
                          : 'border border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className="size-3.5 shrink-0" />
                        <span className="truncate text-[11px]">
                          {content.categories[cat.id] ?? cat.label}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] opacity-60">
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Template list */}
            <div className="flex-1 space-y-2.5 overflow-y-auto p-3">
              {filteredTemplates.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground text-xs italic">
                  {content.editor.noTemplatesFound}
                </div>
              ) : (
                filteredTemplates.map((template) => {
                  const isSelected = selectedTemplateId === template.id;
                  const Icon = CATEGORY_ICONS[template.category] || Type;

                  return (
                    <Button
                      key={template.id}
                      type="button"
                      variant="none"
                      color="text"
                      roundedSize="md"
                      label={template.title}
                      onClick={() => handleSelectTemplate(template)}
                      className={cn(
                        'h-auto w-full cursor-pointer select-none justify-start p-3 text-left transition-all duration-150 [corner-shape:squircle]',
                        '[&>span]:block [&>span]:w-full [&>span]:whitespace-normal',
                        isSelected
                          ? 'border border-border/90 bg-muted/50 shadow-sm ring-1 ring-border'
                          : 'border border-border/60 bg-card/40 hover:border-border hover:bg-card/80'
                      )}
                    >
                      <div className="flex w-full flex-col text-left">
                        <div className="mb-1.5 flex items-start gap-2.5">
                          <div
                            className={cn(
                              'mt-0.5 shrink-0 rounded-lg p-1.5',
                              isSelected
                                ? 'bg-muted text-foreground'
                                : 'bg-muted/50 text-muted-foreground'
                            )}
                          >
                            <Icon className="size-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="block truncate font-semibold text-foreground text-xs">
                              {template.title}
                            </span>
                            <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground leading-snug">
                              {template.description}
                            </p>
                          </div>
                        </div>

                        {template.tags && template.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {template.tags.slice(0, 3).map((tag) => (
                              <Tag
                                key={tag}
                                size="xs"
                                color="text"
                                roundedSize="full"
                                className="px-1.5 py-0 font-mono text-[9px] text-muted-foreground"
                              >
                                {tag}
                              </Tag>
                            ))}
                          </div>
                        )}
                      </div>
                    </Button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: CODE EDITOR, VALIDATOR & LIVE PREVIEW       */}
        {/* ========================================================= */}
        <div className="flex min-w-0 flex-col gap-6">
          {/* EDITOR CARD */}
          <Container
            roundedSize="2xl"
            transparency="sm"
            className="flex flex-col gap-4 border border-border/80 bg-card/60 p-5 shadow-lg backdrop-blur-md"
          >
            {/* Editor Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-border/50 border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground text-sm uppercase tracking-wider">
                  {dialect.toUpperCase()} {content.editor.editorTitle}
                </span>
                <Tag size="xs" color="text" className="font-mono text-[10px]">
                  {validationResult.isValid ? (
                    <span className="flex items-center gap-1 font-semibold text-emerald-500">
                      <Check className="size-3" /> {content.editor.validSyntax}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-semibold text-error">
                      <AlertTriangle className="size-3" />{' '}
                      {content.editor.syntaxIssue}
                    </span>
                  )}
                </Tag>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Undo / Redo */}
                <Button
                  type="button"
                  variant="outline"
                  color="text"
                  size="icon-sm"
                  label={content.editor.undoLabel.value}
                  disabled={historyIndex <= 0}
                  onClick={handleUndo}
                  className="size-7 cursor-pointer rounded-full p-0"
                >
                  <RotateCcw className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  color="text"
                  size="icon-sm"
                  label={content.editor.redoLabel.value}
                  disabled={historyIndex >= history.length - 1}
                  onClick={handleRedo}
                  className="size-7 cursor-pointer rounded-full p-0"
                >
                  <RotateCw className="size-3.5" />
                </Button>

                <div className="mx-1 h-4 w-px bg-border" />

                {/* Quick Insert Menu */}
                <div className="relative" ref={insertMenuRef}>
                  <Button
                    type="button"
                    variant="outline"
                    color="text"
                    size="sm"
                    label={content.editor.insertLabel.value}
                    onClick={() => setIsInsertMenuOpen((v) => !v)}
                    className="h-7 cursor-pointer gap-1.5 rounded-full px-2.5 text-foreground text-xs hover:bg-muted"
                  >
                    <Plus className="size-3" />
                    <span>{content.editor.insertLabel}</span>
                    <ChevronDown className="size-3 opacity-60" />
                  </Button>

                  {isInsertMenuOpen && (
                    <div className="fade-in zoom-in-95 absolute top-full right-0 z-50 mt-1.5 w-64 animate-in rounded-xl border border-border/80 bg-background/95 p-1.5 shadow-xl backdrop-blur-md">
                      <span className="block px-2 py-1 font-semibold text-[10px] text-muted-foreground uppercase">
                        {content.editor.quickInsertSnippets}
                      </span>
                      <div className="space-y-0.5">
                        {snippets.map((snip) => (
                          <button
                            key={snip.id}
                            type="button"
                            onClick={() => handleInsertSnippet(snip)}
                            className="flex w-full cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors hover:bg-muted/60"
                          >
                            <Code2 className="mt-0.5 size-3.5 shrink-0 text-foreground" />
                            <div className="min-w-0 flex-1">
                              <span className="block font-medium text-foreground">
                                {snip.label}
                              </span>
                              {snip.description && (
                                <span className="block truncate text-[10px] text-muted-foreground">
                                  {snip.description}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Copy */}
                <CopyButton
                  content={messageContent}
                  variant="outline"
                  color="text"
                  size="icon-sm"
                  label={content.editor.copyString.value}
                  className="size-7 cursor-pointer rounded-full p-0"
                />

                {/* Clear */}
                <Button
                  type="button"
                  variant="outline"
                  color="text"
                  size="icon-sm"
                  label={content.editor.clearText.value}
                  onClick={() => updateMessage('')}
                  className="size-7 cursor-pointer rounded-full p-0 hover:text-error"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>

            {/* Textarea */}
            <div className="relative flex flex-col">
              <AutoSizedTextArea
                value={messageContent}
                onChange={(e) => updateMessage(e.target.value)}
                placeholder={content.editor.editorPlaceholder.value}
                rows={6}
                className="rounded-xl border-border/70 bg-background/70 p-3.5 font-mono text-sm leading-relaxed"
              />

              <div className="mt-2 flex items-center justify-between font-mono text-muted-foreground text-xs">
                <span>
                  {messageContent.length} {content.editor.characters}
                </span>
                <span>
                  {messageContent.split('\n').length} {content.editor.lines}
                </span>
              </div>
            </div>

            {/* Validation Banner */}
            {!validationResult.isValid && validationResult.errorMessage && (
              <div className="flex items-start gap-2.5 rounded-xl border border-error/50 bg-error/10 p-3 text-error text-xs leading-relaxed">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                <div className="flex-1">
                  <span className="block font-bold">
                    {content.editor.syntaxErrorTitle}
                  </span>
                  <span>{validationResult.errorMessage}</span>
                </div>
              </div>
            )}
          </Container>

          {/* VARIABLES & REAL-TIME PREVIEW CARD */}
          <Container
            roundedSize="2xl"
            transparency="sm"
            className="flex flex-col gap-5 border border-border/80 bg-card/60 p-5 shadow-lg backdrop-blur-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-border/50 border-b pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-lg bg-muted text-foreground">
                  <Play className="size-3.5 fill-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">
                    {content.editor.testVariablesTitle}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {content.editor.testVariablesDescription}
                  </p>
                </div>
              </div>

              {/* Locale Selector */}
              <div className="flex items-center gap-2">
                <span className="font-medium text-muted-foreground text-xs">
                  {content.editor.localeLabel}
                </span>
                <select
                  value={testLocale}
                  onChange={(e) =>
                    setTestLocale(e.target.value as LocalesValues)
                  }
                  className="h-8 rounded-lg border border-border bg-background px-2.5 font-sans text-foreground text-xs shadow-xs focus:outline-none focus:ring-1 focus:ring-foreground"
                >
                  {COMMON_TEST_LOCALES.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.flag} {loc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Variable Inputs */}
            <div>
              {Object.keys(testVariables).length === 0 ? (
                <div className="flex items-center gap-2 py-2 text-muted-foreground text-xs italic">
                  <Info className="size-3.5" />
                  {content.editor.noVariablesDetected}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {Object.entries(testVariables).map(([varName, val]) => {
                    const isNumeric = /^-?\d+$/.test(val);

                    return (
                      <div
                        key={varName}
                        className="flex flex-col gap-1 rounded-xl border border-border/60 bg-background/60 p-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor={`var-input-${varName}`}
                            className="truncate font-mono font-semibold text-[11px] text-foreground"
                          >
                            {varName}
                          </label>
                          {isNumeric && (
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  setTestVariables((prev) => ({
                                    ...prev,
                                    [varName]: String(
                                      Number(prev[varName] || 0) - 1
                                    ),
                                  }))
                                }
                                className="flex size-4 cursor-pointer items-center justify-center rounded bg-muted/60 font-bold text-[10px] text-foreground hover:bg-muted"
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setTestVariables((prev) => ({
                                    ...prev,
                                    [varName]: String(
                                      Number(prev[varName] || 0) + 1
                                    ),
                                  }))
                                }
                                className="flex size-4 cursor-pointer items-center justify-center rounded bg-muted/60 font-bold text-[10px] text-foreground hover:bg-muted"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                        <Input
                          id={`var-input-${varName}`}
                          value={val}
                          onChange={(e) =>
                            setTestVariables((prev) => ({
                              ...prev,
                              [varName]: e.target.value,
                            }))
                          }
                          className="h-7 font-mono text-xs"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Live Rendered Result Banner */}
            <div className="flex flex-col gap-1.5 rounded-xl border border-border/80 bg-card/70 p-4 shadow-inner">
              <span className="flex items-center gap-1.5 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
                <Sparkles className="size-3 text-foreground" />{' '}
                {content.editor.renderedOutput} ({testLocale}):
              </span>
              <div className="font-semibold text-base text-foreground leading-snug sm:text-lg">
                {evaluatedPreview || (
                  <span className="font-normal text-muted-foreground text-sm italic">
                    {content.editor.enterMessagePrompt}
                  </span>
                )}
              </div>
            </div>
          </Container>

          {/* INTLAYER CONVERSION & EXPORT CARD */}
          <Container
            roundedSize="2xl"
            transparency="sm"
            className="flex flex-col gap-4 border border-border/80 bg-card/60 p-5 shadow-lg backdrop-blur-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-border/50 border-b pb-3">
              <div className="flex items-center gap-2">
                <FileCode className="size-4 text-foreground" />
                <span className="font-bold text-foreground text-sm">
                  {content.editor.exportTitle}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExportViewMode('content_ts')}
                  className={cn(
                    'cursor-pointer rounded-md px-2.5 py-1 font-medium text-xs transition-colors',
                    exportViewMode === 'content_ts'
                      ? 'bg-muted font-semibold text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  .content.ts
                </button>
                <button
                  type="button"
                  onClick={() => setExportViewMode('content_json')}
                  className={cn(
                    'cursor-pointer rounded-md px-2.5 py-1 font-medium text-xs transition-colors',
                    exportViewMode === 'content_json'
                      ? 'bg-muted font-semibold text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  .content.json
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border/70 bg-background/80">
              <CodeBlock
                lang={exportViewMode === 'content_ts' ? 'typescript' : 'json'}
                className="w-full text-xs"
              >
                {exportViewMode === 'content_ts'
                  ? intlayerConversion.contentDeclaration || '// No content'
                  : intlayerConversion.contentJsonDeclaration || '{}'}
              </CodeBlock>
            </div>

            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span>{content.editor.exportDescription}</span>
              <CopyButton
                content={
                  exportViewMode === 'content_ts'
                    ? intlayerConversion.contentDeclaration || ''
                    : intlayerConversion.contentJsonDeclaration || ''
                }
                variant="outline"
                color="text"
                size="sm"
                label={content.editor.copyIntlayerCode.value}
                className="cursor-pointer gap-1 text-xs"
              />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
