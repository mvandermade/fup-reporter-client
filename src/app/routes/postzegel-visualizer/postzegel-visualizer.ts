import { Component } from '@angular/core';
import {webSocket} from "rxjs/webSocket";

@Component({
  selector: 'app-postzegel-visualizer',
  imports: [],
  templateUrl: './postzegel-visualizer.html',
  styleUrl: './postzegel-visualizer.scss'
})
export class PostzegelVisualizer {
  constructor() {
    const protocol = window.location.protocol.replace('http', 'ws');
    // get location host
    const host = window.location.host;
    const subject = webSocket(`${protocol}//${host}/api/hub/tracker`);

    subject.subscribe({
      next: msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
  }
}
