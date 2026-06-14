<script setup lang="ts">
import { useIntlayer } from 'vue-intlayer';

const faqItems = useIntlayer('faq');
const secondQuestion = useIntlayer('faq', { item: 2 });

const defaultHero = useIntlayer('hero');
const promoHero = useIntlayer('hero', { variant: 'promo' });

const appleWatch = useIntlayer('product', {
  id: 'apple-watch',
  category: 'wearables',
});
const airpods = useIntlayer('product', {
  id: 'airpods-pro',
  category: 'audio',
});

const defaultPlans = useIntlayer('pricing');
const promoPlans = useIntlayer('pricing', { variant: 'promo' });
const promoPro = useIntlayer('pricing', {
  variant: 'promo',
  item: 2,
  locale: 'fr',
});
</script>

<template>
  <div class="card">
    <h2 class="heading">Collections · Variants · Meta Records · Composite</h2>

    <section>
      <div class="subHeading">Collection — useIntlayer('faq')</div>
      <div v-for="entry in faqItems" :key="String(entry.question)">
        <div class="question">{{ entry.question }}</div>
        <div class="answer">{{ entry.answer }}</div>
      </div>

      <div class="subHeading">
        Single item — useIntlayer('faq', { item: 2 })
      </div>
      <div class="question">{{ secondQuestion?.question }}</div>
      <div class="answer">{{ secondQuestion?.answer }}</div>
    </section>

    <section>
      <div class="subHeading">Variant (default) — useIntlayer('hero')</div>
      <div class="question">{{ defaultHero?.headline }}</div>
      <div class="answer">{{ defaultHero?.subheadline }}</div>

      <div class="subHeading">
        Variant — useIntlayer('hero', { variant: 'promo' })
      </div>
      <div class="question">{{ promoHero?.headline }}</div>
      <div class="answer">{{ promoHero?.subheadline }}</div>
    </section>

    <section>
      <div class="subHeading">
        Meta record — useIntlayer('product', { id, category })
      </div>
      <div v-for="entry in [appleWatch, airpods]" :key="String(entry?.name)">
        <div class="question">
          {{ entry?.name }} — {{ entry?.price }}
        </div>
        <div class="answer">{{ entry?.description }}</div>
      </div>
    </section>

    <section>
      <div class="subHeading">
        Composite (default plans) — useIntlayer('pricing')
      </div>
      <div
        v-for="entry in defaultPlans"
        :key="String(entry.plan)"
        class="question"
      >
        {{ entry.plan }} — {{ entry.price }}
      </div>

      <div class="subHeading">
        Composite — useIntlayer('pricing', { variant: 'promo' })
      </div>
      <div
        v-for="entry in promoPlans"
        :key="String(entry.plan)"
        class="question"
      >
        {{ entry.plan }} — {{ entry.price }}
      </div>

      <div class="subHeading">
        Composite (single) — useIntlayer('pricing', { variant: 'promo', item: 2 })
      </div>
      <div class="question">
        {{ promoPro?.plan }} — {{ promoPro?.price }}
      </div>
    </section>
  </div>
</template>

<style scoped>
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
