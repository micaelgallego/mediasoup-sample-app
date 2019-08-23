declare module "mediasoup-client" {
    // Properties
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#mediasoupClient-properties
    export const version: string;

    // Classes
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#mediasoupClient-classes
    export const Device: Device;

    // Functions
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#mediasoupClient-functions
    export function parseScalabilityMode(
        scalabilityMode?: string,
    ): {
        spatialLayers: number;
        temporalLayers: number;
    };
}
