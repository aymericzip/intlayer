<script lang="ts">
  import { useIntlayer } from 'svelte-intlayer';
  import {
    useCompact,
    useCurrency,
    useDate,
    useList,
    useNumber,
    usePercentage,
    useRelativeTime,
    useUnit,
  } from 'svelte-intlayer/format';
  import { MarkdownProvider } from 'svelte-intlayer/markdown';
  import LocaleSwitcher from './lib/LocaleSwitcher.svelte';
  import svelteLogo from './assets/svelte.svg';

  let count = $state(0);
  const app = useIntlayer('app');
  const bm = useIntlayer('benchmark');

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

  const getSections = (): Section[] => {
    let id = 0;
    const r = (name: string, desc: string, result: unknown): Row => ({ id: ++id, name, desc, result });
    return [
      {
        label: 'Content Nodes',
        rows: [
          r('t()', 'Simple translation', $bm.n01_t),
          r('enu() −2', "count=-2 → '<-1'", $bm.n02_enu(-2)),
          r('enu() 0', "count=0 → '0'", $bm.n02_enu(0)),
          r('enu() 1', "count=1 → '1'", $bm.n02_enu(1)),
          r('enu() 7', "count=7 → '>5'", $bm.n02_enu(7)),
          r('enu() 25', "count=25 → '>19'", $bm.n02_enu(25)),
          r('cond() true', 'condition=true', $bm.n03_cond(true)),
          r('cond() false', 'condition=false', $bm.n03_cond(false)),
          r("gender() 'male'", "gender='male'", $bm.n04_gender('male')),
          r("gender() 'female'", "gender='female'", $bm.n04_gender('female')),
          r('insert()', "{name:'Alice', age:30}", $bm.n05_insert({ name: 'Alice', age: 30 })),
          r('md()', 'Markdown string', 'md' as const),
          r('html()', 'HTML string', 'html' as const),
        ],
      },
      {
        label: 'Combinations',
        rows: [
          r('insert(t())', "{name:'Alice', place:'Paris'}", $bm.n08_insert_t({ name: 'Alice', place: 'Paris' })),
          r('t(md())', 'Translation of markdown', 'n09_t_of_md' as const),
          r('md(t())', 'Markdown from translation', 'n10_md_t' as const),
          r('enu(t()) 2', 'count=2', $bm.n11_enu_t(2)),
          r('insert(enu(t()))', '{count:3,name:"Alice"}(3)', $bm.n12_insert_enu_t({ count: 3, name: 'Alice' })(3)),
          r('cond(t()) true', 'true', $bm.n13_cond_t(true)),
          r('cond(insert(t()))', "true · {name:'Alice'}", $bm.n14_cond_insert_t(true)?.({ name: 'Alice' })),
          r('gender(insert(t()))', "female · {name:'Alice'}", $bm.n15_gender_insert_t('female')?.({ name: 'Alice' })),
        ],
      },
      {
        label: 'Data Structures',
        rows: [
          r('nested object', 'obj.level1.level2', $bm.n17_nested_object.level1.level2),
          r("array ['string']", "['item1','item2','item3']", ($bm.n18_array_strings as string[]).join(', ')),
          r('array [t()]', 'Array of translations', $bm.n19_array_translations),
          r('array [{obj}]', 'Array of {name,role}', $bm.n20_array_objects.map((o) => `${o.name} (${o.role})`).join(' · ')),
          r("nest('app','title')", 'Cross-dict reference', $bm.n21_nest),
        ],
      },
      {
        label: 'Formatters',
        rows: [
          r('useNumber()', '123456.789', $number(123456.789)),
          r('usePercentage()', '0.25', $percentage(0.25)),
          r('useCurrency()', '1234.5, EUR', $currency(1234.5, { currency: 'EUR' })),
          r('useDate()', 'now, short', $date(now, 'short')),
          r('useRelativeTime()', 'now → +3 days', $relativeTime(now, in3Days, { unit: 'day' })),
          r('useUnit()', '5, kilometer, long', $unit(5, { unit: 'kilometer', unitDisplay: 'long' })),
          r('useCompact()', '1200', $compact(1200)),
          r('useList()', "['apple','banana','orange']", $list(['apple', 'banana', 'orange'])),
        ],
      },
    ];
  };

  let sections = $derived(getSections());
</script>

<MarkdownProvider>
  <main>
    <div class="locale-switcher-container">
      <LocaleSwitcher />
    </div>

    <div>
      <a href="https://vitejs.dev" target="_blank" rel="noopener">
        <img src="/vite.svg" class="logo" alt={$app.viteLogoLabel} />
      </a>
      <a href="https://svelte.dev" target="_blank" rel="noopener">
        <img src={svelteLogo} class="logo svelte" alt={$app.svelteLogoLabel} />
      </a>
    </div>

    <h1>{$app.title}</h1>

    <div class="card">
      <button onclick={() => count++}>
        {$app.countIs({ count })}
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
            {#each sections as section}
              <tr class="section-header">
                <td colspan="4">{section.label}</td>
              </tr>
              {#each section.rows as row}
                <tr class:even={row.id % 2 === 0}>
                  <td class="col-id">{row.id}</td>
                  <td class="col-name"><code>{row.name}</code></td>
                  <td class="col-desc">{row.desc}</td>
                  <td class="col-result">
                    {#if row.result === 'md'}
                      <div class="md-preview"><svelte:component this={$bm.n06_md} /></div>
                    {:else if row.result === 'html'}
                      {@html String($bm.n07_html)}
                    {:else if row.result === 'n09_t_of_md'}
                      <div class="md-preview"><svelte:component this={$bm.n09_t_of_md} /></div>
                    {:else if row.result === 'n10_md_t'}
                      <div class="md-preview"><svelte:component this={$bm.n10_md_t} /></div>
                    {:else}
                      {row.result}
                    {/if}
                  </td>
                </tr>
              {/each}
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <p class="read-the-docs">{$app.readTheDocs}</p>
  </main>
</MarkdownProvider>

<style>
  main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    position: relative;
  }
  .locale-switcher-container {
    position: absolute;
    top: 1em;
    right: 1em;
  }
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover { filter: drop-shadow(0 0 2em #646cffaa); }
  .logo.svelte:hover { filter: drop-shadow(0 0 2em #ff3e00aa); }

  .benchmark-wrap { margin: 1.5rem 0; text-align: left; }
  .benchmark-title { font-size: 1.25rem; color: #ff3e00; margin-bottom: 1rem; }
  .table-scroll { overflow-x: auto; }

  .benchmark-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.88em;
  }
  .benchmark-table th {
    padding: 8px 14px;
    background: rgba(255, 62, 0, 0.15);
    border-bottom: 2px solid rgba(255, 62, 0, 0.4);
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
    background: rgba(255, 62, 0, 0.07);
    font-weight: 700;
    font-size: 0.75em;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #888;
  }

  .col-id { width: 36px; color: #666; font-family: monospace; }
  .col-name { width: 200px; }
  .col-name code {
    background: rgba(255, 62, 0, 0.12);
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 0.85em;
  }
  .col-desc { width: 280px; color: #aaa; font-family: monospace; font-size: 0.83em; }
  .col-result { max-width: 360px; }
  .md-preview { font-size: 0.82em; line-height: 1.4; }

  .read-the-docs { color: #888; margin-top: 2rem; }
  .card { margin: 1rem 0; }
</style>
