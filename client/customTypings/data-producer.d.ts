// https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataProducer

declare module "mediasoup-client" {
    // Dictionaries
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataProducer-dictionaries

    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataProducerOptions
    export interface DataProducerOptions {
        ordered?: boolean;
        maxPacketLifeTime?: number;
        maxRetransmits?: number;
        priority?: RTCPriorityType;
        label?: string;
        protocol?: string;
        appData?: any;
    }

    export interface DataProducer {
        // Properties
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataProducer-properties
        readonly id: string;
        readonly closed: boolean;
        readonly sctpStreamParameters: Readonly<SctpStreamParameters>;
        readonly readyState: Readonly<RTCDataChannelState>;
        readonly label: string;
        readonly protocol: string;
        readonly bufferedAmount: number;
        readonly bufferedAmountLowThreshold: number;
        readonly appData: any;

        // Methods
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataProducer-methods
        close(): void;
        send(data?: string | Blob | ArrayBuffer | ArrayBufferView): void;

        // Events
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataProducer-events
        on(event: "transportclose", handler: () => any): void;
    }
}
