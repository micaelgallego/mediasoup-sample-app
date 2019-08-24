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
        appData?: any;
    }

    export interface DataConsumer {
        // Properties
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataConsumer-properties
        readonly id: string;
        readonly dataProducerId: string;
        readonly closed: boolean;
        readonly sctpStreamParameters: Readonly<SctpStreamParameters>;
        readonly readyState: Readonly<RTCDataChannelState>;
        readonly label: string;
        readonly protocol: string;
        readonly binaryType: "blob" | "arrayBuffer";
        readonly appData: any;

        // Methods
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataConsumer-methods
        close(): void;

        // Events
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataConsumer-events
        on(event: "transportclose" | "open", handler: () => void): void;
        on(event: "error", handler: (error: any) => void): void;
        on(event: "message", handler: (data: string | Blob | ArrayBuffer) => void): void;
    }
}
