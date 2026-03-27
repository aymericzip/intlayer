<script setup lang="ts">
import { computed } from 'vue';
import { h } from 'vue';
import { useIntlayer } from 'vue-intlayer';
import {
  useCompact,
  useCurrency,
  useDate,
  useList,
  useNumber,
  usePercentage,
  useRelativeTime,
  useUnit,
} from 'vue-intlayer/format';

const { title, viteLogoLabel, vueLogoLabel, readTheDocs } = useIntlayer('app');
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

type Row = { id: number; name: string; desc: string; result: unknown };
type Section = { label: string; rows: Row[] };

const sections = computed<Section[]>(() => {
  let rowIndex = 0;
  const nextId = () => ++rowIndex;
  return [
    {
      label: 'Content Nodes',
      rows: [
        {
          id: nextId(),
          name: 't()',
          desc: 'Simple translation',
          result: content.value.n01_t,
        },
        {
          id: nextId(),
          name: 't().value',
          desc: 'Raw string value',
          result: content.value.n01_t.value,
        },
        {
          id: nextId(),
          name: 'enu() −2',
          desc: "count=-2 → '<-1'",
          result: content.value.n02_enu(-2),
        },
        {
          id: nextId(),
          name: 'enu() 0',
          desc: "count=0 → '0'",
          result: content.value.n02_enu(0),
        },
        {
          id: nextId(),
          name: 'enu() 1',
          desc: "count=1 → '1'",
          result: content.value.n02_enu(1),
        },
        {
          id: nextId(),
          name: 'enu() 7',
          desc: "count=7 → '>5'",
          result: content.value.n02_enu(7),
        },
        {
          id: nextId(),
          name: 'enu() 25',
          desc: "count=25 → '>19'",
          result: content.value.n02_enu(25),
        },
        {
          id: nextId(),
          name: 'cond() true',
          desc: 'condition=true',
          result: content.value.n03_cond(true),
        },
        {
          id: nextId(),
          name: 'cond() false',
          desc: 'condition=false',
          result: content.value.n03_cond(false),
        },
        {
          id: nextId(),
          name: "gender() 'male'",
          desc: "gender='male'",
          result: content.value.n04_gender('male'),
        },
        {
          id: nextId(),
          name: "gender() 'female'",
          desc: "gender='female'",
          result: content.value.n04_gender('female'),
        },
        {
          id: nextId(),
          name: 'insert()',
          desc: "{name:'Alice', age:30}",
          result: content.value.n05_insert({ name: 'Alice', age: 30 }),
        },
        {
          id: nextId(),
          name: 'html()',
          desc: 'HTML string',
          result: 'html' as const,
        },
      ],
    },
    {
      label: 'Combinations',
      rows: [
        {
          id: nextId(),
          name: 'insert(t())',
          desc: "{name:'Alice', place:'Paris'}",
          result: content.value.n08_insert_t({ name: 'Alice', place: 'Paris' }),
        },
        {
          id: nextId(),
          name: 'enu(t()) 2',
          desc: 'Enumeration of t(), count=2',
          result: content.value.n11_enu_t(2),
        },
        {
          id: nextId(),
          name: 'insert(enu(t()))',
          desc: '{count:3,name:"Alice"}(3)',
          result: content.value.n12_insert_enu_t({ count: 3, name: 'Alice' })(
            3
          ),
        },
        {
          id: nextId(),
          name: 'cond(t()) true',
          desc: 'Condition of t(), true',
          result: content.value.n13_cond_t(true),
        },
        {
          id: nextId(),
          name: 'cond(insert(t()))',
          desc: "true · {name:'Alice'}",
          result: content.value.n14_cond_insert_t(true)?.({ name: 'Alice' }),
        },
        {
          id: nextId(),
          name: 'gender(insert(t()))',
          desc: "female · {name:'Alice'}",
          result: content.value.n15_gender_insert_t('female')?.({
            name: 'Alice',
          }),
        },
      ],
    },
    {
      label: 'Data Structures',
      rows: [
        {
          id: nextId(),
          name: 'nested object',
          desc: 'obj.level1.level2',
          result: content.value.n17_nested_object.level1.level2,
        },
        {
          id: nextId(),
          name: "array ['string']",
          desc: "['item1','item2','item3']",
          result: content.value.n18_array_strings,
        },
        {
          id: nextId(),
          name: 'array [t()]',
          desc: 'Array of translations',
          result: content.value.n19_array_translations,
        },
        {
          id: nextId(),
          name: 'array [{obj}]',
          desc: 'Array of {name,role}',
          result: content.value.n20_array_objects
            .map((o) => `${o.name.value} (${o.role.value})`)
            .join(' · '),
        },
        {
          id: nextId(),
          name: "nest('app','title')",
          desc: 'Cross-dict reference',
          result: content.value.n21_nest,
        },
      ],
    },
    {
      label: 'Formatters',
      rows: [
        {
          id: nextId(),
          name: 'useNumber()',
          desc: '123456.789',
          result: number.value(123456.789),
        },
        {
          id: nextId(),
          name: 'usePercentage()',
          desc: '0.25',
          result: percentage.value(0.25),
        },
        {
          id: nextId(),
          name: 'useCurrency()',
          desc: '1234.5, EUR',
          result: currency.value(1234.5, { currency: 'EUR' }),
        },
        {
          id: nextId(),
          name: 'useDate()',
          desc: 'now, short',
          result: date.value(now, 'short'),
        },
        {
          id: nextId(),
          name: 'useRelativeTime()',
          desc: 'now → +3 days',
          result: relativeTime.value(now, in3Days, { unit: 'day' }),
        },
        {
          id: nextId(),
          name: 'useUnit()',
          desc: '5, kilometer, long',
          result: unit.value(5, { unit: 'kilometer', unitDisplay: 'long' }),
        },
        {
          id: nextId(),
          name: 'useCompact()',
          desc: '1200',
          result: compact.value(1200),
        },
        {
          id: nextId(),
          name: 'useList()',
          desc: "['apple','banana','orange']",
          result: list.value(['apple', 'banana', 'orange']),
        },
      ],
    },
  ];
});

