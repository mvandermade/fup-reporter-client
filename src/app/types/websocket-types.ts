export interface WebSocketBaseType {
    type: "SERIAL_EVENT" | "POST_EXCHANGE" | "ACK_EXCHANGE"
}

export interface WebSocket_SERIAL_EVENT extends WebSocketBaseType {
    type: "SERIAL_EVENT"
    code: string
}

export interface WebSocket_POST_EXCHANGE extends WebSocketBaseType {
    type: "POST_EXCHANGE"
    code: string
}

export interface WebSocket_ACK_EXCHANGE extends WebSocketBaseType {
    type: "ACK_EXCHANGE"
    code: string
}

export function isWebSocketSerialEvent(obj: any): obj is WebSocket_SERIAL_EVENT {
    return typeof obj === "object" && obj !== null && obj.type === "SERIAL_EVENT"
}

export function isWebSocketPostExchangeEvent(obj: any): obj is WebSocket_POST_EXCHANGE {
    return typeof obj === "object" && obj !== null && obj.type === "POST_EXCHANGE"
}

export function isWebSocketAckExchangeEvent(obj: any): obj is WebSocket_ACK_EXCHANGE {
    return typeof obj === "object" && obj !== null && obj.type === "ACK_EXCHANGE"
}