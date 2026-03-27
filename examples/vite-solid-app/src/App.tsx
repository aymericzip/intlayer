import { A, Route, useLocation, useNavigate } from '@solidjs/router';
import { getLocalizedUrl, localeMap } from 'intlayer';
import { IntlayerProvider, useIntlayer, useLocale } from 'solid-intlayer';
import {
  useCompact,
  useCurrency,
  useDate,
  useList,
  useNumber,
  usePercentage,
  useRelativeTime,
  useUnit,
} from 'solid-intlayer/format';
import { MarkdownProvider } from 'solid-intlayer/markdown';
import { createSignal, For, type JSX, type ParentComponent } from 'solid-js';
import './App.css';

import viteLogo from '/vite.svg';
import solidLogo from './assets/solid.svg';

const LocaleSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (loc) => {
      const pathWithLocale = getLocalizedUrl(location.pathname, loc);
      navigate(pathWithLocale);
    },
  });

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value)}
      class="locale-switcher"
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};

const Layout: ParentComponent = (props) => {
  const { locale } = useLocale();

  return (
    <>
      <nav>
        <A href={getLocalizedUrl('/', locale())} end activeClass="active">
          Home
        </A>
        <LocaleSwitcher />
      </nav>
      {props.children}
    </>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const th: Record<string, string> = {
  padding: '8px 14px',
  'text-align': 'left',
  'font-weight': '600',
  background: 'rgba(79,136,198,0.18)',
  'border-bottom': '2px solid rgba(79,136,198,0.4)',
  'white-space': 'nowrap',
};
const tdBase: Record<string, string> = {
  padding: '6px 14px',
  'border-bottom': '1px solid rgba(255,255,255,0.07)',
  'vertical-align': 'top',
};
const sectionHdr: Record<string, string> = {
  padding: '6px 14px',
  background: 'rgba(79,136,198,0.08)',
  'font-weight': '700',
  'font-size': '0.75em',
  'letter-spacing': '0.08em',
  'text-transform': 'uppercase',
  color: '#888',
};

// ─── Benchmark ───────────────────────────────────────────────────────────────

const BenchmarkTable = () => {
  const content = useIntlayer('benchmark');
  const number = useNumber();
  const percentage = usePercentage();
  const currency = useCurrency();
  const date = useDate();
  const relativeTime = useRelativeTime();
  const unit = useUnit();
  const compact = useCompact();
  const list = useList();

  const now = new Date();
  const in3Days = new Date(now.getTime() + 3 * 864e5);

  type Row = { name: string; desc: string; result: () => JSX.Element };
  type Section = { label: string; rows: Row[] };

  const sections: Section[] = [
    {
      label: 'Content Nodes',
      rows: [
        {
          name: 't()',
          desc: 'Simple translation',
          result: () => content().n01_t,
        },
        {
          name: 't().value',
          desc: 'Raw string value',
          result: () => content().n01_t.value,
        },
        {
          name: 'enu() −2',
          desc: "count=-2 → '<-1'",
          result: () => content().n02_enu(-2),
        },
        {
          name: 'enu() 0',
          desc: "count=0 → '0'",
          result: () => content().n02_enu(0),
        },
        {
          name: 'enu() 1',
          desc: "count=1 → '1'",
          result: () => content().n02_enu(1),
        },
        {
          name: 'enu() 7',
          desc: "count=7 → '>5'",
          result: () => content().n02_enu(7),
        },
        {
          name: 'enu() 25',
          desc: "count=25 → '>19'",
          result: () => content().n02_enu(25),
        },
        {
          name: 'cond() true',
          desc: 'condition=true',
          result: () => content().n03_cond(true),
        },
        {
          name: 'cond() false',
          desc: 'condition=false',
          result: () => content().n03_cond(false),
        },
        {
          name: "gender() 'male'",
          desc: "gender='male'",
          result: () => content().n04_gender('male'),
        },
        {
          name: "gender() 'female'",
          desc: "gender='female'",
          result: () => content().n04_gender('female'),
        },
        {
          name: 'insert()',
          desc: "{name:'Alice', age:30}",
          result: () => content().n05_insert({ name: 'Alice', age: 30 }),
        },
        {
          name: 'md()',
          desc: 'Markdown string',
          result: () => content().n06_md,
        },
        {
          name: 'html()',
          desc: 'HTML string',
          result: () => content().n07_html.use({}),
        },
      ],
    },
    {
      label: 'Combinations',
      rows: [
        {
          name: 'insert(t())',
          desc: "{name:'Alice', place:'Paris'}",
          result: () =>
            content().n08_insert_t({ name: 'Alice', place: 'Paris' }),
        },
        {
          name: 't(md())',
          desc: 'Translation of markdown',
          result: () => content().n09_t_of_md,
        },
        {
          name: 'md(t())',
          desc: 'Markdown from translation',
          result: () => content().n10_md_t,
        },
        {
          name: 'enu(t()) 2',
          desc: 'count=2',
          result: () => content().n11_enu_t(2),
        },
        {
          name: 'insert(enu(t()))',
          desc: '{count:3,name:"Alice"}(3)',
          result: () =>
            content().n12_insert_enu_t({ count: 3, name: 'Alice' })(3),
        },
        {
          name: 'cond(t()) true',
          desc: 'true',
          result: () => content().n13_cond_t(true),
        },
        {
          name: 'cond(insert(t()))',
          desc: "true · {name:'Alice'}",
          result: () => content().n14_cond_insert_t(true)?.({ name: 'Alice' }),
        },
        {
          name: 'gender(insert(t()))',
          desc: "female · {name:'Alice'}",
          result: () =>
            content().n15_gender_insert_t('female')?.({ name: 'Alice' }),
        },
      ],
    },
    {
      label: 'Data Structures',
      rows: [
        {
          name: 'nested object',
          desc: 'obj.level1.level2',
          result: () => content().n17_nested_object.level1.level2,
        },
        {
          name: "array ['string']",
          desc: "['item1','item2','item3']",
          result: () => content().n18_array_strings,
        },
        {
          name: 'array [t()]',
          desc: 'Array of translations',
          result: () => content().n19_array_translations,
        },
        {
          name: 'array [{obj}]',
          desc: 'Array of {name,role}',
          result: () =>
            content()
              .n20_array_objects.map((o) => `${o.name} (${o.role})`)
              .join(' · '),
        },
        {
          name: "nest('app','title')",
          desc: 'Cross-dict reference',
          result: () => content().n21_nest,
        },
      ],
    },
    {
      label: 'Formatters',
      rows: [
        {
          name: 'useNumber()',
          desc: '123456.789',
          result: () => number(123456.789),
        },
        {
          name: 'usePercentage()',
          desc: '0.25',
          result: () => percentage(0.25),
        },
        {
          name: 'useCurrency()',
          desc: '1234.5, EUR',
          result: () => currency(1234.5, { currency: 'EUR' }),
        },
        {
          name: 'useDate()',
          desc: 'now, short',
          result: () => date(now, 'short'),
        },
        {
          name: 'useRelativeTime()',
          desc: 'now → +3 days',
          result: () => relativeTime(now, in3Days, { unit: 'day' }),
        },
        {
          name: 'useUnit()',
          desc: '5, kilometer, long',
          result: () => unit(5, { unit: 'kilometer', unitDisplay: 'long' }),
        },
        { name: 'useCompact()', desc: '1200', result: () => compact(1200) },
        {
          name: 'useList()',
          desc: "['apple','banana','orange']",
          result: () => list(['apple', 'banana', 'orange']),
        },
      ],
    },
  ];

  let rowIndex = 0;

  return (
    <div style={{ margin: '24px 0', 'overflow-x': 'auto' }}>
      <h2
        style={{
          'margin-bottom': '16px',
          'font-size': '1.25em',
          color: '#4f88c6',
        }}
      >
        Intlayer Node Benchmark
      </h2>
      <table
        style={{
          width: '100%',
          'border-collapse': 'collapse',
          'font-size': '0.88em',
          'text-align': 'left',
        }}
      >
        <thead>
          <tr>
            <th style={th}>#</th>
            <th style={th}>Name</th>
            <th style={th}>Description</th>
            <th style={th}>Result</th>
          </tr>
        </thead>
        <tbody>
          <For each={sections}>
            {(section) => (
              <>
                <tr>
                  <td colspan="4" style={sectionHdr}>
                    {section.label}
                  </td>
                </tr>
                <For each={section.rows}>
                  {(row) => {
                    const id = ++rowIndex;
                    return (
                      <tr
                        style={{
                          background:
                            id % 2 === 0
                              ? 'rgba(255,255,255,0.025)'
                              : 'transparent',
                        }}
                      >
                        <td
                          style={{
                            ...tdBase,
                            color: '#666',
                            'font-family': 'monospace',
                          }}
                        >
                          {id}
                        </td>
                        <td style={tdBase}>
                          <code
                            style={{
                              background: 'rgba(79,136,198,0.12)',
                              padding: '2px 7px',
                              'border-radius': '4px',
                              'font-size': '0.85em',
                            }}
                          >
                            {row.name}
                          </code>
                        </td>
                        <td
                          style={{
                            ...tdBase,
                            color: '#aaa',
                            'font-family': 'monospace',
                            'font-size': '0.83em',
                          }}
                        >
                          {row.desc}
                        </td>
                        <td style={tdBase}>{row.result()}</td>
                      </tr>
                    );
                  }}
                </For>
              </>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};

// ─── Home ────────────────────────────────────────────────────────────────────

const Home = () => {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer('app');

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img
            src={viteLogo}
            class="logo"
            alt={content().viteLogoLabel.value}
          />
        </a>
        <a href="https://solidjs.com" target="_blank" rel="noopener">
          <img
            src={solidLogo}
            class="logo solid"
            alt={content().solidLogoLabel.value}
          />
        </a>
      </div>

      <h1>{content().title}</h1>

      <div class="card">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          {content().countIs({ count: count() })}
        </button>
      </div>

      <BenchmarkTable />

      <p class="read-the-docs">{content().readTheDocs}</p>
    </>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────

export const App = () => (
  <IntlayerProvider>
    {localeMap(({ locale, urlPrefix }) => (
      <Route
        path={urlPrefix}
        component={(props) => (
          <IntlayerProvider locale={locale}>
            <MarkdownProvider
              renderMarkdown={async (md) => {
                const { compileMarkdown } = await import(
                  'solid-intlayer/markdown'
                );
                return compileMarkdown(md);
              }}
            >
              <Layout>{props.children}</Layout>
            </MarkdownProvider>
          </IntlayerProvider>
        )}
      >
        <Route path="/" component={Home} />
      </Route>
    ))}
  </IntlayerProvider>
);
