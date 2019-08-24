// tslint:disable:max-line-length

// https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities
declare module "mediasoup-client" {
    
    // Dictionaries
    // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#Dictionaries

    // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpParameters
    export interface RtpParameters {
        mid?: string;
        codecs: RtpCodecParameters[];
        headerExtensions?: RtpHeaderExtensionParameters[];
        encodings: RtpEncodingParameters[];
        rtcp?: RtcpParameters;
    }

    // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpSendParameters
    export interface RtpSendParameters extends RtpParameters {}

    // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpReceiveParameters
    export interface RtpReceiveParameters extends RtpParameters {}

    // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCapabilities
    export interface RtpCapabilities {
        codecs: RtpCodecCapability[];
        headerExtensions?: RtpHeaderExtension[];
    }

    // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCodecParameters
    export interface RtpCodecParameters {
        mimeType: string;
        payloadType: number;
        clockRate: number;
        channels?: number;
        parameters?: any;
        rtcpFeedback?: RtcpFeedback[];
    }

    // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtcpFeedback
    export interface RtcpFeedback {
        type: string;
        parameter?: string;
    }

    // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpEncodingParameters
    export interface RtpEncodingParameters {
        ssrc?: number;
        rid?: string;
        rtx: any;
        dtx?: boolean;
        scalabilityMode?: string;
    }

    // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpHeaderExtensionParameters
    export interface RtpHeaderExtensionParameters {
        uri: string;
        id: number;
        encrypt?: boolean;
        parameters?: any;
    }

    // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtcpParameters
    export interface RtcpParameters {
        cname?: string;
        reducedSize?: boolean;
    }

    // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCodecCapability
    export interface RtpCodecCapability {
        kind: "audio" | "video";
        mimeType: string;
        preferredPayloadType: number;
        clockRate: number;
        channels?: number;
        parameters?: any;
    }

    // https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpHeaderExtension
    export interface RtpHeaderExtension {
        kind?: "audio" | "video";
        uri: string;
        preferredId: number;
        preferredEncrypt?: boolean;
        direction?: string;
    }
}
