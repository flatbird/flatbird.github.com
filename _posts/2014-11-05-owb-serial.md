---
layout: post
title: "Open Web Board で ToCoStick"
description: ""
category: 
tags: [Firefox OS, TWE-Lite]
---
{% include JB/setup %}

先日の[ハンズオン](https://atnd.org/events/58127)の際に、Open Web Board で ToCoStick を使う方法を教えてもらったので試してみました（ちなみに PC で ToCoStick とシリアル通信する記事は[こちら](/2014/10/31/fxos-owb-twe-lite/)）。

Open Web Board の USB ポートに ToCoStick を挿すと `/dev/ttyUSB0` として認識されます。

``` bash
$ adb shell ls -l /dev/ttyUSB*
crw-rw---- radio    radio    188,   0 2000-01-01 09:00 ttyUSB0
```

FTDI の VCP ドライバが入っていて、シリアル通信できる状態になっているようです。

``` bash
$ adb shell cat /proc/tty/driver/usbserial
usbserinfo:1.0 driver:2.0
0: name:"FTDI USB Serial Device" vendor:0403 product:6001 num_ports:1 port:1 path:usb-usb20_host-1
```

さらに、Open Web Board では `seriald` というデーモンがいて、`9943/tcp` で待ち受けています。ここに接続するとシリアル通信をフォワードしてくれます。

``` bash
$ adb shell netstat
Proto Recv-Q Send-Q Local Address          Foreign Address        State
 tcp       0      0 0.0.0.0:2828           0.0.0.0:*              LISTEN
 tcp       0      0 127.0.0.1:5037         0.0.0.0:*              LISTEN
 tcp       0      0 0.0.0.0:9943           0.0.0.0:*              LISTEN  <--- ココ
 tcp       0      0 0.0.0.0:666            0.0.0.0:*              LISTEN
```

とりあえず telnet で簡単に試してみます。接続したら TTY 名とボー・レートを指定します。次の例では ToCoStick が受信した子機からのコマンドが出力されています（[参考](http://tocos-wireless.com/jp/products/TWE-Lite-DIP/TWE-Lite-DIP-step3-81.html)）。

```
$ adb shell
root@rk3066:/ # busybox telnet 127.0.0.1 9943                               
{"devicename":"ttyUSB0","bitrate":115200}
:78811501AE81003AB57859F1000C001D0000FFFFFFFFFFED

:78811501AE81003AB5785A31000C001D0000FFFFFFFFFFAC
```

## Open Web Board で L チカ

`9943/tcp` には [TCP Socket API](https://developer.mozilla.org/en-US/docs/Web/API/TCP_Socket_API) で Firefox OS アプリからもアクセスできます。

Open Web Board にインストールした Firefox OS アプリから、ソケット経由で ToCoStick にコマンドを送り、TWE-Lite 子機の LED を L チカしてみます。

次の写真は Open Web Board にインストールされた Firefox OS アプリです。Open Web Board に HDMI 接続したモニタで表示しています。小さくて見づらいですが、LED を ON/OFF するためのスイッチがあります。

![](/assets/posts/2014-11-05/tv.jpg)

次の写真は、左から ToCoStick, Open Web Board, TWE-Lite 子機です。上のアプリでスイッチを ON/OFF すると、右側の TWE-Lite 子機の LED が点灯/消灯します。

![](/assets/posts/2014-11-05/owb-led.jpg)

アプリの JavaScript コードの抜粋です。ここでは省略している isTurnedON() という関数で UI 上のスイッチの ON/OFF 状態を取得し、ToCoStick に送信するコマンドを切り替えます。

``` javascript
  var socket = navigator.mozTCPSocket.open('127.0.0.1', 9943);
  socket.onopen = function () {
    var param = {
      devicename: 'ttyUSB0',
      bitrate: 115200
    };
    console.log('Opened');
    socket.send(JSON.stringify(param));
    setInterval(function() {
      var cmd = '';
      if (isTurnedON()) {
        cmd = ':7880010101FFFFFFFFFFFFFFFF0D';
      } else {
        cmd = ':7880010001FFFFFFFFFFFFFFFF0E';
      }
      console.log('Sending ' + cmd);
      socket.send(cmd + '\r\n');
    }, 1000);
  }
  socket.onerror = function (evt) {
    console.log('Error:' + evt.type + ': ' + data.toString());
  }
```

これで Open Web Board から ToCoStick を使えるようになりましたので、色々遊べそうです！

