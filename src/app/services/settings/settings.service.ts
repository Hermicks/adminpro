import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  adjustments: Adjustments = {
    themeURL: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(@Inject(DOCUMENT) private document) {
    this.loadAdjustments();
  }

  saveAdjustments(): void {
    localStorage.setItem('adjustments', JSON.stringify(this.adjustments));
  }

  loadAdjustments(): void {
    const adjustmentsLS: any = localStorage.getItem('adjustments');
    if (adjustmentsLS) {
      this.adjustments = JSON.parse(adjustmentsLS);
      this.applyTheme(this.adjustments.theme);
    } else {
      this.applyTheme(this.adjustments.theme);
    }
  }

  applyTheme(tema: string): void {
    const URL = `assets/css/colors/${tema}.css`;
    this.document.getElementById('theme').setAttribute('href', URL);
    this.adjustments.theme = tema;
    this.adjustments.themeURL = URL;
    this.saveAdjustments();
  }
}

interface Adjustments {
  themeURL: string;
  theme: string;
}
