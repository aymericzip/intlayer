import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { useIntlayer, useLocale } from 'angular-intlayer';
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
import { LocaleSwitcherComponent } from './locale-switcher.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, LocaleSwitcherComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  content = useIntlayer('app');
  localeCtx = useLocale();

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

  // Angular 21's template type-checker can't resolve .use() on the locale
  // union type, so these are pre-computed in the class where $any() is not
  // needed and the signal context is properly established.
  markdownStyled = computed(() =>
    (this.content().markdownContent as any).use({
      h1: { class: 'text-red-500' },
    })
  );

  htmlStyled = computed(() =>
    (this.content().htmlContent as any).use({
      strong: { class: 'text-red-500' },
    })
  );
}
