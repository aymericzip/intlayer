import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { useIntlayer } from 'angular-intlayer';
import { LocaleSwitcherComponent } from './locale-switcher.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LocaleSwitcherComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-21-app');
  protected readonly content = useIntlayer('app');
}
