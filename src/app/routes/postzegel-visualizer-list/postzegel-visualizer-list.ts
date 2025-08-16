import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {BehaviorSubject, map, Subscription} from "rxjs";
import {WebSocketService} from "../../connectors/websocket/WebSocketService";
import {isWebSocketSerialEvent} from "./websocket-types";

interface TileGroup {
  groupId: string;
  value: string;
}

@Component({
  selector: 'app-postzegel-visualizer',
  imports: [AsyncPipe, NgForOf],
  templateUrl: './postzegel-visualizer-list.html',
  styleUrl: './postzegel-visualizer-list.scss',
})
export class PostzegelVisualizerList implements OnDestroy, OnInit {
  private tilesMapSubject = new BehaviorSubject<Map<string, string>>(new Map());
  tileGroups$ = this.tilesMapSubject.pipe(
    map(tilesMap => {
      const groups: TileGroup[] = [];
      tilesMap.forEach((value, key) => {
        groups.push({ groupId: key, value });
      });
      return groups.sort((a, b) => a.groupId.localeCompare(b.groupId));
    })
  );

  private subscriptions = new Subscription();

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    const tilesSubscription = this.webSocketService
      .getObservable()
      .subscribe(message => {
        if (isWebSocketSerialEvent(message)) {
          const code = message.code;
          const groupId = this.extractGroupId(code);
          if (groupId) {
            const currentMap = new Map(this.tilesMapSubject.value);
            currentMap.set(groupId, code);
            this.tilesMapSubject.next(currentMap);
          }
        }
      });
    this.subscriptions.add(tilesSubscription);
  }

  private extractGroupId(code: string): string | null {
    const match = code.match(/^(\d+)/);
    return match ? match[1] : null;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}