import { useIntlayer } from 'solid-intlayer';
import { For, Suspense } from 'solid-js';

const card = {
  padding: '20px',
  border: '2px solid #646cff',
  'border-radius': '12px',
  'margin-top': '30px',
  background: 'rgba(100, 108, 255, 0.05)',
  'text-align': 'left',
};

const heading = { color: '#646cff', 'margin-top': '0px' };

const subHeading = {
  color: '#888',
  'font-size': '0.78em',
  'letter-spacing': '0.08em',
  'text-transform': 'uppercase',
  'margin-bottom': '6px',
};

const question = { 'font-weight': 600 };

const answer = { margin: '4px 0 14px', color: '#aaa' };

const FaqCollection = () => {
  const faqItems = useIntlayer('faq');
  const secondQuestion = useIntlayer('faq', { item: 2 });

  return (
    <section>
      <div style={subHeading}>Collection — useIntlayer('faq')</div>
      <For each={faqItems as any[]}>
        {(entry) => (
          <div>
            <div style={question}>{entry.question}</div>
            <div style={answer}>{entry.answer}</div>
          </div>
        )}
      </For>

      <div style={subHeading}>
        Single item — useIntlayer('faq', {'{ item: 2 }'})
      </div>
      <div style={question}>{secondQuestion?.question}</div>
      <div style={answer}>{secondQuestion?.answer}</div>
    </section>
  );
};

const HeroVariants = () => {
  const defaultHero = useIntlayer('hero');
  const promoHero = useIntlayer('hero', { variant: 'promo' });

  return (
    <section>
      <div style={subHeading}>Variant (default) — useIntlayer('hero')</div>
      <div style={question}>{defaultHero?.headline}</div>
      <div style={answer}>{defaultHero?.subheadline}</div>

      <div style={subHeading}>
        Variant — useIntlayer('hero', {"{ variant: 'promo' }"})
      </div>
      <div style={question}>{promoHero?.headline}</div>
      <div style={answer}>{promoHero?.subheadline}</div>
    </section>
  );
};

const ProductRecords = () => {
  const appleWatch = useIntlayer('product', {
    variant: { id: 'apple-watch', category: 'wearables' },
  });
  const airpods = useIntlayer('product', {
    variant: { id: 'airpods-pro', category: 'audio' },
  });

  return (
    <section>
      <div style={subHeading}>
        Object variant — useIntlayer('product', {'{ variant: {…} }'})
      </div>
      <For each={[appleWatch, airpods]}>
        {(entry) => (
          <div>
            <div style={question}>
              {entry?.name} — {entry?.price}
            </div>
            <div style={answer}>{entry?.description}</div>
          </div>
        )}
      </For>
    </section>
  );
};

const PricingComposite = () => {
  const defaultPlans = useIntlayer('pricing');
  const promoPlans = useIntlayer('pricing', { variant: 'promo' });
  const promoPro = useIntlayer('pricing', {
    variant: 'promo',
    item: 2,
    locale: 'fr',
  });

  return (
    <section>
      <div style={subHeading}>
        Composite (default plans) — useIntlayer('pricing')
      </div>
      <For each={defaultPlans as any[]}>
        {(entry) => (
          <div style={question}>
            {entry.plan} — {entry.price}
          </div>
        )}
      </For>

      <div style={subHeading}>
        Composite — useIntlayer('pricing', {"{ variant: 'promo' }"})
      </div>
      <For each={promoPlans as any[]}>
        {(entry) => (
          <div style={question}>
            {entry.plan} — {entry.price}
          </div>
        )}
      </For>

      <div style={subHeading}>
        Composite (single) — useIntlayer('pricing',{' '}
        {"{ variant: 'promo', item: 2 }"})
      </div>
      <div style={question}>
        {promoPro?.plan} — {promoPro?.price}
      </div>
    </section>
  );
};

export const QualifiedContentDemo = () => (
  <div style={card as any}>
    <h2 style={heading}>
      Collections · Variants · Object Variants · Composite
    </h2>
    <Suspense fallback={<p>Loading qualified content…</p>}>
      <FaqCollection />
      <HeroVariants />
      <ProductRecords />
      <PricingComposite />
    </Suspense>
  </div>
);
