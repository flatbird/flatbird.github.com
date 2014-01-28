---
layout: post
title: "Firefox OS とフィッシング詐欺・マルウェア対策機能のメモ"
description: ""
category: 
tags: [Firefox OS]
---
{% include JB/setup %}

先日、[Firefox OS ハッカソン](http://atnd.org/events/46352 ) で [Google Safe Browsing API](https://developers.google.com/safe-browsing/) と [VirusTotal API](https://www.virustotal.com/documentation/public-api/) を使った超簡易ブラウザを作った。それに関連して調べたこととかのメモ。

## Firefox のフィッシング詐欺・マルウェア対策 ("Phishing and Malware Protection") 機能 
- Firefox の不正サイト対策機能。(セーフブラウジング)
- ドキュメント:
     - (英語) [Phishing and Malware Protection](https://support.mozilla.org/en-US/kb/how-does-phishing-and-malware-protection-work )
     - (日本語) [フィッシング詐欺・マルウェア対策機能](http://www.mozilla.jp/firefox/security/phishing-protection/ )
- この機能は Google Safe Browsing API を使用している。
     - なお、ドキュメントに [StopBadware](https://www.stopbadware.org/) という組織へのリンクがあるのでここの提供するブラックリストを使っているのかと思ったけど[違うらしい](http://en.wikipedia.org/wiki/StopBadware#Google_and_StopBadware)。
- PC 版と Android 版の Firefox ではこの機能が有効。
- Firefox OS のブラウザではまだ有効になっていない。(Firefox OS 1.3 シミュレータで確認)
     - [Bug 839120 - Support SafeBrowsing in b2g](https://bugzilla.mozilla.org/show_bug.cgi?id=839120)
     - [Bug 778608 - Move SafeBrowsing.jsm to toolkit](https://bugzilla.mozilla.org/show_bug.cgi?id=778608)

## Google Safe Browsing API
- ドキュメント:
     - <https://developers.google.com/safe-browsing/>
     - <https://code.google.com/p/google-safe-browsing/>
- [Wikipedia](http://en.wikipedia.org/wiki/Google_Safe_Browsing) によると Chrome, Firefox, Safari でこの API が使われている。
- Safe Browsing API と Safe Browsing ***Lookup*** API がある。
- Safe Browsing API
     - フィッシングサイト/マルウェア配布サイトのブラックリストを取得する API。
     - 今回は使っていないのでよく調べていない。
- Safe Browsing Lookup API
     - URL がフィッシングサイト/マルウェア配布サイトかどうかクエリできる API。
     - 使い方はこちらのサイトが分かりやすい: [『Google Safe Browsing APIを使ってみる』](http://takahitokikuchi.poitan.net/2011/08/19/google-safe-browsing-api%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%8B/)
- 利用には API キーが必要。[こちら](https://developers.google.com/safe-browsing/key_signup)で取得できる。
- テスト URL:
     - <http://malware.testing.google.test/testing/malware/>
     - この URL はドメインが引けずサーバに接続できない。Android 版 Firefox ではテスト URL として使えない。(先に Host not found エラーとなるため。)
- 接続可能なテスト URL:
     - <http://ianfette.org/>
     - Chrome ブラウザの開発マネージャの [Ian Fette](https://www.facebook.com/ifette)  さんのドメインらしい。
     - よく使われてるみたいだけど正式なテスト URL なのか分らないので、本当はよろしくないかも。

## モバイル 版 (Android) と PC 版の挙動の違い
- モバイル版 Firefox とモバイル版 Chrome では、接続できない URL <http://malware.testing.google.test/testing/malware/> のブロック画面が出ず「サーバが見つかりませんでした」となる。
- PC 版 Firefox, Chrome では、同上の URL でもちゃんとブロック画面が出る。
	- モバイル版はブラックリストを保存せず Lookup API だけを使っている？そのための挙動の違い？
	- ブラックリスト利用で発生する通信料やリソース消費を避けるため、その可能性は高そうだけど。。。
- Chrome for Android のセーフブラウジングはデータ圧縮のためのプロキシで行われている。なのでローカルにブラックリストをダウンロードしていない(はず)。
	- [『Google、モバイル版Chromeのデータ圧縮機能を公式にリリース―データ量を最大50%節減』](http://jp.techcrunch.com/2014/01/16/20140115google-adds-optional-data-compression-feature-to-chrome-for-mobile-reducing-your-data-usage-by-up-to-50/)
	- [『Safe Browsing and Android』](http://googlesystem.blogspot.jp/2013/06/no-safe-browsing-for-android.html)
- Firefox for Android はこちらの記事によればローカルにブラックリストを落としているっぽい。
	- [『Phishing and malware protection arrives on mobile devices』](http://www.morbo.org/2012/10/phishing-protection-on-mobile.html)
	- ブラックリストのサイズは 40-50MB だったのが 5-6MB に削減されたらしい。
		- [『New SafeBrowsing backend』](http://www.morbo.org/2012/02/new-safebrowsing-backend.html)

