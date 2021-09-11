import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  HostListener,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';

import { AppThemeModel } from '../models/app-theme.model';

@Directive({
  selector: '[appTheme]',
  exportAs: 'toggleIcon',
})
export class AppThemeDirective implements OnInit {
  // get theme as developer required on usage or init it as dark
  @Input() appTheme: AppThemeModel = 'dark';
  private get isDarkTheme(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  }

  @HostListener('click') toggleTheme() {
    const newTheme: AppThemeModel = this.isDarkTheme ? 'light' : 'dark';
    this.setAppTheme(newTheme, this.isDarkTheme);
  }

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.setAppTheme(this.appTheme);
  }

  // return material icon for each theme ,, used by exportAs
  toggleThemeIcon(): string {
    return this.isDarkTheme ? 'dark_mode' : 'light_mode';
  }

  // set new theme and save it in local storage
  private setAppTheme(themeClass: AppThemeModel, isDark?: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', themeClass);
      const htmlEl = document.documentElement;
      isDark
        ? this.renderer.removeAttribute(htmlEl, 'class')
        : this.renderer.addClass(htmlEl, themeClass);
    }
  }
}
