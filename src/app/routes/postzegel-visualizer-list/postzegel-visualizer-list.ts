import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {BehaviorSubject, Subscription} from "rxjs";
import {WebSocketService} from "../../connectors/websocket/WebSocketService";
import {isWebSocketSerialEvent} from "./websocket-types";

@Component({
  selector: 'app-postzegel-visualizer',
  imports: [AsyncPipe],
  templateUrl: './postzegel-visualizer-list.html',
  styleUrl: './postzegel-visualizer-list.scss',
})
export class PostzegelVisualizerList implements OnDestroy, OnInit {
  private tilesSubject = new BehaviorSubject<string[]>([]);
  tiles$ = this.tilesSubject.asObservable();
  
  private subscriptions = new Subscription();

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    const tilesSubscription = this.webSocketService
      .getObservable()
      .subscribe(message => {
        if (isWebSocketSerialEvent(message)) {
          const currentTiles = this.tilesSubject.value;
          this.tilesSubject.next([...currentTiles, message.code]);
        }
      });
    this.subscriptions.add(tilesSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}