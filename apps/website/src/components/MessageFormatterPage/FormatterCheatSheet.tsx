import { Container } from '@intlayer/design-system/container';
import { BookOpen, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { FormatterDialect } from './types';

type CheatSheetRow = {
  feature: string;
  syntax: string;
  example: string;
  notes: string;
  intlayerEquivalent: string;
};

const CHEAT_SHEETS: Record<
  FormatterDialect,
  { title: string; rows: CheatSheetRow[] }
> = {
  icu: {
    title: 'ICU MessageFormat Syntax Cheat Sheet',
    rows: [
      {
        feature: 'Simple Variable',
        syntax: '{variableName}',
        example: 'Hello {name}!',
        notes: 'Alphanumeric names, single brackets',
        intlayerEquivalent: '{{name}}',
      },
      {
        feature: 'Pluralization',
        syntax: '{count, plural, one {...} other {...}}',
        example: '{n, plural, one {# item} other {# items}}',
        notes: 'Requires "other". # is replaced by count.',
        intlayerEquivalent:
          'plural({ one: "1 item", other: "{{count}} items" })',
      },
      {
        feature: 'Exact Match Plural',
        syntax: '=0 {...} =1 {...}',
        example: '{n, plural, =0 {None} one {#} other {#}}',
        notes: 'Takes precedence over CLDR keywords',
        intlayerEquivalent: 'enu({ 0: "None", 1: "1", fallback: "{{count}}" })',
      },
      {
        feature: 'Select (Context/Gender)',
        syntax: '{key, select, choice1 {...} other {...}}',
        example: '{gender, select, male {He} other {They}}',
        notes: 'Case-sensitive exact string comparison',
        intlayerEquivalent:
          'select({ male: "He", fallback: "They" }, "gender")',
      },
      {
        feature: 'Selectordinal',
        syntax: '{rank, selectordinal, one {#st} other {#th}}',
        example: '{pos, selectordinal, one {#st} two {#nd} other {#th}}',
        notes: 'Ordinal suffix rules per CLDR',
        intlayerEquivalent:
          'enu({ 1: "1st", 2: "2nd", fallback: "{{pos}}th" })',
      },
      {
        feature: 'Number Formatting',
        syntax: '{val, number, [style]}',
        example: '{price, number, currency}',
        notes: 'Supports percent, currency, integer styles',
        intlayerEquivalent: 'Intl.NumberFormat or type-safe formatting',
      },
      {
        feature: 'Escaping',
        syntax: "'{' and '' for apostrophes",
        example: "Don''t '{'escape'}'",
        notes: "Single quotes escape literal blocks, '' escapes quote",
        intlayerEquivalent: 'Literal strings naturally supported',
      },
    ],
  },
  i18next: {
    title: 'i18next Syntax Cheat Sheet',
    rows: [
      {
        feature: 'Interpolation',
        syntax: '{{variableName}}',
        example: 'Hello {{user.name}}!',
        notes: 'Double curly braces, supports dot paths',
        intlayerEquivalent: '{{user.name}}',
      },
      {
        feature: 'Unescaped HTML',
        syntax: '{{- rawVar}}',
        example: 'Visit {{- url}}',
        notes: 'Disables HTML escaping for raw markup',
        intlayerEquivalent: 'html(...) or Markdown',
      },
      {
        feature: 'Plural Keys',
        syntax: 'key_one, key_other',
        example: '"item_one": "1 item", "item_other": "{{count}} items"',
        notes: 'Suffix keys based on count parameter',
        intlayerEquivalent:
          'plural({ one: "1 item", other: "{{count}} items" })',
      },
      {
        feature: 'Context Suffix',
        syntax: 'key_context',
        example: '"friend_female": "Girlfriend"',
        notes: 'Key appended with context parameter',
        intlayerEquivalent:
          'select({ female: "Girlfriend", fallback: "Friend" })',
      },
      {
        feature: 'Nesting',
        syntax: '$t(nested.key)',
        example: 'Welcome, $t(common.brand)',
        notes: 'Reuses other translation keys',
        intlayerEquivalent: 'Direct object property reuse in TS',
      },
      {
        feature: 'Formatting',
        syntax: '{{val, format}}',
        example: '{{date, YYYY-MM-DD}}',
        notes: 'Passes value through custom formatters',
        intlayerEquivalent: 'Standard JavaScript/TypeScript helper',
      },
    ],
  },
  'vue-i18n': {
    title: 'Vue I18n Syntax Cheat Sheet',
    rows: [
      {
        feature: 'Named Formatting',
        syntax: '{variableName}',
        example: 'Hello {name}!',
        notes: 'Single braces for named parameters',
        intlayerEquivalent: '{{name}}',
      },
      {
        feature: 'List Formatting',
        syntax: '{0}, {1}, ...',
        example: 'Hello {0} and {1}',
        notes: 'Index-based positional arguments',
        intlayerEquivalent: '{{0}} or named variables',
      },
      {
        feature: 'Pipe Pluralization',
        syntax: 'no items | 1 item | {n} items',
        example: 'no apples | 1 apple | {n} apples',
        notes: 'Pipes separate 0, 1, and plural forms',
        intlayerEquivalent:
          'plural({ 0: "no apples", 1: "1 apple", other: "{{count}} apples" })',
      },
      {
        feature: 'Linked Messages',
        syntax: '@:path.to.message',
        example: 'Home of @:brand.name',
        notes: 'References other messages in the dictionary',
        intlayerEquivalent: 'TypeScript object references',
      },
      {
        feature: 'Literal Interpolation',
        syntax: "{'literal'}",
        example: "{'hello'} {name}",
        notes: 'Single-quoted literal inside braces',
        intlayerEquivalent: 'Literal strings',
      },
    ],
  },
  po: {
    title: 'GNU Gettext PO Syntax Cheat Sheet',
    rows: [
      {
        feature: 'Singular Message',
        syntax: 'msgid "..." \\n msgstr "..."',
        example: 'msgid "Hello" \\n msgstr "Bonjour"',
        notes: 'msgid is source key, msgstr is translated text',
        intlayerEquivalent: 't({ en: "Hello", fr: "Bonjour" })',
      },
      {
        feature: 'Plural Messages',
        syntax: 'msgid_plural "..." \\n msgstr[N] "..."',
        example:
          'msgid "file" \\n msgid_plural "files" \\n msgstr[0] "fichier" \\n msgstr[1] "fichiers"',
        notes: 'Plural-Forms header defines index calculation',
        intlayerEquivalent: 'plural({ one: "file", other: "{{count}} files" })',
      },
      {
        feature: 'Context (msgctxt)',
        syntax: 'msgctxt "context" \\n msgid "..."',
        example: 'msgctxt "menu" \\n msgid "File"',
        notes: 'Disambiguates identical msgid in different contexts',
        intlayerEquivalent: 'Separate keys or select() nodes',
      },
      {
        feature: 'Printf Specifiers',
        syntax: '%s, %d, %1$s',
        example: 'msgid "%d items found"',
        notes: 'Position-aware C printf formatters',
        intlayerEquivalent: '{{count}} or named interpolations',
      },
      {
        feature: 'Comments',
        syntax: '# translator, #: reference, #, flag',
        example: '#: src/app.tsx:42',
        notes: 'Standard PO comments generated by xgettext',
        intlayerEquivalent: 'TypeScript comments in .content.ts',
      },
    ],
  },
};

export const FormatterCheatSheet: FC<{ dialect: FormatterDialect }> = ({
  dialect,
}) => {
  const content = useIntlayer('message-formatter-page');
  const sheet = CHEAT_SHEETS[dialect];

  return (
    <Container
      roundedSize="2xl"
      transparency="sm"
      className="flex flex-col gap-6 border border-border/80 bg-card/40 p-6 shadow-lg backdrop-blur-md sm:p-8"
    >
      <div className="flex items-center justify-between border-border/50 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-muted text-foreground">
            <BookOpen className="size-5" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg sm:text-xl">
              {sheet.title}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              {content.cheatSheet.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-border/60 border-b bg-muted/40 font-semibold text-muted-foreground">
              <th className="px-4 py-3">{content.cheatSheet.featureHeader}</th>
              <th className="px-4 py-3">{content.cheatSheet.syntaxHeader}</th>
              <th className="px-4 py-3">{content.cheatSheet.exampleHeader}</th>
              <th className="px-4 py-3">{content.cheatSheet.notesHeader}</th>
              <th className="px-4 py-3 font-bold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-foreground" />
                  {content.cheatSheet.intlayerEquivalentHeader}
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {sheet.rows.map((row) => (
              <tr
                key={row.feature}
                className="transition-colors hover:bg-muted/20"
              >
                <td className="px-4 py-3.5 font-medium text-foreground">
                  {row.feature}
                </td>
                <td className="px-4 py-3.5 font-mono text-muted-foreground text-xs">
                  <code className="rounded bg-muted/70 px-1.5 py-0.5 text-foreground">
                    {row.syntax}
                  </code>
                </td>
                <td className="px-4 py-3.5 font-mono text-foreground text-xs">
                  {row.example}
                </td>
                <td className="px-4 py-3.5 text-muted-foreground text-xs">
                  {row.notes}
                </td>
                <td className="px-4 py-3.5 font-medium font-mono text-foreground text-xs">
                  <code className="rounded bg-muted/80 px-1.5 py-0.5 text-foreground">
                    {row.intlayerEquivalent}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex items-center gap-2 text-muted-foreground text-xs">
        <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
        <span>{content.cheatSheet.compilerTip}</span>
      </div>
    </Container>
  );
};
