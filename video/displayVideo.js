const cameraSize = { w: 360, h: 240 };
const canvasSize = { w: 360, h: 240 };
const resolution = { w: 1080, h: 720 };
let video;
let media;
let canvas;
let canvasCtx;

// video要素をつくる
video          = document.createElement('video');
video.id       = 'video';
video.width    = cameraSize.w;
video.height   = cameraSize.h;
video.autoplay = true;
document.getElementById('videoPreview').appendChild(video);

// video要素にWebカメラの映像を表示させる
media = navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    width: { ideal: resolution.w },
    height: { ideal: resolution.h }
  }
}).then(function(stream) {
  video.srcObject = stream;
});

// canvas要素をつくる
canvas        = document.createElement('canvas');
canvas.id     = 'canvas';
canvas.width  = canvasSize.w;
canvas.height = canvasSize.h;
document.getElementById('canvasPreview').appendChild(canvas);

// コンテキストを取得する
canvasCtx = canvas.getContext('2d');

// video要素の映像をcanvasに描画する
_canvasUpdate();

function _canvasUpdate() {
  canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(_canvasUpdate);
};