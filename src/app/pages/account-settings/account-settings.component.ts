import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public settingsService: SettingsService
    ) { }

  ngOnInit() {
    this.applyCheckWhenRefresh();
  }

  changeTheme(tema: string, link: any): void {
    this.applyCheck(link);
    this.settingsService.applyTheme(tema);
  }

  applyCheck(link: any): void {
    this.removeCheck();
    link.classList.add('working');
  }

  applyCheckWhenRefresh(): void {
    this.removeCheck();
    const selectors: any = this.getSelectorElements();
    const theme: string = this.settingsService.adjustments.theme;
    for (const ref of selectors) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
      }
    }
  }

  getSelectorElements(): any {
    return document.getElementsByClassName('selector');
  }

  removeCheck(): void {
    const selectors: any = this.getSelectorElements();
    for (const ref of selectors) {
      ref.classList.remove('working');
    }
  }

}
