import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { WebSocketBaseType } from "../../types/websocket-types";
import { Observable, retry, timer, EMPTY, BehaviorSubject, Subject } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

export type WebSocketStatus = 'CONNECTED' | 'CONNECTING' | 'DISCONNECTED' | 'RECONNECTING';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private protocol = window.location.protocol.replace('http', 'ws');
    private host = window.location.host;
    private wsUrl = `${this.protocol}//${this.host}/api/hub/tracker`;
    private subject$: WebSocketSubject<WebSocketBaseType>;
    private connectionStatus = new BehaviorSubject<WebSocketStatus>('CONNECTING');
    private messagesSubject = new Subject<WebSocketBaseType>();
    private retryCount = 0;

    constructor() {
        this.subject$ = this.createWebSocketSubject();
        this.connect();
    }

    private createWebSocketSubject(): WebSocketSubject<WebSocketBaseType> {
        return webSocket<WebSocketBaseType>({
            url: this.wsUrl,
            openObserver: {
                next: () => {
                    console.log('WebSocket connection established');
                    this.connectionStatus.next('CONNECTED');
                    this.retryCount = 0;
                }
            },
            closeObserver: {
                next: () => {
                    console.log('WebSocket connection closed');
                    this.connectionStatus.next('DISCONNECTED');
                }
            }
        });
    }

    private connect() {
        this.subject$
            .pipe(
                tap({
                    error: (error) => {
                        console.log('WebSocket error:', error);
                        this.connectionStatus.next('DISCONNECTED');
                    }
                }),
                retry({
                    delay: (error, retryCount) => {
                        this.retryCount = retryCount;
                        this.connectionStatus.next('RECONNECTING');
                        console.log(`Retrying connection... Attempt ${retryCount}`);
                        
                        // Recreate the subject before next retry
                        this.subject$ = this.createWebSocketSubject();
                        
                        // Exponential backoff with a maximum of 30 seconds
                        const backoffTime = Math.min(1000 * Math.pow(2, retryCount - 1), 5000);
                        return timer(backoffTime);
                    }
                }),
                catchError(error => {
                    console.error('Unrecoverable WebSocket error:', error);
                    this.connectionStatus.next('DISCONNECTED');
                    return EMPTY;
                })
            )
            .subscribe({
                next: (msg) => this.messagesSubject.next(msg),
                error: (error) => {
                    console.error('WebSocket error in subscription:', error);
                    this.connectionStatus.next('DISCONNECTED');
                }
            });
    }

    getConnectionStatus(): Observable<WebSocketStatus> {
        return this.connectionStatus.asObservable();
    }

    getObservable(): Observable<WebSocketBaseType> {
        return this.messagesSubject.asObservable();
    }
}