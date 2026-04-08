import {
  compact,
  currency,
  date,
  number,
  percentage,
  relativeTime,
  units,
} from 'intlayer';
import { useIntlayer } from 'vanilla-intlayer';
import { setupLocaleSwitcher } from './locale-switcher';
import './style.css';

const setupApp = async () => {
  const content = useIntlayer('app');
  const bm = useIntlayer('benchmark');
  let count = 0;

  const appElement = document.querySelector<HTMLDivElement>('#app')!;

  // Mount locale switcher once — outside the render cycle so it isn't wiped
  const switcherContainer = document.createElement('div');
  switcherContainer.style.cssText =
    'position:fixed;top:12px;right:16px;z-index:999;';
  document.body.appendChild(switcherContainer);
  setupLocaleSwitcher(switcherContainer);

  const now = new Date();
  const in3Days = new Date(now.getTime() + 3 * 864e5);

  type Row = { name: string; desc: string; result: any };
  type Section = { label: string; rows: Row[] };

  const sections: Section[] = [
    {
      label: 'Content Nodes',
      rows: [
        { name: 't()', desc: 'Simple translation', result: bm.n01_t },
        {
          name: 'enu() −2',
          desc: "count=-2 → '<-1'",
          result: bm.n02_enu(-2),
        },
        {
          name: 'enu() 0',
          desc: "count=0 → '0'",
          result: bm.n02_enu(0),
        },
        {
          name: 'enu() 1',
          desc: "count=1 → '1'",
          result: bm.n02_enu(1),
        },
        {
          name: 'enu() 7',
          desc: "count=7 → '>5'",
          result: bm.n02_enu(7),
        },
        {
          name: 'enu() 25',
          desc: "count=25 → '>19'",
          result: bm.n02_enu(25),
        },
        {
          name: 'cond() true',
          desc: 'condition=true',
          result: bm.n03_cond(true),
        },
        {
          name: 'cond() false',
          desc: 'condition=false',
          result: bm.n03_cond(false),
        },
        {
          name: "gender() 'male'",
          desc: "gender='male'",
          result: bm.n04_gender('male'),
        },
        {
          name: "gender() 'female'",
          desc: "gender='female'",
          result: bm.n04_gender('female'),
        },
        {
          name: 'insert()',
          desc: "{name:'Alice', age:30}",
          result: bm.n05_insert({ name: 'Alice', age: 30 }),
        },
        { name: 'md()', desc: 'Markdown string', result: bm.n06_md },
        { name: 'html()', desc: 'HTML string', result: bm.n07_html },
      ],
    },
    {
      label: 'Combinations',
      rows: [
        {
          name: 'insert(t())',
          desc: "{name:'Alice', place:'Paris'}",
          result: bm.n08_insert_t({ name: 'Alice', place: 'Paris' }),
        },
        {
          name: 'enu(t()) 2',
          desc: 'count=2',
          result: bm.n11_enu_t(2),
        },
        {
          name: 'insert(enu(t()))',
          desc: '{count:3,name:"Alice"}(3)',
          result: undefined,
          // result: bm.n12_insert_enu_t({ count: 3, name: 'Alice' })(3),
        },
        {
          name: 'cond(t()) true',
          desc: 'true',
          result: bm.n13_cond_t(true),
        },
        {
          name: 'cond(insert(t()))',
          desc: "true · {name:'Alice'}",
          result: bm.n14_cond_insert_t(true)?.({ name: 'Alice' }),
        },
        {
          name: 'gender(insert(t()))',
          desc: "female · {name:'Alice'}",
          result: bm.n15_gender_insert_t('female')?.({
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
          result: bm.n17_nested_object.level1.level2,
        },
        {
          name: "array ['string']",
          desc: "['item1','item2','item3']",
          result: bm.n18_array_strings,
        },
        {
          name: 'array [t()]',
          desc: 'Array of translations',
          result: bm.n19_array_translations,
        },
        {
          name: 'array [{obj}]',
          desc: 'Array of {name,role}',
          result: bm.n20_array_objects
            .map((o) => `${o.name.value} (${o.role.value})`)
            .join(' · '),
        },
        {
          name: "nest('app','title')",
          desc: 'Cross-dict reference',
          result: bm.n21_nest,
        },
      ],
    },
    {
      label: 'Formatters',
      rows: [
        { name: 'number()', desc: '123456.789', result: number(123456.789) },
        { name: 'percentage()', desc: '0.25', result: percentage(0.25) },
        {
          name: 'currency()',
          desc: '1234.5, EUR',
          result: currency(1234.5, { currency: 'EUR' }),
        },
        { name: 'date()', desc: 'now, short', result: date(now, 'short') },
        {
          name: 'relativeTime()',
          desc: 'now → +3 days',
          result: relativeTime(now, in3Days, { unit: 'day' }),
        },
        {
          name: 'units()',
          desc: '5, kilometer, long',
          result: units(5, { unit: 'kilometer', unitDisplay: 'long' }),
        },
        { name: 'compact()', desc: '1200', result: compact(1200) },
      ],
    },
  ];

  let globalRowIdx = 0;
  const buildSections = () =>
    sections
      .map(
        (section) => `
      <tr style="background:rgba(255,255,255,0.04)">
        <td colspan="4" style="padding:6px 14px;font-weight:700;font-size:0.75em;letter-spacing:0.08em;text-transform:uppercase;color:#888;">${section.label}</td>
      </tr>
      ${section.rows
        .map((row) => {
          globalRowIdx++;
          const i = globalRowIdx;
          return `<tr style="background:${i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent'}">
            <td style="padding:6px 14px;color:#666;font-family:monospace;">${i}</td>
            <td style="padding:6px 14px"><code style="background:rgba(49,138,155,0.15);padding:2px 7px;border-radius:4px;font-size:0.85em;">${row.name}</code></td>
            <td style="padding:6px 14px;color:#aaa;font-family:monospace;font-size:0.83em;">${row.desc}</td>
            <td style="padding:6px 14px">${row.result}</td>
          </tr>`;
        })
        .join('')}
    `
      )
      .join('');

  const render = () => {
    globalRowIdx = 0;
    appElement.innerHTML = `
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="${content.viteLogoLabel.value}" />
        </a>
  
        <h1>${content.title}</h1>
        <div class="card">
          <button id="counter" type="button">${content.countIs({ count })}</button>
        </div>

        <div style="margin:24px 0;overflow-x:auto">
          <h2 style="margin-bottom:16px;font-size:1.25em;color:#318a9b">Intlayer Node Benchmark</h2>
          <table style="width:100%;border-collapse:collapse;font-size:0.88em;text-align:left">
            <thead>
              <tr>
                <th style="padding:8px 14px;text-align:left;font-weight:600;background:rgba(49,138,155,0.18);border-bottom:2px solid rgba(49,138,155,0.4);width:36px">#</th>
                <th style="padding:8px 14px;text-align:left;font-weight:600;background:rgba(49,138,155,0.18);border-bottom:2px solid rgba(49,138,155,0.4);width:200px">Name</th>
                <th style="padding:8px 14px;text-align:left;font-weight:600;background:rgba(49,138,155,0.18);border-bottom:2px solid rgba(49,138,155,0.4);width:280px">Description</th>
                <th style="padding:8px 14px;text-align:left;font-weight:600;background:rgba(49,138,155,0.18);border-bottom:2px solid rgba(49,138,155,0.4)">Result</th>
              </tr>
            </thead>
            <tbody>
              ${buildSections()}
            </tbody>
          </table>
        </div>

        <p class="read-the-docs">${content.readTheDocs}</p>
      </div>
    `;

    document
      .querySelector<HTMLButtonElement>('#counter')!
      .addEventListener('click', () => {
        count++;
        render();
      });
  };

  render();
};

setupApp();
