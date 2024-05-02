import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/layout/header/header.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

}
