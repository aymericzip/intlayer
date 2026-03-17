import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { useIntlayer } from 'angular-intlayer';
import { LocaleSwitcherComponent } from '../locale-switcher.component';

@Component({
  selector: 'app-home',
  imports: [LocaleSwitcherComponent, CommonModule],
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
}
