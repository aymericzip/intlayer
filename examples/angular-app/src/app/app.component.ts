import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { useIntlayer, useLocale } from 'angular-intlayer';
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
}
