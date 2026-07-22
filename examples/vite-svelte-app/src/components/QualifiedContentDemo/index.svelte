<script lang="ts">
import { useIntlayer } from 'svelte-intlayer';

// Collection
const faqItems = useIntlayer('faq');
const secondQuestion = useIntlayer('faq', { item: '2' });

// Variants
const defaultHero = useIntlayer('hero');
const promoHero = useIntlayer('hero', { variant: 'promo' });

// Object variants
const appleWatch = useIntlayer('product', {
  variant: { id: 'apple-watch', category: 'wearables' },
});
const airpods = useIntlayer('product', {
  variant: { id: 'airpods-pro', category: 'audio' },
});

// Composite
const defaultPlans = useIntlayer('pricing');
const promoPlans = useIntlayer('pricing', { variant: 'promo' });
const promoPro = useIntlayer('pricing', {
  variant: 'promo',
  locale: 'es',
  item: '2',
});
</script>

<div class="card">
  <h2 class="heading">Collections · Variants · Object Variants · Composite</h2>

  <section>
    <div class="subHeading">Collection — useIntlayer('faq')</div>
    {#each $faqItems as entry}
      <div>
        <div class="question">{entry.question}</div>
        <div class="answer">{entry.answer}</div>
      </div>
    {/each}

    <div class="subHeading">Single item — useIntlayer('faq', {'{ item: 2 }'})</div>
    <div class="question">{$secondQuestion?.question}</div>
    <div class="answer">{$secondQuestion?.answer}</div>
  </section>

  <section>
    <div class="subHeading">Variant (default) — useIntlayer('hero')</div>
    <div class="question">{$defaultHero?.headline}</div>
    <div class="answer">{$defaultHero?.subheadline}</div>

    <div class="subHeading">Variant — useIntlayer('hero', {"{ variant: 'promo' }"})</div>
    <div class="question">{$promoHero?.headline}</div>
    <div class="answer">{$promoHero?.subheadline}</div>
  </section>

  <section>
    <div class="subHeading">Object variant — useIntlayer('product', {'{ variant: {…} }'})</div>
    {#each [$appleWatch, $airpods] as entry}
      {#if entry}
        <div>
          <div class="question">
            {entry.name} — {entry.price}
          </div>
          <div class="answer">{entry.description}</div>
        </div>
      {/if}
    {/each}
  </section>

  <section>
    <div class="subHeading">Composite (default plans) — useIntlayer('pricing')</div>
    {#each $defaultPlans as entry}
      <div class="question">
        {entry.plan} — {entry.price}
      </div>
    {/each}

    <div class="subHeading">Composite — useIntlayer('pricing', {"{ variant: 'promo' }"})</div>
    {#each $promoPlans as entry}
      <div class="question">
        {entry.plan} — {entry.price}
      </div>
    {/each}

    <div class="subHeading">
      Composite (single) — useIntlayer('pricing', {"{ variant: 'promo', item: 2 }"})
    </div>
    <div class="question">
      {$promoPro?.plan} — {$promoPro?.price}
    </div>
  </section>
</div>

<style>
  .card {
    padding: 20px;
    border: 2px solid #646cff;
    border-radius: 12px;
    margin-top: 30px;
    background: rgba(100, 108, 255, 0.05);
    text-align: left;
  }
  .heading {
    color: #646cff;
    margin-top: 0;
  }
  .subHeading {
    color: #888;
    font-size: 0.78em;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 6px;
    margin-top: 20px;
  }
  .question {
    font-weight: 600;
  }
  .answer {
    margin: 4px 0 14px;
    color: #aaa;
  }
</style>
