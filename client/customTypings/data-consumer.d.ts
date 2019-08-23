// DataConsumer
// https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataConsumer

declare module "mediasoup-client" {
    // Dictionaries
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataConsumer-dictionaries

    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataConsumerOptions
    export interface DataConsumerOptions {
        id: string;
        dataProducerId: string;
        sctpStreamParameters: SctpStreamParameters;
        label?: string;
        protocol?: string;
        appData?: Record<any, any>;
    }

    export interface DataConsumer {
        // Properties
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataConsumer-properties
        id: Readonly<string>;
        dataProducerId: Readonly<string>;
        closed: Readonly<boolean>;
        sctpStreamParameters: SctpStreamParameters;
        readyState: RTCDataChannelState;
        label: Readonly<string>;
        protocol: Readonly<string>;
        binaryType: Readonly<"blob" | "arrayBuffer">;
        appData: Readonly<Record<any, any>>;

        // Methods
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataConsumer-methods
        close(): void;

        // Events
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataConsumer-events
        on(event: "transportclose" | "open", cb: () => void): void;
        on(event: "error", cb: (error: any) => void): void;
        on(event: "message", cb: (data: string | Blob | ArrayBuffer) => void): void;
    }
}
