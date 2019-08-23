// Device
// https://mediasoup.org/documentation/v3/mediasoup-client/api/#Device

declare module "mediasoup-client" {
    // Dictionaries
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Device-dictionaries

    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DeviceOptions
    export interface DeviceOptions {
        Handler?: any | string;
    }

    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#DeviceSctpCapabilities
    export interface DeviceSctpCapabilities {
        numStreams: TransportNumSctpStreams;
    }

    export interface Device {
        // Properties
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Device-properties

        handlerName: Readonly<string>;
        loaded: Readonly<boolean>;
        rtpCapabilities: Readonly<RtpCapabilities>;
        sctpCapabilities: Readonly<DeviceSctpCapabilities>;

        // Constructor
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Device-constructor
        new (options?: DeviceOptions): Device;

        // Methods
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#Device-methods

        load(options: { routerRtpCapabilities: RtpCapabilities }): Promise<void>;
        canProduce(kind: "audio" | "video"): boolean;
        createSendTransport(options: TransportOptions): Transport;
        createRecvTransport(options: TransportOptions): Transport;
    }
}
