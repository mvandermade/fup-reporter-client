import {Component, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = signal('made-funicular-postzegel-reporter-client');
  isClicked = signal(false)

  constructor() {
    this.title.set("Reporter monitor")
  }

  onClick(event: Event) {
    this.isClicked.set(true)
  }
}
