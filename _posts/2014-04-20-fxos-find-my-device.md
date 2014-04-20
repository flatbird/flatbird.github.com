---
layout: post
title: "Firefox OS の新機能 Find My Device を見てみた"
description: ""
category: 
tags: [Firefox OS]
---
{% include JB/setup %}

以前から気になっていた Where is my Fox? (WMF) が Find My Device と名を改めて Firefox OS 1.5 に入っていました。

<blockquote class="twitter-tweet" lang="ja"><p>Where&#39;s My Fox... 気になる。。。 / “Firefox OS Advent Calendar 2013 &amp;#8211; 12/10 | Mozilla Developer Street (modest)” <a href="http://t.co/XHDKXTKcFh">http://t.co/XHDKXTKcFh</a></p>&mdash; ひらとり (flatbirdH) (@flatbirdH) <a href="https://twitter.com/flatbirdH/statuses/410550006861426688">2013, 12月 10</a></blockquote>

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

iPhone でいうところの Find My iPhone や Android の Android Device Manager にあたる機能です。

Firefox OS の設定の Account Management グループに Find My iPhone が追加されています。早速アカウントにサインインして有効にしてみました。

![Account Enabled](/assets/posts/2014-04-20/findmydevice.png)

・・・が、このポータルサイト FindMyDevice.com (<http://findmydevice.mozilla.com>) がまだオープンしておらず、残念ながらまだ利用できないようです。

ちなみに、この URL は[このあたり](https://github.com/mozilla-b2g/gaia/blob/master/apps/settings/elements/findmydevice.html#L40)にハードコードされています。また、ここの [API の設定](https://github.com/mozilla-b2g/gaia/blob/master/customization/findmydevice.json)にはテスト用のサーバらしきものが見られます。

Wiki によると、リモートロック (lock)、位置探索 (track)、着信音を鳴らす (ring)、リモートワイプ (erase) といったコマンドが利用できるようです。

- [MozillaWiki CloudServices/WheresMyFox](https://wiki.mozilla.org/CloudServices/WheresMyFox)


## Find My Device アプリ

App Manager で Firefox OS 1.5 のシミュレータを見てみると、アプリ一覧に "Find My Device" が見つかりました。アイコンがありませんね。

![App Manager](/assets/posts/2014-04-20/appmanager.png)

[マニフェストファイル](http://mxr.mozilla.org/gaia/source/apps/findmydevice/manifest.webapp)を見てみると以下のようになっていました。

- アイコン ("icons") が設定されていない。
- 認定アプリ ("type": "certified") である。
- システムアプリ ("role": "system") で、ホーム画面に表示されない。
- 要パーミッション API の使用:
	- Alarm
	- DeviceStorage ('sdcard', 'pictures', 'videos', 'music', 'apps')
	- Geolocation
	- Power
	- Push
	- Settings
	- SystemXHR
- system アプリと Inter-App Communication API ([参考](http://www.slideshare.net/chikoski/2014-32787542/49)) で通信する。

UI は設定画面(=Settings アプリ) のみ、サーバからの Push を受けて SystemXHR でコマンドを取得、Geolocation で位置情報を取得し、Device Storage を消去する、といった挙動が見えてきます。

## 各コマンドの処理

各コマンドに対して行う処理をコードで見てみました。

### 位置探索 (track)

- [track のコード](http://mxr.mozilla.org/gaia/source/apps/findmydevice/js/commands.js#71)
- [Geolocation.watchPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation.watchPosition) で位置情報を監視して随時サーバに投げる。
- パラメータ duration (継続時間) の値が 0 ならトラッキングを停止する。それ以外の値は現在の実装では単に無視している。


### リモートワイプ (erase)

- [erase のコード](http://mxr.mozilla.org/gaia/source/apps/findmydevice/js/commands.js#110)
- DeviceStorage API で 'apps', 'pictures', 'sdcard', 'videos', 'music' の全ファイルをワイプする。
     - DeviceStorage.enumerate() で各ファイルを DeviceStorage.delete() する。
- 最後に PowerManager (navigator.mozPower) の [PowerManager.factoryReset()](https://developer.mozilla.org/en-US/docs/Web/API/PowerManager.factoryReset) (要 certified) でファクトリーリセットを行う。


### リモートロック (lock)

- [lock のコード](http://mxr.mozilla.org/gaia/source/apps/findmydevice/js/commands.js#155)
- ロック画面へのメッセージ表示やリモートでのパスコードの設定もサポート。
- Settings API で lockscreen 設定を以下のように変更する。

	var settings = {
	  'lockscreen.enabled': true,
	  'lockscreen.notifications-preview.enabled': false,
	  'lockscreen.passcode-lock.enabled': true,
	  'lockscreen.lock-immediately': true
	};


### 着信音を鳴らす (ring)

- [ring のコード](http://mxr.mozilla.org/gaia/source/apps/findmydevice/js/commands.js#181)
- 設定の "dialer.ringtone" にセットされている音声ファイルを Audio API でループで流す。
- 'audio.volume.content' 設定で音声はマックスに変更！

以上です。
