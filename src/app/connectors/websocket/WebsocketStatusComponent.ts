import { Component } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { WebSocketService, WebSocketStatus } from './WebSocketService';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-websocket-status',
    standalone: true,
    imports: [AsyncPipe, NgClass],
    template: `
        <div class="websocket-status" [ngClass]="status$ | async">
            <span class="status-indicator"></span>
            <span class="status-text">{{ (status$ | async) }}</span>
        </div>
    `,
    styles: [`
        .websocket-status {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px;
            border-radius: 4px;
            font-size: 14px;
        }

        .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }

        .CONNECTED {
            background-color: rgba(0, 255, 0, 0.1);
            .status-indicator {
                background-color: #00ff00;
            }
        }

        .CONNECTING {
            background-color: rgba(255, 166, 0, 0.1);
            .status-indicator {
                background-color: #ffa600;
            }
        }

        .DISCONNECTED {
            background-color: rgba(255, 0, 0, 0.1);
            .status-indicator {
                background-color: #ff0000;
            }
        }

        .RECONNECTING {
            background-color: rgba(255, 166, 0, 0.1);
            .status-indicator {
                background-color: #ffa600;
                animation: blink 1s infinite;
            }
        }

        @keyframes blink {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `]
})
export class WebsocketStatusComponent {
    status$: Observable<WebSocketStatus>;

    constructor(private webSocketService: WebSocketService) {
        this.status$ = this.webSocketService.getConnectionStatus();
    }
}