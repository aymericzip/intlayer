import { type ModuleWithProviders, NgModule } from '@angular/core';
import {
  provideChildTranslateService,
  provideTranslateService,
} from './providers';
import { TranslateBlockDirective } from './translateBlockDirective';
import { TranslateDirective } from './translateDirective';
import { TranslatePipe } from './translatePipe';
import type {
  ChildTranslateServiceConfig,
  RootTranslateServiceConfig,
} from './types';

@NgModule({
  imports: [TranslatePipe, TranslateDirective, TranslateBlockDirective],
  exports: [TranslatePipe, TranslateDirective, TranslateBlockDirective],
})
// biome-ignore lint/complexity/noStaticOnlyClass: Angular module pattern
export class TranslateModule {
  static forRoot(
    config: RootTranslateServiceConfig = {}
  ): ModuleWithProviders<TranslateModule> {
    return {
      ngModule: TranslateModule,
      providers: provideTranslateService(config),
    };
  }

  static forChild(
    config: ChildTranslateServiceConfig = {}
  ): ModuleWithProviders<TranslateModule> {
    return {
      ngModule: TranslateModule,
      providers: provideChildTranslateService(config),
    };
  }
}
