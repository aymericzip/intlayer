import { type FunctionComponent, Suspense, useState } from 'preact/compat';
import { useIntlayer } from 'preact-intlayer';
import {
  useCompact,
  useCurrency,
  useDate,
  useList,
  useNumber,
  usePercentage,
  useRelativeTime,
  useUnit,
} from 'preact-intlayer/format';
import { HTMLProvider } from 'preact-intlayer/html';
import { MarkdownProvider } from 'preact-intlayer/markdown';
import './app.css';
import viteLogo from '/vite.svg';
import preactLogo from './assets/preact.svg';
import { LocaleSwitcher } from './components/LocaleSwitcher';
import { LocaleRouter } from './Router';

// ─── Styles ──────────────────────────────────────────────────────────────────

const th: preact.CSSProperties = {
  padding: '8px 14px',
  textAlign: 'left',
  fontWeight: 600,
  background: 'rgba(103,58,184,0.18)',
  borderBottom: '2px solid rgba(103,58,184,0.4)',
  whiteSpace: 'nowrap',
};
const td: preact.CSSProperties = {
  padding: '6px 14px',
  borderBottom: '1px solid rgba(255,255,255,0.07)',
  verticalAlign: 'top',
};
const code: preact.CSSProperties = {
  background: 'rgba(103,58,184,0.12)',
  padding: '2px 7px',
  borderRadius: 4,
  fontSize: '0.85em',
  fontFamily: 'monospace',
};
const sectionHdr: preact.CSSProperties = {
  padding: '6px 14px',
  background: 'rgba(103,58,184,0.07)',
  fontWeight: 700,
  fontSize: '0.75em',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#888',
};

// ─── Benchmark ───────────────────────────────────────────────────────────────

type Row = { name: string; desc: string; result: preact.ComponentChild };
type Section = { label: string; rows: Row[] };

