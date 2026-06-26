import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { useIntlayer } from 'lit-intlayer';

@customElement('qualified-content-demo')
export class QualifiedContentDemo extends LitElement {
  private faqItems = useIntlayer('faq').observe(this);
  private secondQuestion = useIntlayer('faq', { item: 2 }).observe(this);

  private defaultHero = useIntlayer('hero').observe(this);
  private promoHero = useIntlayer('hero', { variant: 'promo' }).observe(this);

  private appleWatch = useIntlayer('product', {
    variant: { id: 'apple-watch', category: 'wearables' },
  }).observe(this);
  private airpods = useIntlayer('product', {
    variant: { id: 'airpods-pro', category: 'audio' },
  }).observe(this);

  private defaultPlans = useIntlayer('pricing').observe(this);
  private promoPlans = useIntlayer('pricing', { variant: 'promo' }).observe(
    this
  );
  private promoPro = useIntlayer('pricing', {
    variant: 'promo',
    item: 2,
    locale: 'fr',
  }).observe(this);

  static override styles = css`
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
  `;

  override render() {
    return html`
      <div class="card">
        <h2 class="heading">Collections · Variants · Object Variants · Composite</h2>

        <section>
          <div class="subHeading">Collection — useIntlayer('faq')</div>
          ${this.faqItems.map(
            (entry) => html`
              <div>
                <div class="question">${entry.question.value}</div>
                <div class="answer">${entry.answer.value}</div>
              </div>
            `
          )}

          <div class="subHeading">Single item — useIntlayer('faq', { item: 2 })</div>
          <div class="question">${this.secondQuestion?.question.value}</div>
          <div class="answer">${this.secondQuestion?.answer.value}</div>
        </section>

        <section>
          <div class="subHeading">Variant (default) — useIntlayer('hero')</div>
          <div class="question">${this.defaultHero?.headline.value}</div>
          <div class="answer">${this.defaultHero?.subheadline.value}</div>

          <div class="subHeading">Variant — useIntlayer('hero', { variant: 'promo' })</div>
          <div class="question">${this.promoHero?.headline.value}</div>
          <div class="answer">${this.promoHero?.subheadline.value}</div>
        </section>

        <section>
          <div class="subHeading">Object variant — useIntlayer('product', { variant: {…} })</div>
          ${[this.appleWatch, this.airpods].map(
            (entry) => html`
              <div>
                <div class="question">${entry?.name.value} — ${entry?.price.value}</div>
                <div class="answer">${entry?.description.value}</div>
              </div>
            `
          )}
        </section>

        <section>
          <div class="subHeading">Composite (default plans) — useIntlayer('pricing')</div>
          ${this.defaultPlans.map(
            (entry) => html`
              <div class="question">${entry.plan.value} — ${entry.price.value}</div>
            `
          )}

          <div class="subHeading">Composite — useIntlayer('pricing', { variant: 'promo' })</div>
          ${this.promoPlans.map(
            (entry) => html`
              <div class="question">${entry.plan.value} — ${entry.price.value}</div>
            `
          )}

          <div class="subHeading">Composite (single) — useIntlayer('pricing', { variant: 'promo', item: 2 })</div>
          <div class="question">${this.promoPro?.plan.value} — ${this.promoPro?.price.value}</div>
        </section>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'qualified-content-demo': QualifiedContentDemo;
  }
}
