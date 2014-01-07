---
layout: post
title: "Firefox OS 1.3 を焼いてみた (Keon/Peak) [Firefox OS]"
description: ""
category: 
tags: [Firefox OS]
---
{% include JB/setup %}

[Keon/Peak 用の Firefox OS 1.3 の ROM が出た](http://firefoxosguide.com/firefox-os/download-latest-roms-images-geeksphone-keon-peak.html/)そうなので Peak に焼いてみた。

- 参考
	- [Download the Latest ROMs (Images) for Geeksphone Keon and Peak | Firefox OS Guide](http://firefoxosguide.com/firefox-os/download-latest-roms-images-geeksphone-keon-peak.html/)
<br><br>
- Geeksphone の ROM はコチラからダウンロード
	- <http://downloads.geeksphone.com/>
<br><br>
- 前提
	- ADB で実機につながる状態。
	- バッテリーが 50% 以上残っている。
<br><br>
- やったこと
	- unzip して flash_mac.sh (Linux: flash.sh, Windows: flash.bat) を叩くだけ。
	- `cat flash_mac.sh` してみたら、zip に同梱されていた adb.mac を使うようになっていたので、一応、事前に adb kill-server もしておいた。
	- 最初に user data を残すか聞かれたので消した。
	- ものの１分位で終了。
<br><br>
- リリースノートとか
	- [Firefox OS 1.3 for developers - Mozilla](https://developer.mozilla.org/en-US/Firefox_OS/Releases/1.3)
		- ユーザ向けのリリースノートはまだなかった。
	- [B2G/Roadmap](https://wiki.mozilla.org/B2G/Roadmap)
		- NFC 対応が入ってるらしい。実機じゃ試せないけど。。。

![](/assets/posts/2014-01-07/fxos13.png)
