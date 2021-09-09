import { RouterModule } from '@angular/router';
import { LoadingBarModule } from './../loading-bar/loading-bar.module';
import { ModuleLoadedOnceGuard } from 'projects/youtube-list/src/app/core/guards/module-loaded-once.guard';
import { SearchInputModule } from 'projects/youtube-list/src/app/search-input/search-input.module';

import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { AppThemeDirective } from './directives/app-theme.directive';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent, AppThemeDirective],
  imports: [SearchInputModule, LoadingBarModule, RouterModule],
  exports: [HeaderComponent, LoadingBarModule],
})
// this approach was used before implementing `providedIn: 'root'` to keep singletons
// it is useful also in many cases like implement forChild
// it used here for code splitting and make it clear this is required once for the whole app
export class CoreModule extends ModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
