import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { IntlayerNodeComponent, useIntlayer } from 'angular-intlayer';
import {
  useCompact,
  useCurrency,
  useDate,
  useIntl,
  useList,
  useNumber,
  usePercentage,
  useRelativeTime,
  useUnit,
} from 'angular-intlayer/format';
import { LocaleSwitcherComponent } from '../locale-switcher.component';

@Component({
  selector: 'app-home',
  imports: [LocaleSwitcherComponent, CommonModule, IntlayerNodeComponent],
  template: `
    <app-locale-switcher></app-locale-switcher>
    <div class="content" >
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>

      <hr />

      <h2>Markdown</h2>
      <!-- Markdown is returned as a string. You might want to use a markdown parser here -->
      <div [innerHTML]="content().markdownContent"></div>

      <h2>Enumeration</h2>
      <p>0 cars: {{ content().cars(0) }}</p>
      <p>1 car: {{ content().cars(1) }}</p>
      <p>5 cars: {{ content().cars(5) }}</p>

      <h2>HTML</h2>
      <!-- Warning: Using innerHTML can be risky (XSS). Ensure content is trusted. -->
      <div [innerHTML]="content().htmlContent"></div>

      <h2>Nested</h2>
      <p>{{ content().nested.deep.text }}</p>

      <h2>Condition</h2>
      <p>True: {{ content().conditionalContent(true) }}</p>
      <p>False: {{ content().conditionalContent(false) }}</p>

      <h2>Gender</h2>
      <p>Male: {{ content().genderContent('male') }}</p>
      <p>Female: {{ content().genderContent('female') }}</p>

      <h2>Function Fetching</h2>
      <p>Sync: {{ content().functionContent }}</p>
      <p>Async: {{ content().asyncFunctionContent }}</p>

      <h2>Insertion</h2>
      <p>{{ content().insertionContent({ name: 'User', city: 'Paris' }) }}</p>

      <h2>File</h2>
      <pre>{{ content().fileContent }}</pre>

      <div
        style="display: flex; flex-direction: column; gap: 10px; margin: 20px; padding: 20px; border: 1px solid #ccc; border-radius: 8px; text-align: left;"
      >
        <h2>Formatters</h2>
        <p>Number: {{ number()(123456.789) }}</p>
        <p>Percentage: {{ percentage()(0.25) }}</p>
        <p>Currency: {{ currency()(1234.5, { currency: 'EUR' }) }}</p>
        <p>Date: {{ date()(now, 'short') }}</p>
        <p>Relative Time: {{ relativeTime()(now, in3Days, { unit: 'day' }) }}</p>
        <p>Unit: {{ unit()(5, { unit: 'kilometer', unitDisplay: 'long' }) }}</p>
        <p>Compact: {{ compact()(1200) }}</p>
        <p>List: {{ list()(['apple', 'banana', 'orange']) }}</p>
        <p>Intl (Manual): {{ formattedCurrency() }}</p>
      </div>

    </div>

    <h2>Analog</h2>

    <h3>The fullstack meta-framework for Angular!</h3>

    <p class="read-the-docs">
      <a href="https://analogjs.org" target="_blank">Docs</a> |
      <a href="https://github.com/analogjs/analog" target="_blank">GitHub</a> |
      <a href="https://github.com/sponsors/brandonroberts" target="_blank">
        Sponsor
      </a>
    </p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .read-the-docs > * {
      color: #fff;
    }

    @media (prefers-color-scheme: light) {
      .read-the-docs > * {
        color: #213547;
      }
    }
  `,
})
export default class Home {
  content = useIntlayer('app');

  number = useNumber();
  percentage = usePercentage();
  currency = useCurrency();
  date = useDate();
  relativeTime = useRelativeTime();
  unit = useUnit();
  compact = useCompact();
  list = useList();
  intl = useIntl();

  now = new Date();
  in3Days = new Date(this.now.getTime() + 3 * 864e5);

  formattedCurrency = computed(() =>
    new (this.intl().NumberFormat)({
      style: 'currency',
      currency: 'USD',
    }).format(12345.67)
  );
}
