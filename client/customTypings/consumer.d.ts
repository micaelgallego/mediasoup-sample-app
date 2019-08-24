// https://mediasoup.org/documentation/v3/mediasoup-client/api/#Consumer

declare module "mediasoup-client" {
    // Dictionaries
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Consumer-dictionaries

    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ConsumerOptions
    export interface ConsumerOptions {
        id: string;
        producerId: string;
        kind: "audio" | "video";
        rtpParameters: RtpReceiveParameters;
        appData?: any;
    }

    export interface Consumer {
        // Properties
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Consumer-properties
        readonly id: string;
        readonly producerId: string;
        readonly closed: boolean;
        readonly kind: "audio" | "video";
        readonly rtpParameters: Readonly<RtpReceiveParameters>;
        readonly track: Readonly<MediaStreamTrack>;
        readonly paused: boolean;
        readonly appData: any;

        // Methods
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Consumer-methods
        close(): void;
        getStats(): Promise<RTCStatsReport>;
        pause(): void;
        resume(): void;

        // Events
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Consumer-events
        on(event: "transportclose" | "trackended", handler: () => void): void;
    }
}
