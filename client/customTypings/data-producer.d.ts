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
        appData?: Record<any, any>;
    }

    export interface DataProducer {
        // Properties
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataProducer-properties
        id: Readonly<string>;
        closed: Readonly<boolean>;
        sctpStreamParameters: Readonly<SctpStreamParameters>;
        readyState: Readonly<RTCDataChannelState>;
        label: Readonly<string>;
        protocol: Readonly<string>;
        bufferedAmount: Readonly<number>;
        bufferedAmountLowThreshold: Readonly<number>;
        appData: Readonly<Record<any, any>>;

        // Methods
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataProducer-methods
        close(): void;
        send(data?: string | Blob | ArrayBuffer | ArrayBufferView): void;

        // Events
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DataProducer-events
        on(event: "transportclose", cb: () => any): void;
    }
}
