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
  // get theme as user required or init it as dark
  @Input() appTheme: AppThemeModel = 'dark';
  private get isDarkTheme(): boolean {
    return this.appTheme === 'dark';
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

  toggleThemeIcon(): string {
    return this.isDarkTheme ? 'dark_mode' : 'light_mode';
  }

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
