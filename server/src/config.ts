import { MediaSoupConfig } from "mediasoup";

const mediasoup: MediaSoupConfig = {
  // Worker settings
  worker: {
    rtcMinPort: 10000,
    rtcMaxPort: 10100,
    logLevel: 'warn',
    logTags: [
      'info',
      'ice',
      'dtls',
      'rtp',
      'srtp',
      'rtcp',
      // 'rtx',
      // 'bwe',
      // 'score',
      // 'simulcast',
      // 'svc'
    ],
  },
  // Router settings
  router: {
    mediaCodecs:
      [
        {
          kind: 'audio',
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2
        },
        {
          kind: 'video',
          mimeType: 'video/VP8',
          clockRate: 90000,
          parameters:
            {
              'x-google-start-bitrate': 1000
            }
        },
      ]
  },
  // WebRtcTransport settings
  webRtcTransport: {
    listenIps: [{
        ip: '127.0.0.1',
        announcedIp: null,
    }],
    //maxIncomingBitrate: 1500000, //It is not a valid property for WebRtcTransportOptions
    initialAvailableOutgoingBitrate: 1000000,
  }
}

const config = {
  listenIp: '0.0.0.0',
  listenPort: 3000,
  sslCrt: __dirname + '/../cert/cert.pem',
  sslKey: __dirname + '/../cert/key.pem',
  mediasoup,
  webRtcTransportAdditionalOptions: {
    maxIncomingBitrate: 1500000, //Created another object in config as WebRtcTransportOptions doesn't allow it
  }
};

export default config;
