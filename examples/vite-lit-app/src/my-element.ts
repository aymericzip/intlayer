import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { useIntlayer } from 'lit-intlayer';
import {
  useCompact,
  useCurrency,
  useDate,
  useList,
  useNumber,
  usePercentage,
  useRelativeTime,
  useUnit,
} from 'lit-intlayer/format';
import litLogo from './assets/lit.svg';
import viteLogo from './assets/vite.svg';

type Row = { name: string; desc: string; result: unknown };
type Section = { label: string; rows: Row[] };

@customElement('my-element')
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  private content = useIntlayer('app').observe(this);
  private bm = useIntlayer('benchmark').observe(this);

  private number = useNumber(this);
  private percentage = usePercentage(this);
  private currency = useCurrency(this);
  private date = useDate(this);
  private relativeTime = useRelativeTime(this);
  private unit = useUnit(this);
  private compact = useCompact(this);
  private list = useList(this);

  private now = new Date();
  private in3Days = new Date(this.now.getTime() + 3 * 864e5);

  private _onClick() {
    this.count++;
  }

  private getSections(): Section[] {
    const b = this.bm;
    return [
      {
        label: 'Content Nodes',
        rows: [
          { name: 't()', desc: 'Simple translation', result: b.n01_t },
          {
            name: 't().value',
            desc: 'Raw string value',
            result: b.n01_t.value,
          },
          { name: 'enu() −2', desc: "count=-2 → '<-1'", result: b.n02_enu(-2) },
          { name: 'enu() 0', desc: "count=0 → '0'", result: b.n02_enu(0) },
          { name: 'enu() 1', desc: "count=1 → '1'", result: b.n02_enu(1) },
          { name: 'enu() 7', desc: "count=7 → '>5'", result: b.n02_enu(7) },
          { name: 'enu() 25', desc: "count=25 → '>19'", result: b.n02_enu(25) },
          {
            name: 'cond() true',
            desc: 'condition=true',
            result: b.n03_cond(true),
          },
          {
            name: 'cond() false',
            desc: 'condition=false',
            result: b.n03_cond(false),
          },
          {
            name: "gender() 'male'",
            desc: "gender='male'",
            result: b.n04_gender('male'),
          },
          {
            name: "gender() 'female'",
            desc: "gender='female'",
            result: b.n04_gender('female'),
          },
          {
            name: 'insert()',
            desc: "{name:'Alice', age:30}",
            result: b.n05_insert({ name: 'Alice', age: 30 }),
          },
          { name: 'md()', desc: 'Markdown string', result: b.n06_md },
          { name: 'html()', desc: 'HTML string', result: b.n07_html.use({}) },
        ],
      },
      {
        label: 'Combinations',
        rows: [
          {
            name: 'insert(t())',
            desc: "{name:'Alice', place:'Paris'}",
            result: b.n08_insert_t({ name: 'Alice', place: 'Paris' }),
          },
          {
            name: 't(md())',
            desc: 'Translation of markdown',
            result: b.n09_t_of_md,
          },
          {
            name: 'md(t())',
            desc: 'Markdown from translation',
            result: b.n10_md_t,
          },
          { name: 'enu(t()) 2', desc: 'count=2', result: b.n11_enu_t(2) },
          {
            name: 'insert(enu(t()))',
            desc: '{count:3,name:"Alice"}(3)',
            result: b.n12_insert_enu_t({ count: 3, name: 'Alice' })(3),
          },
          { name: 'cond(t()) true', desc: 'true', result: b.n13_cond_t(true) },
          {
            name: 'cond(insert(t()))',
            desc: "true · {name:'Alice'}",
            result: b.n14_cond_insert_t(true)?.({ name: 'Alice' }),
          },
          {
            name: 'gender(insert(t()))',
            desc: "female · {name:'Alice'}",
            result: b.n15_gender_insert_t('female')?.({ name: 'Alice' }),
          },
        ],
      },
      {
        label: 'Data Structures',
        rows: [
          {
            name: 'nested object',
            desc: 'obj.level1.level2',
            result: b.n17_nested_object.level1.level2,
          },
          {
            name: "array ['string']",
            desc: "['item1','item2','item3']",
            result: b.n18_array_strings,
          },
          {
            name: 'array [t()]',
            desc: 'Array of translations',
            result: b.n19_array_translations,
          },
          {
            name: 'array [{obj}]',
            desc: 'Array of {name,role}',
            result: b.n20_array_objects
              .map((o) => `${o.name.value} (${o.role.value})`)
              .join(' · '),
          },
          {
            name: "nest('app','title')",
            desc: 'Cross-dict reference',
            result: b.n21_nest,
          },
        ],
      },
      {
        label: 'Formatters',
        rows: [
          {
            name: 'useNumber()',
            desc: '123456.789',
            result: this.number.value(123456.789),
          },
          {
            name: 'usePercentage()',
            desc: '0.25',
            result: this.percentage.value(0.25),
          },
          {
            name: 'useCurrency()',
            desc: '1234.5, EUR',
            result: this.currency.value(1234.5, { currency: 'EUR' }),
          },
          {
            name: 'useDate()',
            desc: 'now, short',
            result: this.date.value(this.now, 'short'),
          },
          {
            name: 'useRelativeTime()',
            desc: 'now → +3 days',
            result: this.relativeTime.value(this.now, this.in3Days, {
              unit: 'day',
            }),
          },
          {
            name: 'useUnit()',
            desc: '5, kilometer, long',
            result: this.unit.value(5, {
              unit: 'kilometer',
              unitDisplay: 'long',
            }),
          },
          {
            name: 'useCompact()',
            desc: '1200',
            result: this.compact.value(1200),
          },
          {
            name: 'useList()',
            desc: "['apple','banana','orange']",
            result: this.list.value(['apple', 'banana', 'orange']),
          },
        ],
      },
    ];
  }

  private renderRows(rows: Row[], startIdx: number) {
    return rows.map(
      (row, i) => html`
        <tr style="background:${(startIdx + i) % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent'}">
          <td class="col-id">${startIdx + i + 1}</td>
          <td class="col-name"><code>${row.name}</code></td>
          <td class="col-desc">${row.desc}</td>
          <td class="col-result">${row.result}</td>
        </tr>
      `
    );
  }

  override render() {
    const { content } = this;
    const sections = this.getSections();
    let rowIdx = 0;

    return html`
      <section id="center">
        <div class="hero">
          <a href="https://vite.dev" target="_blank" rel="noopener">
            <img src=${viteLogo} class="logo" alt=${content.viteLogoLabel.value} />
          </a>
          <a href="https://lit.dev" target="_blank" rel="noopener">
            <img src=${litLogo} class="logo lit" alt=${content.litLogoLabel.value} />
          </a>
        </div>

        <h1>${content.title}</h1>

        <div class="card">
          <button class="counter" @click=${this._onClick} part="button">
            ${content.countIs({ count: this.count })}
          </button>
        </div>

        <div class="benchmark-wrap">
          <h2 class="benchmark-title">Intlayer Node Benchmark</h2>
          <div class="table-scroll">
            <table class="benchmark-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                ${sections.map((section) => {
                  const sectionStart = rowIdx;
                  rowIdx += section.rows.length;
                  return html`
                    <tr class="section-header">
                      <td colspan="4">${section.label}</td>
                    </tr>
                    ${this.renderRows(section.rows, sectionStart)}
                  `;
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p class="read-the-docs">${content.readTheDocs}</p>

        <div style="position: absolute; right: 20px; bottom: 20px;">
          <locale-switcher></locale-switcher>
        </div>
      </section>
    `;
  }

  static override styles = css`
    :host {
      --text: #6b6375;
      --text-h: #08060d;
      --border: #e5e4e7;
      --accent: #aa3bff;
      --accent-bg: rgba(170, 59, 255, 0.1);
      --accent-border: rgba(170, 59, 255, 0.5);
      --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
      --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
      --mono: ui-monospace, Consolas, monospace;

      font: 18px/145% var(--sans);
      letter-spacing: 0.18px;
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      color: var(--text);
    }

    .hero { display: flex; justify-content: center; gap: 2em; margin-bottom: 2em; }
    .logo { height: 6em; padding: 1.5em; will-change: filter; transition: filter 300ms; }
    .logo:hover { filter: drop-shadow(0 0 2em #646cffaa); }
    .logo.lit:hover { filter: drop-shadow(0 0 2em #324fffaa); }

    .benchmark-wrap { margin: 1.5em 0; text-align: left; }
    .benchmark-title { font-size: 1.25em; color: var(--accent); margin-bottom: 0.75em; }
    .table-scroll { overflow-x: auto; }

    .benchmark-table { width: 100%; border-collapse: collapse; font-size: 0.88em; }
    .benchmark-table th {
      padding: 8px 14px;
      background: var(--accent-bg);
      border-bottom: 2px solid var(--accent-border);
      text-align: left;
      font-weight: 600;
      white-space: nowrap;
    }
    .benchmark-table td {
      padding: 6px 14px;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
    }

    .section-header td {
      padding: 6px 14px;
      background: rgba(170, 59, 255, 0.05);
      font-weight: 700;
      font-size: 0.75em;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #888;
    }

    .col-id { width: 36px; color: #999; font-family: var(--mono); }
    .col-name { width: 200px; }
    .col-name code {
      background: var(--accent-bg);
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 0.85em;
      font-family: var(--mono);
    }
    .col-desc { width: 280px; color: #aaa; font-family: var(--mono); font-size: 0.83em; }
    .col-result { max-width: 360px; }

    .counter {
      font-family: var(--mono);
      font-size: 16px;
      display: inline-flex;
      padding: 5px 10px;
      border-radius: 5px;
      color: var(--accent);
      background: var(--accent-bg);
      border: 2px solid transparent;
      transition: border-color 0.3s;
      cursor: pointer;
    }
    .counter:hover { border-color: var(--accent-border); }

    .read-the-docs { color: #888; }
    h1 { font-family: var(--heading); font-size: 3.2em; line-height: 1.1; }
    #center { position: relative; padding: 2em; }
    .card { margin: 1em 0; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
