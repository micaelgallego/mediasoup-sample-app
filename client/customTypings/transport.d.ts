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
        proprietaryConstraints?: Record<any, any>;
        appData?: Record<any, any>;
    }

    export interface TransportProduceParameters {
        kind: "audio" | "video";
        rtpParameters: RtpSendParameters;
        appData: Record<any, any>;
    }

    export interface TransportProduceDataParameters {
        sctpStreamParameters: SctpStreamParameters;
        label: string;
        protocol: string;
        appData: Record<any, any>;
    }

    export interface Transport {
        // Properties
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Transport-properties
        id: Readonly<string>;
        closed: Readonly<boolean>;
        direction: Readonly<"send" | "recv">;
        connectionState: Readonly<RTCPeerConnectionState>;
        appData: Readonly<Record<any, any>>;

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
            cb: (
                params: { dtlsParameters: DtlsParameters },
                cb: () => void,
                errback: (error: Error) => void,
            ) => void,
        ): void;

        on(
            event: "produce",
            cb: (
                params: TransportProduceParameters,
                cb: (params: { id: string }) => void,
                errback: (error: Error) => void,
            ) => void,
        ): void;

        on(
            event: "producedata",
            cb: (
                params: TransportProduceDataParameters,
                cb: (params: { id: string }) => void,
                errback: (error: Error) => void,
            ) => void,
        ): void;

        on(
            event: "connectionstatechange",
            cb: (connectionState: RTCPeerConnectionState) => void,
        ): void;
    }
}
