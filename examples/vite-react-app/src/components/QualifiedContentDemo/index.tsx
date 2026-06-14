import type { CSSProperties, FC } from 'react';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { locale } from 'react-intlayer/server';

/**
 * Demonstrates the three qualifier dimensions resolved at runtime from a
 * selector passed as the second argument of `useIntlayer`:
 *
 * - **Collections** — `useIntlayer('faq')` returns every item as an ordered
 *   array; `useIntlayer('faq', { item })` returns a single item.
 * - **Variants** — `useIntlayer('hero', { variant })` picks a named shape,
 *   defaulting to the `default` variant.
 * - **Meta records** — `useIntlayer('product', { id, ...meta })` resolves a
 *   build-time record keyed by `meta.id`.
 * - **Composite** — a single key (`pricing`) stacks two dimensions
 *   (variant × item): `{ variant }` returns every item of that variant as an
 *   array, and adding `{ item }` narrows to one.
 *
 * In this example the dictionaries are built in `importMode: 'dynamic'`, so
 * only the chunk(s) each selector targets are fetched lazily — hence the
 * `Suspense` boundary.
 */

const card: CSSProperties = {
  padding: '20px',
  border: '2px solid #646cff',
  borderRadius: '12px',
  marginTop: '30px',
  background: 'rgba(100, 108, 255, 0.05)',
  textAlign: 'left',
};

const heading: CSSProperties = { color: '#646cff', marginTop: 0 };

const subHeading: CSSProperties = {
  color: '#888',
  fontSize: '0.78em',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: 6,
};

const question: CSSProperties = { fontWeight: 600 };

const answer: CSSProperties = { margin: '4px 0 14px', color: '#aaa' };

const FaqCollection: FC = () => {
  // No selector → ordered array of every collection item.
  const faqItems = useIntlayer('faq');
  // `{ item }` selector → a single collection item.
  const secondQuestion = useIntlayer('faq', { item: 2 });

  return (
    <section>
      <div style={subHeading}>Collection — useIntlayer('faq')</div>
      {faqItems.map((entry) => (
        <div key={String(entry.question)}>
          <div style={question}>{entry.question}</div>
          <div style={answer}>{entry.answer}</div>
        </div>
      ))}

      <div style={subHeading}>
        Single item — useIntlayer('faq', {'{ item: 2 }'})
      </div>
      <div style={question}>{secondQuestion?.question}</div>
      <div style={answer}>{secondQuestion?.answer}</div>
    </section>
  );
};

const HeroVariants: FC = () => {
  // No selector → the `default` variant.
  const defaultHero = useIntlayer('hero');
  // `{ variant }` selector → a named variant.
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

const ProductRecords: FC = () => {
  // Meta record selectors keyed by `meta.id`; every declared meta field must
  // match for the record to resolve.
  const appleWatch = useIntlayer('product', {
    id: 'apple-watch',
    category: 'wearables',
  });
  const airpods = useIntlayer('product', {
    id: 'airpods-pro',
    category: 'audio',
  });

  return (
    <section>
      <div style={subHeading}>
        Meta record — useIntlayer('product', {'{ id, category }'})
      </div>
      {[appleWatch, airpods].map((entry) => (
        <div key={String(entry?.name)}>
          <div style={question}>
            {entry?.name} — {entry?.price}
          </div>
          <div style={answer}>{entry?.description}</div>
        </div>
      ))}
    </section>
  );
};

const PricingComposite: FC = () => {
  // Composite key: variant × item on one key.
  // No item selected → every item of the (default) variant, as an array.
  const defaultPlans = useIntlayer('pricing');
  // Variant selected, item open → every promo item, as an array.
  const promoPlans = useIntlayer('pricing', { variant: 'promo' });
  // Both dimensions selected → a single entry.
  const promoPro = useIntlayer('pricing', {
    variant: 'promo',
    locale: 'es',
    item: 2,
  });

  return (
    <section>
      <div style={subHeading}>
        Composite (default plans) — useIntlayer('pricing')
      </div>
      {defaultPlans.map((entry) => (
        <div key={String(entry.plan)} style={question}>
          {entry.plan} — {entry.price}
        </div>
      ))}

      <div style={subHeading}>
        Composite — useIntlayer('pricing', {"{ variant: 'promo' }"})
      </div>
      {promoPlans.map((entry) => (
        <div key={String(entry.plan)} style={question}>
          {entry.plan} — {entry.price}
        </div>
      ))}

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

export const QualifiedContentDemo: FC = () => (
  <div style={card}>
    <h2 style={heading}>Collections · Variants · Meta Records · Composite</h2>
    <Suspense fallback={<p>Loading qualified content…</p>}>
      <FaqCollection />
      <HeroVariants />
      <ProductRecords />
      <PricingComposite />
    </Suspense>
  </div>
);