const htmlRow = () =>
  content.value.n07_html.use({
    b: (props) => h('strong', { style: { color: '#42b883' } }, props.children),
  });
</script>

<template>
  <div class="app-container">
    <div class="hero">
      <div class="logos">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" class="logo" :alt="viteLogoLabel" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="/vue.svg" class="logo vue" :alt="vueLogoLabel" />
        </a>
      </div>
      <h1>{{ title }}</h1>
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
            <template v-for="section in sections" :key="section.label">
              <tr class="section-header">
                <td colspan="4">{{ section.label }}</td>
              </tr>
              <tr
                v-for="row in section.rows"
                :key="row.id"
                :class="{ even: row.id % 2 === 0 }"
              >
                <td class="col-id">{{ row.id }}</td>
                <td class="col-name"><code>{{ row.name }}</code></td>
                <td class="col-desc">{{ row.desc }}</td>
                <td class="col-result">
                  <template v-if="row.result === 'html'">
                    <component :is="htmlRow()" />
                  </template>
                  <template v-else>{{ row.result }}</template>
                </td>
              </tr>
            </template>
            <!-- Markdown rows separately because they render as components -->
            <tr class="section-header"><td colspan="4">Markdown</td></tr>
            <tr>
              <td class="col-id">—</td>
              <td class="col-name"><code>md()</code></td>
              <td class="col-desc">Markdown string</td>
              <td class="col-result markdown-cell">
                <component :is="(content.n06_md as any).use ? (content.n06_md as any).use({}) : content.n06_md" />
              </td>
            </tr>
            <tr class="even">
              <td class="col-id">—</td>
              <td class="col-name"><code>t(md())</code></td>
              <td class="col-desc">Translation of markdown</td>
              <td class="col-result markdown-cell">
                <component :is="(content.n09_t_of_md as any).use ? (content.n09_t_of_md as any).use({}) : content.n09_t_of_md" />
              </td>
            </tr>
            <tr>
              <td class="col-id">—</td>
              <td class="col-name"><code>md(t())</code></td>
              <td class="col-desc">Markdown from translation</td>
              <td class="col-result markdown-cell">
                <component :is="(content.n10_md_t as any).use ? (content.n10_md_t as any).use({}) : content.n10_md_t" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <p class="read-the-docs">{{ readTheDocs }}</p>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
.hero { margin-bottom: 2rem; }
.logos { display: flex; justify-content: center; gap: 2rem; margin-bottom: 1.5rem; }
.logo { height: 6em; padding: 1.5em; will-change: filter; transition: filter 300ms; }
.logo:hover { filter: drop-shadow(0 0 2em #646cffaa); }
.logo.vue:hover { filter: drop-shadow(0 0 2em #42b883aa); }

.benchmark-wrap { margin: 1.5rem 0; text-align: left; }
.benchmark-title { font-size: 1.25rem; color: #42b883; margin-bottom: 1rem; }
.table-scroll { overflow-x: auto; }

.benchmark-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88em;
}
.benchmark-table th {
  padding: 8px 14px;
  background: rgba(66, 184, 131, 0.15);
  border-bottom: 2px solid rgba(66, 184, 131, 0.4);
  text-align: left;
  font-weight: 600;
  white-space: nowrap;
}
.benchmark-table td {
  padding: 6px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  vertical-align: top;
}
.benchmark-table tr.even td { background: rgba(255, 255, 255, 0.025); }

.section-header td {
  padding: 6px 14px;
  background: rgba(66, 184, 131, 0.07);
  font-weight: 700;
  font-size: 0.75em;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #888;
}

.col-id { width: 36px; color: #666; font-family: monospace; }
.col-name { width: 200px; }
.col-name code {
  background: rgba(66, 184, 131, 0.12);
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 0.85em;
}
.col-desc { width: 280px; color: #aaa; font-family: monospace; font-size: 0.83em; }
.col-result { max-width: 360px; }
.markdown-cell { font-size: 0.82em; line-height: 1.4; }

.read-the-docs { color: #888; margin-top: 2rem; }
</style>
