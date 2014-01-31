---
layout: post
title: "Mobile Chrome Apps を Android で３分で試してみる"
description: ""
category: 
tags: [Chrome, Cordova]
---
{% include JB/setup %}
<style type="text/css">
.short {
	font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Courier New', Courier, monospace;
}
</style>

Chrome アプリを Android, iOS ネイティブアプリにパッケージできる Mobile Chrome Apps が開発者向けにプレビュー発表されました。

- [Run Chrome Apps on mobile using Apache Cordova - Chromium Blog](http://blog.chromium.org/)

Google I/O 2013 で[その存在が明かされ](http://www.youtube.com/watch?v=f2tJRXDTMuY)、html5j スタッフの小松さんの[ブログで紹介](http://blog.livedoor.jp/kotesaki/archives/1861953.html)されて以来ずっと注目していましたが、昨年末の[予告通り](http://juggly.cn/archives/101462.html)ついに発表されました。

- 関連記事
	- [Google、ChromeアプリをiOS/Androidアプリに変換するツールと方法を公開。Apache Cordova、Node.jsなどを連係 － Publickey](http://www.publickey1.jp/blog/14/googlechromeiosandroidapache_cordovanodejs.html)
	- [Chrome AppsをAndroid/iOSネイティブアプリに容易に変換できるツールチェインをGoogleが提供 - TechCrunch Japan](http://jp.techcrunch.com/2014/01/29/20140128google-brings-chrome-apps-to-android-and-ios/)

## Mobile Chrome Apps とは？

Mobile Chrome Apps は、クロスプラットフォームのモバイルアプリ開発フレームワーク [Apache Cordova](http://cordova.apache.org/) を Chrome アプリ向けにカスタマイズしたものです。Google のエンジニアを中心に GitHub 上で開発を続けているプロジェクトです。

- Mobile Chrome Apps: <https://github.com/MobileChromeApps/mobile-chrome-apps>

Cordova という聞き慣れない名前よりも PhoneGap のほうがご存知の方は多いと思います。Cordova は PhoneGap のオープンソース版です。

Cordova は iOS や Android の WebView 上で動く、いわゆるハイブリッドアプリの開発プラットフォームです。Cordova はネイティブ機能 (コンタクトリスト等) にアクセスするための共通 API (Cordova API) を提供することで、クロスプラットフォームなハイブリッドアプリを実現します。

Mobile Chrome Apps では Cordova に Chrome API の互換 API をプラグインとして提供します。また、Cordova のコマンドラインツール (CLI) に Chrome アプリをパッケージ化するための拡張を加えています。

Chrome アプリ (Chrome Packaged Apps) はローカル PC にインストールされてオフラインでも動かせるパッケージ型の Web アプリですので、Chrome API を提供すれば Android, iOS のハイブリッドアプリとしてパッケージすることができます。 

たまたまさっき見つけたのですが、プロジェクトの中心人物の一人 Michal Mocny さんのスライドが公開されていました。

- [Porting Chrome Packaged Apps to Mobile using Cordova](https://docs.google.com/presentation/d/1H8MPv-nB0NrsRiPl4LlPPeB3O3xQKyqlpBls2auYvN8/)

PhoneGap Day US 2013 のスライドです。プロジェクトの概要と Mobile Chrome Apps の提供する Chrome 互換 API について紹介されています。 
[動画](http://phonegap.com/blog/2013/10/11/porting-chrome-apps/)もありますね。

## Mobile Chrome Apps を３分で試してみる

Mobile Chrome Apps による iOS, Android アプリの作り方は既に @adamrocker さんが[紹介されています](http://www.adamrocker.com/blog/342/build-android-ios-app-from-chrome-apps.html)ので、ここでは node.js や Android SDK のインストールが必要ないもっと簡単な方法を試します。

Chrome ADT という Mobile Chrome Apps チームがリリースしている Android アプリを使います。本当に３分で試せるかは慣れ次第ですw

1. Android でこちらの URL から APK ファイルを落としてインストールします。
	- Short URL: <a class="short" href="http://goo.gl/rjIR72">http://goo.gl/rjIR72</a>
	- <a class="small" href="https://github.com/MobileChromeApps/harness/releases/download/v0.2.0-alpha/ChromeADT.apk">(https://github.com/MobileChromeApps/harness/releases/download/v0.2.0-alpha/ChromeADT.apk)</a>
<br><br>

2. インストールされた "Chrome ADT" というアプリを起動します。

	![](/assets/posts/2014-01-31/adt.png)

3. [Add App] ボタンをタップします。

	![](/assets/posts/2014-01-31/addapp.png)

4. リストボックスで ".crx file" を選択します。

	![](/assets/posts/2014-01-31/crx.png)

5. "Enter URL" の入力フィールドに以下の URL を入力して [Add] ボタンをタップします。
	- Short URL: <a class="short" href="http://goo.gl/Fo7XSQ">http://goo.gl/Fo7XSQ</a>
	- <a class="small" href="https://clients2.google.com/service/update2/crx?response=redirect&x=id%3Dpcbbhbaibaphjlbaoahmahgmncbdkeli%26uc">(https://clients2.google.com/service/update2/crx?response=redirect&x=id%3Dpcbbhbaibaphjlbaoahmahgmncbdkeli%26uc)</a>

	![](/assets/posts/2014-01-31/url.png)

	- ここで QR コードを使うことも出来ます。[Scan QR Code] ボタンで以下の QR コードを読み取り [Add] ボタンをタップします。

	![](/assets/posts/2014-01-31/qrcode.gif)

6. [Launch] ボタンをタップします。

	![](/assets/posts/2014-01-31/launch.png)

	- 以下のようにアプリが立ち上がるはずです。

	![](/assets/posts/2014-01-31/clock.png)

これは Dart で書かれたステキ時計アプリのサンプルなのですが、ご覧の通りレイアウトが合わず残念な感じになっています。

本来はこんな感じのものです。

![](/assets/posts/2014-01-31/clockorg.png)

他のサンプルもここにいくつかあります。

- <https://github.com/GoogleChrome/chrome-app-samples#mobile-support>

サンプルのほとんどは Chrome ウェブストアに上がっているようです。crx のダウンロード URL の作り方は[ここ](http://toton.hatenablog.com/entry/20110509/1304941515)が参考になります。

## HTML5 (Web 技術) で書くモバイルアプリが当たり前になる日

Mobile Chrome Apps の発表により、Google が HTML5 (Web 技術) による Android アプリ開発を公式にサポートする可能性が見えてきたのではないかと思います。

Chrome アプリは既に Windows, Mac OS X, そして[最近シェアを上げてきている ChromeBook](http://jp.techcrunch.com/2013/12/29/20131228googles-chromebooks-have-hit-their-stride/) で動きます。ここに Android を加えることで、かなり割合のデバイスを Chrome 
アプリでカバーできることになります。ちなみに、Windows 8 に至っては[デスクトップを乗っ取るような試み](http://ggsoku.com/2014/01/google-chrome-32-windows-8-mode-like-chrome-os/)も始めています。

Android 4.4 KitKat からは WebView が Chrome ベースになりましたので、ハイブリッドアプリとはいえかなり高い互換性が期待できるのではないでしょうか。

(ここからは妄想)

とはいえ、Mobile Chrome Apps は過渡期の実験的なプロジェクトなのではないかと思います。
Google が本格的に Android で Web アプリをサポートする際には、ハイブリッドアプリではなく Android に直接 Chrome アプリがインストール出来るようになり、さらには Google Play に Chrome ウェブストアが統合されるのではないかと思います。

そして Andoroid は Tizen のような Web とネイティブの両方のプラットフォームをサポートした OS になるのではないでしょうか。

その頃には Firefox OS も今よりシェアを持ち、HTML5 (Web 技術) でモバイルアプリを書くのが当たり前になっているのかもしれません。

iOS は知らん。。。

