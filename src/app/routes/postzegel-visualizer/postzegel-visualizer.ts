import { Component } from '@angular/core';
import {webSocket} from "rxjs/webSocket";
import {isWebSocketSerialEvent, WebSocketBaseType} from "./websocket-types";
import {AsyncPipe} from "@angular/common";
import {map, Observable, of, startWith} from "rxjs";

@Component({
  selector: 'app-postzegel-visualizer',
  imports: [AsyncPipe],
  templateUrl: './postzegel-visualizer.html',
  styleUrl: './postzegel-visualizer.scss'
})
export class PostzegelVisualizer {
  indicator: Observable<string>

  constructor() {
    const protocol = window.location.protocol.replace('http', 'ws');
    // get location host
    const host = window.location.host;
    const subject = webSocket<WebSocketBaseType>(`${protocol}//${host}/api/hub/tracker`);

    this.indicator = subject.pipe(
        map(message => {
          if (isWebSocketSerialEvent(message)) {
            return message.code
          } else {
            return ""
          }
        }),
        startWith("Waiting...")
    )
  }
}
