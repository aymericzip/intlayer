import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { useIntlayer } from 'angular-intlayer';
import {
  useCompact,
  useCurrency,
  useDate,
  useList,
  useNumber,
  usePercentage,
  useRelativeTime,
  useUnit,
} from 'angular-intlayer/format';
import { LocaleSwitcherComponent } from './locale-switcher.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LocaleSwitcherComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  content = useIntlayer('app');

  number = useNumber();
  percentage = usePercentage();
  currency = useCurrency();
  date = useDate();
  relativeTime = useRelativeTime();
  unit = useUnit();
  compact = useCompact();
  list = useList();

  now = new Date();
  in3Days = new Date(this.now.getTime() + 3 * 864e5);
}
