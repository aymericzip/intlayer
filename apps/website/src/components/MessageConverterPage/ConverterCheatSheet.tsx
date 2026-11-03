import { Container } from '@intlayer/design-system/container';
import { CheckCircle2, FileText, Layers } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type SyntaxRowConfig = {
  key:
    | 'simpleVariable'
    | 'cldrPlural'
    | 'exactMatchPlural'
    | 'selectGender'
    | 'numberPercent'
    | 'htmlRichText';
  icu: string;
  i18next: string;
  vue: string;
  intlayer: string;
};

const SYNTAX_CONFIGS: SyntaxRowConfig[] = [
  {
    key: 'simpleVariable',
    icu: 'Hello {name}!',
    i18next: 'Hello {{name}}!',
    vue: 'Hello {name}!',
    intlayer: 'Hello {{name}}!',
  },
  {
    key: 'cldrPlural',
    icu: '{count, plural, one {# item} other {# items}}',
    i18next: '{count, plural, one {# item} other {# items}}',
    vue: '1 item | {count} items',
    intlayer: "plural({ one: '{{count}} item', other: '{{count}} items' })",
  },
  {
    key: 'exactMatchPlural',
    icu: '{count, plural, =0 {No items} other {# items}}',
    i18next: '{count, plural, =0 {No items} other {# items}}',
    vue: 'No items | {count} items',
    intlayer: "enu({ '0': 'No items', fallback: '{{count}} items' })",
  },
  {
    key: 'selectGender',
    icu: '{gender, select, male {He} female {She} other {They}}',
    i18next: '{gender, select, male {He} female {She} other {They}}',
    vue: '{gender: {male: "He", female: "She"}}',
    intlayer: "gender({ male: 'He', female: 'She', fallback: 'They' })",
  },
  {
    key: 'numberPercent',
    icu: '{val, number, percent}',
    i18next: '{{val, percent}}',
    vue: "$n(val, 'percent')",
    intlayer: '{val, number, percent}',
  },
  {
    key: 'htmlRichText',
    icu: 'Read <strong>{doc}</strong>',
    i18next: 'Read <1>{{doc}}</1>',
    vue: '<i18n-t> or raw HTML',
    intlayer: "html('Read <strong>{{doc}}</strong>')",
  },
];

export const ConverterCheatSheet: FC = () => {
  const content = useIntlayer('message-converter-page');

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          {content.cheatSheetTitle}
        </h2>
        <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
          {content.cheatSheetDescription}
        </p>
      </div>

      {/* Comparison Table */}
      <Container
        roundedSize="xl"
        transparency="sm"
        className="overflow-x-auto border border-border/80 bg-card/60 p-0 shadow-sm backdrop-blur-md"
      >
        <table className="w-full border-collapse text-start text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 font-medium text-foreground">
              <th className="p-4">{content.cheatSheetColumns.feature}</th>
              <th className="p-4">{content.cheatSheetColumns.icu}</th>
              <th className="p-4">{content.cheatSheetColumns.i18next}</th>
              <th className="p-4">{content.cheatSheetColumns.vue}</th>
              <th className="bg-muted/40 p-4 font-semibold text-foreground">
                {content.cheatSheetColumns.intlayer}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {SYNTAX_CONFIGS.map((row) => {
              const rowContent = content.cheatSheetRows[row.key];

              return (
                <tr
                  key={row.key}
                  className="transition-colors hover:bg-muted/20"
                >
                  <td className="p-4 font-medium text-foreground">
                    <div>{rowContent.feature}</div>
                    <div className="text-xs text-muted-foreground">
                      {rowContent.description}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">
                    <code>{row.icu}</code>
                  </td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">
                    <code>{row.i18next}</code>
                  </td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">
                    <code>{row.vue}</code>
                  </td>
                  <td className="bg-muted/25 p-4 font-mono text-xs font-medium text-foreground">
                    <code>{row.intlayer}</code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>

      {/* Key Advantages Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-2.5 rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-foreground">
            <CheckCircle2 className="size-5" />
            <h4 className="text-sm font-semibold text-foreground">
              {content.advantages.typeSafeTitle}
            </h4>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {content.advantages.typeSafeDescription}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-foreground">
            <Layers className="size-5" />
            <h4 className="text-sm font-semibold text-foreground">
              {content.advantages.universalCompatTitle}
            </h4>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {content.advantages.universalCompatDescription}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-foreground">
            <FileText className="size-5" />
            <h4 className="text-sm font-semibold text-foreground">
              {content.advantages.visualCmsTitle}
            </h4>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {content.advantages.visualCmsDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
