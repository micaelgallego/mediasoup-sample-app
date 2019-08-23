// Producer
// https://mediasoup.org/documentation/v3/mediasoup-client/api/#Producer

declare module "mediasoup-client" {
    // Dictionaries
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Producer-dictionaries

    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerOptions
    export interface ProducerOptions {
        track: MediaStreamTrack;
        encodings?: RTCRtpEncodingParameters[];
        codecOptions?: ProducerCodecOptions;
        appData?: Record<any, any>;
    }

    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
    export interface ProducerCodecOptions {
        opusStereo?: boolean;
        opusFec?: boolean;
        opusDtx?: boolean;
        opusMaxPlaybackRate?: number;
        videoGoogleStartBitrate?: number;
        videoGoogleMaxBitrate?: number;
        videoGoogleMinBitrate?: number;
    }

    export interface Producer {
        // Properties
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Producer-properties
        id: Readonly<string>;
        closed: Readonly<boolean>;
        kind: Readonly<"audio" | "video">;
        track: Readonly<MediaStreamTrack>;
        rtpParameters: Readonly<RtpSendParameters>;
        paused: Readonly<boolean>;
        maxSpatialLayer: Readonly<number>;
        appData: Record<any, any>;

        // Methods
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Producer-methods
        close(): void;
        getStats(): Promise<RTCStatsReport>;
        pause(): void;
        resume(): void;
        replaceTrack(options: { track: MediaStreamTrack }): Promise<void>;
        setMaxSpatialLayer(spatialLayer: number): Promise<void>;

        // Events
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Producer-events
        on(event: "transportclose" | "trackended", cb: () => void): void;
    }
}
