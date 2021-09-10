import { AppThemeModel } from 'projects/youtube-list/src/app/core/models/app-theme.model';
import { InputDataModel } from 'projects/youtube-list/src/app/core/models/input-data.model';

import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-header',
  template: `
    <div class="responsive-container flex-header">
      <div class="logo" routerLink="/">{{ 'inmobly' }}</div>
      <div class="separator"></div>
      <button [appTheme]="userTheme" #btn="toggleIcon" class="toggle-theme-btn">
        <span class="material-icons-round"> {{ btn.toggleThemeIcon() }} </span>
      </button>
      <app-search-input
        [inputData]="searchData"
        (userInput)="searchService.userInputSubject$.next($event)"
      ></app-search-input>
    </div>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @HostBinding('class.block-header') headerClass = true;

  userTheme: AppThemeModel = isPlatformBrowser(this.platformId)
    ? <AppThemeModel>localStorage.getItem('theme')
    : 'dark';

  searchData: InputDataModel = {
    placeholder: 'search by video title',
    materialIcon: 'search',
  };

  constructor(
    public searchService: SearchService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
}
