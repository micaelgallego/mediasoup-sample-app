// Transport
// https://mediasoup.org/documentation/v3/mediasoup-client/api/#Transport

import { TransportProduceParameters } from "mediasoup-client";

declare module "mediasoup-client" {
    // Dictionaries
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Transport-dictionaries

    export interface TransportOptions {
        id: string;
        iceParameters: IceParameters;
        iceCandidates: IceCandidate[];
        dtlsParameters: DtlsParameters;
        sctpParameters?: TransportSctpParameters;
        iceServers?: RTCIceServer[];
        iceTransportPolicy?: RTCIceTransportPolicy;
        proprietaryConstraints?: any;
        appData?: any;
    }

    export interface TransportProduceParameters {
        kind: "audio" | "video";
        rtpParameters: RtpSendParameters;
        appData?: any;
    }

    export interface TransportProduceDataParameters {
        sctpStreamParameters: SctpStreamParameters;
        label: string;
        protocol: string;
        appData?: any;
    }

    export interface Transport {
        // Properties
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Transport-properties
        readonly id: string;
        readonly closed: boolean;
        readonly direction: "send" | "recv";
        readonly connectionState: Readonly<RTCPeerConnectionState>;
        readonly appData: any;

        // Methods
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Transport-methods
        close(): void;
        getStats(): Promise<RTCStatsReport>;
        restartIce(options: { iceParameters: IceParameters }): Promise<void>;
        updateIceServers(options: { iceServers: RTCIceServer[] }): Promise<void>;
        produce(options: ProducerOptions): Promise<Producer>;
        consume(options: ConsumerOptions): Promise<Consumer>;
        produceData(options?: DataProducerOptions): Promise<DataProducer>;
        consumeData(options: DataConsumerOptions): Promise<DataConsumer>;

        // Events
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Transport-events
        on(
            event: "connect",
            handler: (
                params: { dtlsParameters: DtlsParameters },
                callback: () => void,
                errback: (error: Error) => void,
            ) => void,
        ): void;

        on(
            event: "produce",
            handler: (
                params: TransportProduceParameters,
                callback: (params: { id: string }) => void,
                errback: (error: Error) => void,
            ) => void,
        ): void;

        on(
            event: "producedata",
            handler: (
                params: TransportProduceDataParameters,
                callback: (params: { id: string }) => void,
                errback: (error: Error) => void,
            ) => void,
        ): void;

        on(
            event: "connectionstatechange",
            handler: (connectionState: RTCPeerConnectionState) => void,
        ): void;
    }
}
