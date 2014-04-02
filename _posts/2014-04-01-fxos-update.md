---
layout: post
title: "Firefox OS のアップデートの仕組み"
description: ""
category: 
tags: [Firefox OS]
---
{% include JB/setup %}

Firefox OS のアップデートの仕組みについての解説があったので、少し古い (2012年12月の記事) ですが 要点をメモします。

- オリジナル: **["kev – Firefox OS Update Mechanics"](http://kev.deadsquid.com/?p=1243)**

<p class="small">* 本記事内の図はこちらのサイトから引用させていただいています。</p>

### ２種類のアップデート
1. Gecko/Gaia アップデート 
	- Gecko and/or Gaia 層のアップデート。
2. Full System アップデート 
	- Gonk 層のアップデート。(オプションで Gecko/Gaia 層も一緒にアップデート)

### アップデートに関わる３つのクライアント
- Update Polling Client
	- アップデートの有無をチェックする。(Gecko の一部)
- Software Update Client
	- アップデートのダウンロードと検証を行う。(Gecko の一部)
	- Gecko/Gaia アップデートの場合はアップデートの適用も行う。
- デバイスの GOTA/FOTA アップデート機能
	- Full System アップデートを適用する。
    - GOTA = Google Over the Air, FOTA = Firmware Over the Air

Gecko/Gaia アップデートの場合、Gecko のソフトウェアアップデート機能でアップデート有無のチェック、ダウンロードと検証、さらにデバイスへのアップデートの適用まで行う。 

Full System アップデートの場合、Gecko のソフトウェアアップデート機能でアップデート有無のチェック、ダウンロードと検証を行った後、デバイスの GOTA/FOTA にアップデートパッケージを渡し、GOTA/FOTA でアップデートの適用を行う。

これらのアップデートによる変更は Gonk, Gecko, Gaia のファイルに限定される。ユーザーデータ、アプリケーションデータは変更されない。

### Device Storage Map

Firefox OS 1.0 は OS やアプリを配置する 512MB のストレージと、メディアライブラリとアップデートのダウンロード先に用いる
 2GB のパーティション(現在は SD カード)を想定している。

512MB のストレージは以下の領域に静的に分割される。

- system (Gonk, Gecko, Gaia)
- data (アプリとユーザデータ)
- cache (キャッシュデータ)
- OS の雑多な用途のための少量の領域 (/proc 等)

![Storage Map](/assets/posts/2014-04-01/storagemap.png)

<div class="center small">
Internal Storage<br>from 
<a href="http://kev.deadsquid.com/?p=1243">"kev – Firefox OS Update Mechanics"</a>
</div><br>

### Gecko/Gaia アップデートの手順

Gecko, Gaia は read-only の /system ファイルシステムに置かれている。/system/b2g ディレクトリにライブコピーが置かれ、/system/b2g-staging ディレクトリにアップデートが適用される。その他のマウントポイント以下のファイルは変更されない。

1. Gecko Update Client がアップデートパッケージをダウンロードして検証する。この際、パッケージの署名を検証する。
2. read-only ("ro") の /system マウントポイントを read-write ("rw") で再マウントする。
3. Gecko Update Client がアップデートパッケージを b2g-staging に適用する。
4. Gecko Update Client が b2g-staging に解凍されたアップデートを検証する。
5. 検証が成功したら /system/b2g に不整合を起こさないために b2g プロセスを停止する。
6. /system/b2g と /system/b2g-staging ディレクトリをアトミックにスワップしてデバイスを再起動する。

### Full System アップデートの手順

Full System アップデートではデバイスの OTA アップデート機能 (GOTA/FOTA) を利用して全システム
(Gonk およびオプションで Gecko, Gaia) のアップデートを適用する。Gecko Update Client がアップデートの有無のチェック、ダウンロード、検証を行い、GOTA 機能にアップデートイメージを引き渡す。アップデートは GOTA アップデート機能により recovery モードで適用される。

1. Gecko Update Client がアップデートパッケージをダウンロードして検証する。パッケージの署名を検証する。
2. ダウンロードされたアップデートがアップデートパッケージとして提供され、デバイスが recovery モードでリブートされる。
3. デバイスは recovery モードでアップデートを適用し、リブートする。

### アップデートフロー

![Storage Map](/assets/posts/2014-04-01/system_update_flows.png)

<div class="center small">
System Update Flows (Gecko/Gaia &amp; Full System Updates)<br>from
<a href="http://kev.deadsquid.com/?p=1243">"kev – Firefox OS Update Mechanics"</a>
</div><br>

### アプリのアップデートフロー

アプリのアップデートは Gecko/Gaia アップデートと同様の手順だが、アップデートが各アプリごとに適用される点が異なる。

![Storage Map](/assets/posts/2014-04-01/app_update_flow.png)

<div class="center small">
App Update Process Flow<br>from
<a href="http://kev.deadsquid.com/?p=1243">"kev – Firefox OS Update Mechanics"</a>
</div><br>

### Firefox OS アップデートに関わる要素

- 転送クライアント: Gecko Software update Clients, via HTTP(S) (外部リファレンスを参照)
- 転送パッケージ: Mozilla Archive files (外部リファレンスを参照)
- バージョンコントロール: バイナリにコンパイルされた Version ID がアップデートのチェックに使用される。
- 管理アプリ (Management App): Firefox OS の Settings アプリ。
- インストーラ: Gecko Software Update client (Gecko/Gaia アップデート), Android FOTA/recovery facility (Full System アップデート)
- Android FOTA/Recovery へのインターフェース ([Bug 778084](https://bugzilla.mozilla.org/show_bug.cgi?id=778084) 参照)

### 外部リファレンス

- B2G Updates (Mozilla Wiki) – <https://wiki.mozilla.org/B2G/Architecture/Runtime_Security#Updates>
- Gecko’s Software Update client – <https://wiki.mozilla.org/Software_Update>
- [Bug 715816](https://bugzilla.mozilla.org/show_bug.cgi?id=715816) – (b2g-gecko-updates) Tracking: Automatic updates of b2g “userspace” (gecko, built-in apps and dependencies; not third-party apps)
- [Bug 778084](https://bugzilla.mozilla.org/show_bug.cgi?id=778084) – (b2g-fota-updates) Tracking: Gecko glue for FOTA updates (see comment 5, in particular, for an overview)
- [Bug 728081](https://bugzilla.mozilla.org/show_bug.cgi?id=728081) – (b2g-app-updates) Tracking: Automatic updates of installed applications on B2G
- [Bug 764194](https://bugzilla.mozilla.org/show_bug.cgi?id=764194) – (b2g-updates) [meta] Master tracking bug for B2G & app updates
- Mozilla Archive files (MARs, used for packaging updates) – <https://wiki.mozilla.org/Software_Update:MAR>

※ なお、recovery モードでのアップデートは adb コマンドに置き換えると以下になるみたいです。(<https://bugzilla.mozilla.org/show_bug.cgi?id=778084#c3>)

1. adb push &lt;build&gt;/out/product/target/&lt;device&gt;/&lt;device&gt;-ota-eng.&lt;user&gt;_mmc.zip /sdcard/update.zip
2. adb shell "echo --update_package=/sdcard/update.zip &gt; /cache/recovery/command"
3. adb reboot recovery


(こちらも参照: <https://thenewcircle.com/s/post/1065/updating_android_os_via_ota>)

