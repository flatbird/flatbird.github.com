---
layout: post
title: "App Manager のメモ [Firefox OS]"
description: "Firefox OS の開発者用ツール App Manager のメモ"
category: 
tags: [Firefox OS]
---
{% include JB/setup %}
今更ながら App Manager を使ったのでメモ。

## ポイント
- Firefox OS の新しい開発ツール。
- Firefox 26 以上で標準搭載。
	- Firefox 26  は [12/10 リリース](http://www.mozilla.jp/firefox/26.0/releasenotes/)なので、Beta とか入れなくてももうみんな使える。
- 複数バージョンの Firefox OS シミュレータをインストールできる。
- 実機のアプリデバッグが簡単に出来るようになった。
	- 以前のシミュレータでは "adb forward" による面倒な方法があったが、それも動かなくなってた。(参考) [きさとメモ » 「関東Firefox OS勉強会 1st(仮)」の参加メモ #fxos](http://www.kisato.net/wp/firefoxos/firefox-os-tokyo-1/)
- Firefox OS はバージョン 1.2 以降で対応。

## References
- dynamis さんの紹介スライド:
	- <http://www.slideshare.net/dynamis/firefox-os-app-manager>
- 公式:
	- <https://developer.mozilla.org/en-US/Firefox_OS/Using_the_App_Manager>
- 公式(日本語):
	- <https://developer.mozilla.org/ja/docs/Mozilla/Firefox_OS/Using_the_App_Manager>

## 起動方法
- メニューから、「ツール > Web 開発 > アプリマネージャ」(Tools > Web Developer > App Manager) で起動。
- または、アドレスバーに `about:app-manager` を入力。

## シミュレータ、ADB Helper アドオンのインストール
- シミュレータ、ADB Helper はアドオンとして別途インストールする。
- AppManager を起動したときに最初に表示されるヘルプページ内のリンク先でインストールできる。
  - このヘルプページは App Manager の画面左下のヘルプボタンからいつでも開ける。
  - ここから直接行ける: <https://ftp.mozilla.org/pub/mozilla.org/labs/fxos-simulator/>
- シミュレータは現在のところ "Firefox OS 1.2 Simulator" と "Firefox OS 1.3 Simulator" がある。

## シミュレータの起動
- App Manager の画面下部のツールバーから起動するシミュレータ ("Firefox OS 1.2" 等) を選んで起動する。

## 実機の接続
- Firefox OS 1.2 以降が必要。
- ADB Helper アドオン要インストール。
- 実機の Remote Debugging を有効にする。
	- Settings > Device information > More information > Developer
- 画面下部のツールバーに接続先デバイスが表示されたらクリックして接続する。

## その他
- スクリーンショットも簡単に取れてうれしい。
- 実機だと許可設定 (Permissions Table) でパーミッション一覧が出るようになった。

後の使い方はだいたい以前のシミュレータと同じような感じ。

