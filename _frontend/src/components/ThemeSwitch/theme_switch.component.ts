import { Component, HostBinding, Input, OnInit } from '@angular/core';

export enum Theme { Light = 0, Dark = 1 };

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme_switch.component.html',
  styleUrls: ['./theme_switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {
  @Input() theme: Theme = Theme.Light;
  public theme2: any = 'false';

  constructor() { }

  ngOnInit(): void {
    this.setDarkTheme(this.theme);
  }

  handleThemeChange() {
    this.setDarkTheme(this.theme2);
  }
  setDarkTheme(_isDark: any) {
    let bodyElem = document.getElementsByTagName('body')[0];
    // console.log(bodyElem);

    if (_isDark === true || _isDark == 'true') bodyElem.className = 'dark-theme';
    else bodyElem.className = '';
  }
}
