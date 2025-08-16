export interface WebSocketBaseType {
    type: "SERIAL_EVENT"
}

export interface WebSocket_SERIAL_EVENT {
    type: "SERIAL_EVENT"
    code: string
}

export function isWebSocketSerialEvent(obj: any): obj is WebSocket_SERIAL_EVENT {
    return typeof obj === "object" && obj !== null && "code" in obj;
}