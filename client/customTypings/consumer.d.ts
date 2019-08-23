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
        appData?: Record<any, any>;
    }

    export interface Consumer {
        // Properties
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Consumer-properties
        id: Readonly<string>;
        producerId: Readonly<string>;
        closed: Readonly<boolean>;
        kind: Readonly<"audio" | "video">;
        rtpParameters: Readonly<RtpReceiveParameters>;
        track: Readonly<MediaStreamTrack>;
        paused: Readonly<boolean>;
        appData: Readonly<Record<any, any>>;

        // Methods
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Consumer-methods
        close(): void;
        getStats(): Promise<RTCStatsReport>;
        pause(): void;
        resume(): void;

        // Events
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Consumer-events
        on(event: "transportclose" | "trackended", cb: () => void): void;
    }
}
