---
layout: post
title: "Galaxy Nexus に KitKat (CM11) をインストールした"
description: ""
category: 
tags: [Android]
---
{% include JB/setup %}

周りの人が Nexus 5 を買ったり、Nexus 7 に KitKat が降ってきたよーとか言っているなか、
[見捨てられた](https://support.google.com/nexus/answer/3468085?hl=ja)
Galaxy Nexus ユーザの私は一人さみしい思いをしていました。

そんな折、Galaxy Nexus 向けに CyanogenMod の Android 4.4 ステーブル ROM がリリースされたという[ニュース](http://www.ubergizmo.com/2013/12/galaxy-nexus-cyanogenmod-11-android-4-4-kitkat-stable-unofficial-rom-released/)が流れてきました。(非公式 ROM だけど)

実際に入れてみることが出来ましたので、メモします。<br>
<span class="caution">なお、実際に試される方は自己責任でお願いします。</span>

## 基本情報

- デバイス
	- DoCoMo 版 Galaxy Nexus SC-04D 
- XDA のポスト (元ネタ)
	- <http://forum.xda-developers.com/showthread.php?t=2525351>

* adb や fastboot の準備、ブートローダーアンロック等については割愛します。

## バックアップ
- CWM Recovery でもいいですが、XDA の手順に記載されていた [TWRP Recovery](http://teamw.in/project/twrp2) を使ってみました。

- maguro 用 TWRP を以下のページからたどってダウンロード。
	- <http://teamw.in/project/twrp2/90>
	- 今回は openrecovery-twrp-2.6.3.2-maguro.img をダウンロードしました。
	- "maguro" は Galaxy Nexus GSM/HSPA+ 版のコードネームです。

- ブートローダーモードで起動
    - `$ adb reboot-bootloader`
	- または、Volume Up & Down ボタン同時押し状態で電源長押しで起動。

- TWRP をブートする
	- `$ fastboot boot openrecovery-twrp-2.6.3.2-maguro.img`
	- ヘタレなので、recovery イメージの flash はしません。

- TWRP が起動したら、メニューから "Backup" を選んでバックアップ
	- デフォルトで System, Data, Boot が選択されてるのでそのままバックアップ。
	- この際、"Enable compression" も有効にしました。

- バックアップ成功後、念のためファイルを PC にダウンロード
	- ```$ adb pull /data/media/0/TWRP/BACKUPS/0146B5BB0101100B/```

- TWRP のメニューの "Reboot" からリブートする。

## ROM イメージのダウンロード
- [XDA のポスト](http://forum.xda-developers.com/showthread.php?t=2525351)からたどって、以下をダウンロード。
	- CyanogenMod
		- cm-11-20131215-UNOFFICIAL-maguro.zip
	- gapps
		- gapps-kk-20131218_ps.zip
		- "gapps" は Google Apps のこと。
		- なお、Art Compatible の gapps-kk-20131218.zip というのもありました。

- 今回は非公式 ROM ですが、公式の nightly がここから落とせるみたいです。
	- <http://download.cyanogenmod.org/?device=maguro>
	- 現在、CyanogenMod 11 で Android 4.4 に絶賛対応中だそうです。

## インストール
- TWRP で sdcard からインストールする方法と ADB sideload を使った方法が記載されていました。
- ADB sideload は今回の環境ではうまく行きませんでした。
	- Jelly Bean の AOSP recovery イメージから ADB sideload をサポートしているらしいですが、たぶん自分の Galaxy Nexus の recovery イメージは古いままだと思います。
	- ADB sideload のやり方は[こちらの記事](http://qiita.com/is0me/items/9d738d19ad1f61fb5349)を参考。
	- なお、[TWRP は ADB sideload にも対応している](http://teamw.in/ADBSideload)らしいので、イメージを flash すれば出来るはず。

- TWRP で sdcard からのインストール。
	1. 上述のバックアップの際と同じ方法で TWRP を起動。
	2. Factory Reset
		- TWRP メニューの "Wipe" をタップし、"Swipe to Factory Reset" で実行します。
	3. sdcard にコピー
		- ```$ adb push cm-11-20131215-UNOFFICIAL-maguro.zip /sdcard/tmp/```
		- ```$ adb push gapps-kk-20131218_ps.zip /sdcard/tmp/```
	4. インストール
		- TWRP メニューの "Install" から sdcard にコピーした cm-11-20131215-UNOFFICIAL-maguro.zip を選びます。
		- "Add More Zips" というボタンが出てくるので、gapps-kk-20131218_ps.zip も同時に書き込みのキューに入れます。
		- "Swipe to Confirm Flash" で書き込み開始。
		- 書き込み終了後、一応 "Wipe cache/dalvik" してから "Reboot System" でリブート。

- Galaxy Nexus が Android 4.4.2 になりました。

![KitKat in Galaxy Nexus](/assets/posts/2013-12-20/kitkat-in-gn.png)


