---
layout: post
title: "Open Web Board で Camera API"
description: ""
category: 
tags: [Firefox OS, Open Web Board]
---
{% include JB/setup %}

先日の [FxOSコードリーディングミートアップ＃１１](/2014/11/21/fxos-reading-meetup-11)の発表では間に合わず「近日公開」としていましたが、Open Web Board に Web カメラをつないで Camera API を試しました。

![](/assets/posts/2014-11-21/webcam.jpg)

もちろん動きました。デフォルトのカメラアプリで Web カメラが使えるのを前に確認しているので、当たり前なのですが。。。

Camera API の使い方は [MDN](https://developer.mozilla.org/ja/docs/Web/API/Camera_API) や[スライド](https://speakerdeck.com/flatbird/camera-apidehe-ka)を見て下さい。

- 注意点
    - 配付されている Open Web Board は Firefox OS 1.4 なので、Camera API はまだ Certified API です。マニフェストで "privileged" ではなく "certified" を指定します。Certified アプリも WebIDE でインストールできました。 
    - 上のスライドにもありますが、mozCamera でなく mozCameras を使います。

Open Web Board につないだ Web カメラ（Elecom [UCAM-C0113FB](http://www2.elecom.co.jp/multimedia/pc-camera/ucam-c0113fb/)）の [CameraControl.capabilities](https://developer.mozilla.org/en-US/docs/Web/API/CameraControl.capabilities) の値を取ってみました。

``` javascript
{
  "isoModes": [],
  "recorderProfiles": {
    "cif": {
      "audio": { "channels": 1, "samplerate": 8000, "bitrate": 12200, "codec": "amrnb" },
      "video": { "height": 288, "width": 352, "framerate": 30, "bitrate": 360000, "codec": "h263" },
      "format": "3gp"
    },
    "qcif": {
      "audio": { "channels": 1, "samplerate": 8000, "bitrate": 12200, "codec": "amrnb" },
      "video": { "height": 144, "width": 176, "framerate": 30, "bitrate": 192000, "codec": "h263" },
      "format": "3gp"
    },
    "high": {
      "audio": { "channels": 1, "samplerate": 8000, "bitrate": 12200, "codec": "amrnb" },
      "video": { "height": 288, "width": 352, "framerate": 30, "bitrate": 360000, "codec": "h263" },
      "format": "3gp"
    },
    "low": {
      "audio": { "channels": 1, "samplerate": 8000, "bitrate": 12200, "codec": "amrnb" },
      "video": { "height": 144, "width": 176, "framerate": 30, "bitrate": 192000, "codec": "h263" },
      "format": "3gp"
    }
  },
  "exposureCompensationStep": 1,
  "effects": [],
  "sceneModes": [],
  "whiteBalanceModes": [ "auto", "incandescent", "fluorescent", "daylight", "cloudy-daylight" ],
  "fileFormats": "jpeg",
  "videoSizes": [
    { "width": 640, "height": 480 },
    { "width": 1280, "height": 720 },
    { "width": 1280, "height": 1024 },
    { "width": 352, "height": 288 },
    { "width": 320, "height": 240 },
    { "width": 176, "height": 144 }
  ],
  "thumbnailSizes": [
    { "width": 0, "height": 0 },
    { "width": 160, "height": 128 }
  ],
  "pictureSizes": [
    { "width": 640, "height": 480 },
    { "width": 1280, "height": 720 },
    { "width": 1280, "height": 1024 },
    { "width": 352, "height": 288 },
    { "width": 320, "height": 240 },
    { "width": 176, "height": 144 }
  ],
  "previewSizes": [
    { "width": 640, "height": 480 },
    { "width": 1280, "height": 720 },
    { "width": 1280, "height": 1024 },
    { "width": 352, "height": 288 },
    { "width": 320, "height": 240 },
    { "width": 176, "height": 144 }
  ],
  "flashModes": [],
  "focusModes": [ "fixed" ],
  "zoomRatios": [ 1 ],
  "maxFocusAreas": 0,
  "maxMeteringAreas": 0,
  "maxDetectedFaces": undefined,
  "minExposureCompensation": -3,
  "maxExposureCompensation": 3
}
```

エフェクトやシーン、フォーカスやズーム、フラッシュなどは使えないことが分かります。当たり前ですが。
