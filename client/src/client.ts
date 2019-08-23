import mediasoup, { Device, Transport, RtpCapabilities, ProducerOptions } from 'mediasoup-client';
import socketClient from 'socket.io-client';
import socketPromise from './socket.io-promise';

const hostname = window.location.hostname;

let device: Device;
let socket: SocketIOClient.Socket;
let request: (...req: any) => Promise<any>;
//let producer;

const $ = document.querySelector.bind(document);
const $fsPublish = $('#fs_publish');
const $fsSubscribe = $('#fs_subscribe');
const $btnConnect = $('#btn_connect');
const $btnWebcam = $('#btn_webcam');
const $btnScreen = $('#btn_screen');
const $btnSubscribe = $('#btn_subscribe');
const $chkSimulcast = $('#chk_simulcast');
const $txtConnection = $('#connection_status');
const $txtWebcam = $('#webcam_status');
const $txtScreen = $('#screen_status');
const $txtSubscription = $('#sub_status');
let $txtPublish: any;

$btnConnect.addEventListener('click', connect);
$btnWebcam.addEventListener('click', publish);
$btnScreen.addEventListener('click', publish);
$btnSubscribe.addEventListener('click', subscribe);

if ((navigator.mediaDevices as any).getDisplayMedia === 'undefined') {
  $txtScreen.innerHTML = 'Not supported';
  $btnScreen.disabled = true;
}

async function connect() {
  $btnConnect.disabled = true;
  $txtConnection.innerHTML = 'Connecting...';

  const opts = {
    path: '/server',
    transports: ['websocket'],
  };

  const serverUrl = `https://${hostname}:3000`;
  socket = socketClient(serverUrl, opts);
  request = socketPromise(socket);

  socket.on('connect', async () => {
    $txtConnection.innerHTML = 'Connected';
    $fsPublish.disabled = false;
    $fsSubscribe.disabled = false;

    const data = await request('getRouterRtpCapabilities');
    console.log(data);
    await loadDevice(data);
  });

  socket.on('disconnect', () => {
    $txtConnection.innerHTML = 'Disconnected';
    $btnConnect.disabled = false;
    $fsPublish.disabled = true;
    $fsSubscribe.disabled = true;
  });

  socket.on('connect_error', (error: any) => {
    console.error('could not connect to %s%s (%s)', serverUrl, opts.path, error.message);
    $txtConnection.innerHTML = 'Connection failed';
    $btnConnect.disabled = false;
  });

  socket.on('newProducer', () => {
    $fsSubscribe.disabled = false;
  });
}

async function loadDevice(routerRtpCapabilities: RtpCapabilities) {
  try {
    device = new mediasoup.Device();
  } catch (error) {
    if (error.name === 'UnsupportedError') {
      console.error('browser not supported');
    }
  }
  await device.load({ routerRtpCapabilities });
}

async function publish(e: any) {
  const isWebcam = (e.target.id === 'btn_webcam');
  $txtPublish = isWebcam ? $txtWebcam : $txtScreen;

  const data = await request('createProducerTransport', {
    forceTcp: false,
    rtpCapabilities: device.rtpCapabilities,
  });
  if (data.error) {
    console.error(data.error);
    return;
  }

  const transport = device.createSendTransport(data); //I've added await here. Verify if it works in runtime.
  transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
    request('connectProducerTransport', { dtlsParameters })
      .then(callback)
      .catch(errback);
  });

  transport.on('produce', async ({ kind, rtpParameters }, callback, errback) => {
    try {
      const { id } = await request('produce', {
        transportId: transport.id,
        kind,
        rtpParameters,
      });
      callback({ id });
    } catch (err) {
      errback(err);
    }
  });

  transport.on('connectionstatechange', (state) => {
    switch (state) {
      case 'connecting':
        $txtPublish.innerHTML = 'publishing...';
        $fsPublish.disabled = true;
        $fsSubscribe.disabled = true;
      break;

      case 'connected':
        $txtPublish.innerHTML = 'published';
        $fsPublish.disabled = true;
        $fsSubscribe.disabled = false;
      break;

      case 'failed':
        transport.close();
        $txtPublish.innerHTML = 'failed';
        $fsPublish.disabled = false;
        $fsSubscribe.disabled = true;
      break;

      default: break;
    }
  });

  let stream: MediaStream;
  try {
    stream = await getUserMedia(transport, isWebcam);
    let video: HTMLVideoElement = document.querySelector('#local_video');
  video.srcObject = stream;
  } catch (err) {
    $txtPublish.innerHTML = 'failed';
  }
}

async function getUserMedia(transport: Transport, isWebcam: boolean) {
  if (!device.canProduce('video')) {
    console.error('cannot produce video');
    return;
  }

  let stream;
  try {
    stream = isWebcam ?
      await navigator.mediaDevices.getUserMedia({ video: true }) :
      await (navigator.mediaDevices as any).getDisplayMedia({ video: true });
  } catch (err) {
    console.error('starting webcam failed,', err.message);
    throw err;
  }
  const track = stream.getVideoTracks()[0];
  const params: ProducerOptions = { track };
  if ($chkSimulcast.checked) {
    params.encodings = [
      { maxBitrate: 100000 },
      { maxBitrate: 300000 },
      { maxBitrate: 900000 },
    ];
    params.codecOptions = {
      videoGoogleStartBitrate : 1000
    };
  }
  await transport.produce(params);
  return stream;
}

async function subscribe() {
  const data = await request('createConsumerTransport', {
    forceTcp: false,
  });
  if (data.error) {
    console.error(data.error);
    return;
  }

  const transport = await device.createRecvTransport(data);
  transport.on('connect', ({ dtlsParameters }, callback, errback) => {
    request('connectConsumerTransport', {
      transportId: transport.id,
      dtlsParameters
    })
      .then(callback)
      .catch(errback);
  });

  transport.on('connectionstatechange', (state) => {
    switch (state) {
      case 'connecting':
        $txtSubscription.innerHTML = 'subscribing...';
        $fsSubscribe.disabled = true;
        break;

      case 'connected':
        $txtSubscription.innerHTML = 'subscribed';
        $fsSubscribe.disabled = true;
        break;

      case 'failed':
        transport.close();
        $txtSubscription.innerHTML = 'failed';
        $fsSubscribe.disabled = false;
        break;

      default: break;
    }
  });

  const stream = await consume(transport);
  let video: HTMLVideoElement = document.querySelector('#remote_video');
  video.srcObject = stream;
  request('resume');
}

async function consume(transport: Transport) {
  const { rtpCapabilities } = device;
  const data = await request('consume', { rtpCapabilities });
  const {
    producerId,
    id,
    kind,
    rtpParameters,
  } = data;

  //let codecOptions = {};
  const consumer = await transport.consume({
    id,
    producerId,
    kind,
    rtpParameters,
    //codecOptions,
  });
  const stream = new MediaStream();
  stream.addTrack(consumer.track);
  return stream;
}
