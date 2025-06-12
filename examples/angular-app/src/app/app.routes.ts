import { Routes } from '@angular/router';
import { configuration, localeFlatMap } from 'intlayer';
import { HomeComponent } from './pages/home.component';
import { RootComponent } from './pages/root.component';

const { defaultLocale } = configuration.internationalization;

export const routes: Routes = [
  ...localeFlatMap(
    (localizedData): Routes => [
      {
        path: `${localizedData.urlPrefix}`,
        component: RootComponent,
        data: { locale: localizedData.locale },
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
          },
          {
            path: 'home',
            component: HomeComponent,
            data: { locale: localizedData.locale },
          },
        ],
      },
    ]
  ),
  { path: '**', redirectTo: `/${defaultLocale}/home` },
];