const BenchmarkTable: FunctionComponent = () => {
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
  const preview = (node: preact.ComponentChild) => (
    <div style={{ fontSize: '0.82em', lineHeight: '1.4' }}>{node}</div>
  );

  const sections: Section[] = [
    {
      label: 'Content Nodes',
      rows: [
        { name: 't()', desc: 'Simple translation', result: content.n01_t },
        {
          name: 't().value',
          desc: 'Raw string value',
          result: content.n01_t.value,
        },
        {
          name: 'enu() −2',
          desc: "count=-2 → '<-1'",
          result: content.n02_enu(-2),
        },
        {
          name: 'enu() 0',
          desc: "count=0 → '0'",
          result: content.n02_enu(0),
        },
        {
          name: 'enu() 1',
          desc: "count=1 → '1'",
          result: content.n02_enu(1),
        },
        {
          name: 'enu() 7',
          desc: "count=7 → '>5'",
          result: content.n02_enu(7),
        },
        {
          name: 'enu() 25',
          desc: "count=25 → '>19'",
          result: content.n02_enu(25),
        },
        {
          name: 'cond() true',
          desc: 'condition=true',
          result: content.n03_cond(true),
        },
        {
          name: 'cond() false',
          desc: 'condition=false',
          result: content.n03_cond(false),
        },
        {
          name: "gender() 'male'",
          desc: "gender='male'",
          result: content.n04_gender('male'),
        },
        {
          name: "gender() 'female'",
          desc: "gender='female'",
          result: content.n04_gender('female'),
        },
        {
          name: 'insert()',
          desc: "{name:'Alice', age:30}",
          result: content.n05_insert({ name: 'Alice', age: 30 }),
        },
        {
          name: 'md()',
          desc: 'Markdown string',
          result: preview(content.n06_md),
        },
        {
          name: 'html()',
          desc: 'HTML string',
          result: content.n07_html.use({}),
        },
      ],
    },
    {
      label: 'Combinations',
      rows: [
        {
          name: 'insert(t())',
          desc: "{name:'Alice', place:'Paris'}",
          result: content.n08_insert_t({
            name: 'Alice',
            place: 'Paris',
          }),
        },
        {
          name: 't(md())',
          desc: 'Translation of markdown',
          result: preview(content.n09_t_of_md),
        },
        {
          name: 'md(t())',
          desc: 'Markdown from translation',
          result: preview(content.n10_md_t),
        },
        {
          name: 'enu(t()) 2',
          desc: 'count=2',
          result: content.n11_enu_t(2),
        },
        {
          name: 'insert(enu(t()))',
          desc: '{count:3,name:"Alice"}(3)',
          result: content.n12_insert_enu_t({
            count: 3,
            name: 'Alice',
          })(3),
        },
        {
          name: 'cond(t()) true',
          desc: 'true',
          result: content.n13_cond_t(true),
        },
        {
          name: 'cond(insert(t()))',
          desc: "true · {name:'Alice'}",
          result: content.n14_cond_insert_t(true)?.({ name: 'Alice' }),
        },
        {
          name: 'gender(insert(t()))',
          desc: "female · {name:'Alice'}",
          result: content.n15_gender_insert_t('female')?.({
            name: 'Alice',
          }),
        },
      ],
    },
    {
      label: 'Data Structures',
      rows: [
        {
          name: 'nested object',
          desc: 'obj.level1.level2',
          result: content.n17_nested_object.level1.level2,
        },
        {
          name: "array ['string']",
          desc: "['item1','item2','item3']",
          result: content.n18_array_strings,
        },
        {
          name: 'array [t()]',
          desc: 'Array of translations',
          result: content.n19_array_translations,
        },
        {
          name: 'array [{obj}]',
          desc: 'Array of {name,role}',
          result: content.n20_array_objects
            .map((o) => `${o.name.value} (${o.role.value})`)
            .join(' · '),
        },
        {
          name: "nest('app','title')",
          desc: 'Cross-dict reference',
          result: content.n21_nest,
        },
      ],
    },
    {
      label: 'Formatters',
      rows: [
        { name: 'useNumber()', desc: '123456.789', result: number(123456.789) },
        { name: 'usePercentage()', desc: '0.25', result: percentage(0.25) },
        {
          name: 'useCurrency()',
          desc: '1234.5, EUR',
          result: currency(1234.5, { currency: 'EUR' }),
        },
        { name: 'useDate()', desc: 'now, short', result: date(now, 'short') },
        {
          name: 'useRelativeTime()',
          desc: 'now → +3 days',
          result: relativeTime(now, in3Days, { unit: 'day' }),
        },
        {
          name: 'useUnit()',
          desc: '5, kilometer, long',
          result: unit(5, { unit: 'kilometer', unitDisplay: 'long' }),
        },
        { name: 'useCompact()', desc: '1200', result: compact(1200) },
        {
          name: 'useList()',
          desc: "['apple','banana','orange']",
          result: list(['apple', 'banana', 'orange']),
        },
      ],
    },
  ];

  let rowIndex = 0;

  return (
    <div style={{ margin: '24px 0', overflowX: 'auto' }}>
      <h2 style={{ marginBottom: 16, fontSize: '1.25em', color: '#673ab8' }}>
        Intlayer Node Benchmark
      </h2>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.88em',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr>
            <th style={{ ...th, width: 36 }}>#</th>
            <th style={{ ...th, width: 200 }}>Name</th>
            <th style={{ ...th, width: 280 }}>Description</th>
            <th style={th}>Result</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <>
              <tr key={section.label}>
                <td colSpan={4} style={sectionHdr}>
                  {section.label}
                </td>
              </tr>
              {section.rows.map((row) => {
                rowIndex++;
                const i = rowIndex;
                return (
                  <tr
                    key={i}
                    style={{
                      background:
                        i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent',
                    }}
                  >
                    <td
                      style={{ ...td, color: '#666', fontFamily: 'monospace' }}
                    >
                      {i}
                    </td>
                    <td style={td}>
                      <code style={code}>{row.name}</code>
                    </td>
                    <td
                      style={{
                        ...td,
                        color: '#aaa',
                        fontFamily: 'monospace',
                        fontSize: '0.83em',
                      }}
                    >
                      {row.desc}
                    </td>
                    <td style={td}>{row.result}</td>
                  </tr>
                );
              })}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────

const AppContent: FunctionComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer('app');

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener">
          <img
            src={viteLogo}
            className="logo"
            alt={content.viteLogoLabel.value}
          />
        </a>
        <a href="https://preactjs.com" target="_blank" rel="noopener">
          <img
            src={preactLogo}
            className="logo preact"
            alt={content.preactLogoLabel.value}
          />
        </a>
      </div>

      <h1>{content.title}</h1>

      <div className="card">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          {content.countIs({ count })}
        </button>
      </div>

      <BenchmarkTable />

      <p className="read-the-docs">{content.readTheDocs}</p>

      <div className="absolute right-5 bottom-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
};

export const App: FunctionComponent = () => (
  <LocaleRouter>
    <Suspense fallback={<div>loading...</div>}>
      <MarkdownProvider
        components={{
          h1: (props: any) => (
            <h1 style={{ color: '#673ab8' }} {...props}>
              {props.children}
            </h1>
          ),
          ComponentDemo: () => (
            <div
              style={{
                padding: '10px',
                background: 'rgba(103,58,184,0.1)',
                borderRadius: '8px',
                border: '1px solid #673ab8',
              }}
            >
              MDX Demo
            </div>
          ),
        }}
      >
        <HTMLProvider
          components={{
            CustomComponent: (props: any) => (
              <h1 style={{ color: 'blue' }} {...props}>
                Custom 2
              </h1>
            ),
          }}
        >
          <AppContent />
        </HTMLProvider>
      </MarkdownProvider>
    </Suspense>
  </LocaleRouter>
);

export default App;
