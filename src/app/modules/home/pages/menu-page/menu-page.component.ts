import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/layout/header/header.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [HeaderComponent, MenuListComponent],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
})
export class MenuPageComponent {}
