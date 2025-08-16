import {Injectable} from "@angular/core";
import {webSocket} from "rxjs/webSocket";
import {WebSocketBaseType} from "../../routes/postzegel-visualizer-list/websocket-types";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private protocol = window.location.protocol.replace('http', 'ws');
    // get location host
    private host = window.location.host;
    private subject = webSocket<WebSocketBaseType>(`${this.protocol}//${this.host}/api/hub/tracker`);

    getObservable(): Observable<WebSocketBaseType> {
        return this.subject.asObservable();
    }
}