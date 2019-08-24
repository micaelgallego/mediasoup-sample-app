declare module "mediasoup-client" {
    // https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportIceParameters
    export interface IceParameters {
        usernameFragment?: string;
        password?: string;
        iceLite?: boolean;
    }

    // https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportIceCandidate
    export interface IceCandidate {
        foundation: string;
        priority: number;
        ip: string;
        protocol: "udp" | "tcp";
        port: number;
        type: "host";
        tcpType?: "passive";
    }

    // https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportDtlsParameters
    export interface DtlsParameters {
        role?: DtlsRole;
        fingerprints: DtlsFingerprints;
    }

    // https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportDtlsRole
    export type DtlsRole = "auto" | "client" | "server";

    // https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportDtlsFingerprints
    export interface DtlsFingerprints {
        "sha-1"?: string;
        "sha-224"?: string;
        "sha-256"?: string;
        "sha-384"?: string;
        "sha-512"?: string;
    }

    // https://mediasoup.org/documentation/v3/mediasoup/api/#TransportSctpParameters
    export interface TransportSctpParameters {
        port: 5000;
        OS: number;
        MIS: number;
        maxMessageSize: number;
    }

    // https://mediasoup.org/documentation/v3/mediasoup/sctp-parameters/#SctpStreamParameters
    export interface SctpStreamParameters {
        ordered?: boolean;
        maxPacketLifeTime?: number;
        maxRetransmits?: number;
    }

    // https://mediasoup.org/documentation/v3/mediasoup/api/#TransportNumSctpStreams
    export interface TransportNumSctpStreams {
        OS?: number;
        MIS?: number;
    }
}
