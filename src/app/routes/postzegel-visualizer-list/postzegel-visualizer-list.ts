import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {webSocket} from "rxjs/webSocket";
import {isWebSocketSerialEvent, WebSocket_SERIAL_EVENT, WebSocketBaseType} from "./websocket-types";
import {AsyncPipe, NgForOf} from "@angular/common";
import {map, Observable, of, startWith, Subscription} from "rxjs";
import {WebSocketService} from "../../connectors/websocket/WebSocketService";

@Component({
  selector: 'app-postzegel-visualizer',
    imports: [AsyncPipe, NgForOf],
  templateUrl: './postzegel-visualizer-list.html',
  styleUrl: './postzegel-visualizer-list.scss',
})
export class PostzegelVisualizerList implements OnDestroy, OnInit{
  tiles: string[] = []
  subscriptions = new Subscription();

  ngOnInit() {
      const tilesSubscription = this.webSocketService
          .getObservable()
          .subscribe(message => {
              if (isWebSocketSerialEvent(message)) {
                  this.tiles = [...this.tiles, message.code]
                  this.changeDetection.markForCheck()
              }
          })
      this.subscriptions.add(tilesSubscription);
  }

  ngOnDestroy() {
      this.subscriptions.unsubscribe();
  }

  constructor(
      private webSocketService: WebSocketService,
      private changeDetection: ChangeDetectorRef,
  ) {

  }
}
