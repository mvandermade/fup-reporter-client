import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {BehaviorSubject, map, Subscription} from "rxjs";
import {WebSocketService} from "../../connectors/websocket/WebSocketService";
import {
  isWebSocketAckExchangeEvent,
  isWebSocketPostExchangeEvent,
  isWebSocketSerialEvent
} from "../../types/websocket-types";
import {WebsocketStatusComponent} from "../../connectors/websocket/WebsocketStatusComponent";

interface TileGroup {
  groupId: string;
  tile: Tile;
}

interface Tile {
  code: string;
  style: "tile-serial-event" | "tile-posting"
}

@Component({
  selector: 'app-postzegel-visualizer',
  imports: [AsyncPipe, WebsocketStatusComponent],
  templateUrl: './postzegel-visualizer-list.html',
  styleUrl: './postzegel-visualizer-list.scss',
})
export class PostzegelVisualizerList implements OnDestroy, OnInit {
  private tilesMapSubject = new BehaviorSubject<Map<string, Tile>>(new Map());
  tileGroups$ = this.tilesMapSubject.pipe(
    map(tilesMap => {
      const groups: TileGroup[] = [];
      tilesMap.forEach((value, key) => {
        groups.push({ groupId: key, tile: value });
      });
      return groups.sort((a, b) => a.tile.style.localeCompare(b.tile.style));
    })
  );

  private subscriptions = new Subscription();

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    const tilesSubscription = this.webSocketService
      .getObservable()
      .subscribe(message => {
        console.log(message);
        if (isWebSocketSerialEvent(message)) {
          const code = message.code;
          if (code) {
            const currentMap = this.tilesMapSubject.value;
            currentMap.set(code, {code, style: "tile-serial-event"});
            this.tilesMapSubject.next(currentMap);
          }
        } else if (isWebSocketPostExchangeEvent(message)) {
          const code = message.code;
          if (code) {
            const currentMap = this.tilesMapSubject.value;
            currentMap.set(code, {code: `${code} PROCESSING`, style: "tile-posting"});
            this.tilesMapSubject.next(currentMap);
          }
        } else if (isWebSocketAckExchangeEvent(message)) {
          const code = message.code;
          if (code) {
            const currentMap = this.tilesMapSubject.value;
            currentMap.delete(code);
            this.tilesMapSubject.next(currentMap);
          }
        }
      });
    this.subscriptions.add(tilesSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}