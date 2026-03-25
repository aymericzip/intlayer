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
  standalone: true,
  imports: [CommonModule, RouterOutlet, LocaleSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
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
}
