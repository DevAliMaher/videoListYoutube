import {
  Directive,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

import { AppThemeModel } from '../models/app-theme.model';

@Directive({
  selector: '[appTheme]',
  exportAs: 'toggleIcon',
})
export class AppThemeDirective implements OnInit {
  @Input() appTheme: AppThemeModel = 'dark';
  private mainHTML = document.documentElement;
  private get isDarkTheme(): boolean {
    return this.mainHTML.classList.contains('dark');
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setAppTheme(this.appTheme);
  }

  @HostListener('click') toggleTheme() {
    const newTheme: AppThemeModel = this.isDarkTheme ? 'light' : 'dark';
    this.setAppTheme(newTheme, this.isDarkTheme);
  }

  toggleThemeIcon(): string {
    return this.isDarkTheme ? 'dark_mode' : 'light_mode';
  }

  private setAppTheme(themeClass: AppThemeModel, isDark?: boolean): void {
    localStorage.setItem('theme', themeClass);
    isDark
      ? this.renderer.removeAttribute(this.mainHTML, 'class')
      : this.renderer.addClass(this.mainHTML, themeClass);
  }
}
