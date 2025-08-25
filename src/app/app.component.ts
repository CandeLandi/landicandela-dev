import { Component } from '@angular/core';
import { routeAnim } from './shared/motion';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeAnim]
})
export class AppComponent {
  title = 'Candela Landi';
}
