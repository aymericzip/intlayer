import { useIntlayer } from 'vanilla-intlayer';

export const setupQualifiedContentDemo = (container: HTMLElement) => {
  let faqItems = useIntlayer('faq');
  let secondQuestion = useIntlayer('faq', { item: 2 });

  let defaultHero = useIntlayer('hero');
  let promoHero = useIntlayer('hero', { variant: 'promo' });

  let appleWatch = useIntlayer('product', {
    variant: { id: 'apple-watch', category: 'wearables' },
  });
  let airpods = useIntlayer('product', {
    variant: { id: 'airpods-pro', category: 'audio' },
  });

  let defaultPlans = useIntlayer('pricing');
  let promoPlans = useIntlayer('pricing', { variant: 'promo' });
  let promoPro = useIntlayer('pricing', {
    variant: 'promo',
    item: 2,
    locale: 'fr',
  });

  const render = () => {
    container.innerHTML = `
      <div style="padding: 20px; border: 2px solid #646cff; border-radius: 12px; margin-top: 30px; background: rgba(100, 108, 255, 0.05); text-align: left;">
        <h2 style="color: #646cff; margin-top: 0;">Collections · Variants · Object Variants · Composite</h2>

        <section>
          <div style="color: #888; font-size: 0.78em; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; margin-top: 20px;">Collection — useIntlayer('faq')</div>
          ${faqItems
            .map(
              (entry) => `
            <div>
              <div style="font-weight: 600;">${entry.question.value}</div>
              <div style="margin: 4px 0 14px; color: #aaa;">${entry.answer.value}</div>
            </div>
          `
            )
            .join('')}

          <div style="color: #888; font-size: 0.78em; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; margin-top: 20px;">Single item — useIntlayer('faq', { item: 2 })</div>
          <div style="font-weight: 600;">${secondQuestion?.question.value}</div>
          <div style="margin: 4px 0 14px; color: #aaa;">${secondQuestion?.answer.value}</div>
        </section>

        <section>
          <div style="color: #888; font-size: 0.78em; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; margin-top: 20px;">Variant (default) — useIntlayer('hero')</div>
          <div style="font-weight: 600;">${defaultHero?.headline.value}</div>
          <div style="margin: 4px 0 14px; color: #aaa;">${defaultHero?.subheadline.value}</div>

          <div style="color: #888; font-size: 0.78em; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; margin-top: 20px;">Variant — useIntlayer('hero', { variant: 'promo' })</div>
          <div style="font-weight: 600;">${promoHero?.headline.value}</div>
          <div style="margin: 4px 0 14px; color: #aaa;">${promoHero?.subheadline.value}</div>
        </section>

        <section>
          <div style="color: #888; font-size: 0.78em; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; margin-top: 20px;">Object variant — useIntlayer('product', { variant: {…} })</div>
          ${[appleWatch, airpods]
            .map(
              (entry) => `
            <div>
              <div style="font-weight: 600;">${entry?.name.value} — ${entry?.price.value}</div>
              <div style="margin: 4px 0 14px; color: #aaa;">${entry?.description.value}</div>
            </div>
          `
            )
            .join('')}
        </section>

        <section>
          <div style="color: #888; font-size: 0.78em; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; margin-top: 20px;">Composite (default plans) — useIntlayer('pricing')</div>
          ${defaultPlans
            .map(
              (entry) => `
            <div style="font-weight: 600;">${entry.plan.value} — ${entry.price.value}</div>
          `
            )
            .join('')}

          <div style="color: #888; font-size: 0.78em; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; margin-top: 20px;">Composite — useIntlayer('pricing', { variant: 'promo' })</div>
          ${promoPlans
            .map(
              (entry) => `
            <div style="font-weight: 600;">${entry.plan.value} — ${entry.price.value}</div>
          `
            )
            .join('')}

          <div style="color: #888; font-size: 0.78em; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; margin-top: 20px;">Composite (single) — useIntlayer('pricing', { variant: 'promo', item: 2 })</div>
          <div style="font-weight: 600;">${promoPro?.plan.value} — ${promoPro?.price.value}</div>
        </section>
      </div>
    `;
  };

  render();

  faqItems.onChange((newVal) => {
    faqItems = newVal as typeof faqItems;
    render();
  });
  if (secondQuestion)
    secondQuestion.onChange((newVal) => {
      secondQuestion = newVal as typeof secondQuestion;
      render();
    });
  if (defaultHero)
    defaultHero.onChange((newVal) => {
      defaultHero = newVal as typeof defaultHero;
      render();
    });
  if (promoHero)
    promoHero.onChange((newVal) => {
      promoHero = newVal as typeof promoHero;
      render();
    });
  if (appleWatch)
    appleWatch.onChange((newVal) => {
      appleWatch = newVal as typeof appleWatch;
      render();
    });
  if (airpods)
    airpods.onChange((newVal) => {
      airpods = newVal as typeof airpods;
      render();
    });
  defaultPlans.onChange((newVal) => {
    defaultPlans = newVal as typeof defaultPlans;
    render();
  });
  promoPlans.onChange((newVal) => {
    promoPlans = newVal as typeof promoPlans;
    render();
  });
  if (promoPro)
    promoPro.onChange((newVal) => {
      promoPro = newVal as typeof promoPro;
      render();
    });
};
