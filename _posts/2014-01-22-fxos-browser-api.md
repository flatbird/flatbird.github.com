---
layout: post
title: "browser API [Firefox OS]"
description: ""
category: 
tags: [Firefox OS]
---
{% include JB/setup %}

<style type="text/css" media="screen">
table {
	margin-bottom: 2em;
}
td {
	border: 1px solid gray;
	padding: .5em;
}
</style>
<div id="out"></div>
Firefox OS の browser API を調べてみました。

## browser API とは

browser API は Firefox OS のアプリでブラウザを実装するための API です。browser API は &lt;iframe&gt; 要素を拡張して、Web アプリによるブラウザの実装を可能にします。

browser API では &lt;iframe&gt; に以下のような拡張が加えられています。

1. 拡張属性
	- &lt;iframe&gt; に特別な性質を与える属性。
	- 特に mozbrowser 属性の指定で &lt;iframe&gt; は特別な ***browser &lt;iframe&gt;*** となります。
2. 拡張メソッド
	- ***browser &lt;iframe&gt;*** を外部から操作する一連のメソッド。
3. 拡張イベント
	- ***browser &lt;iframe&gt;*** から発生する一連のイベント。

Firefox OS のブラウザは mozbrowser 属性を指定した ***browser &lt;iframe&gt;*** に URL を設定して Web サイトなどの埋め込みコンテンツを表示します。
そして、***browser &lt;iframe&gt;*** の goBack() /  goForward() などの拡張メソッドを使って「戻る」/「進む」といった操作を行います。

## パーミッション
browser API の利用には特権 (privileged) レベルのパーミッション "browser" が必要です。以下のようにマニフェストに指定します。

	{
	  "permissions": {
	    "browser": {}
	  }
	}

特権レベルのアプリなので Marketplace の審査が必要ですが、審査を通過すれば一般の開発者でもブラウザの機能を持つアプリを配布できることになります。

## 拡張属性

### mozbrowser 属性

	<iframe src="http://mozilla.org" mozbrowser>

- mozbrowser 属性は browser API のキモとなる属性です。
- mozbrowser 属性を追加することで、&lt;iframe&gt; が特別な ***browser &lt;iframe&gt;*** となります。
- ***browser &lt;iframe&gt;*** では window.top, window.parent, window.frameElement がフレーム階層を引き継がず、埋め込みコンテンツからは ***browser &lt;iframe&gt;*** がトップレベル・ウインドウに見えます。
	- 具体的には、(window.top === window), (window.parent === window), (window.frameElement === null) となります。
- また、X-Frame-Options ヘッダで &lt;iframe&gt; での表示が禁止されているコンテンツも表示できるようになります。


### remote 属性

	<iframe src="http://mozilla.org" mozbrowser remote>
   
 - remote 属性を付けることで埋め込みコンテンツが別プロセスでロードされます。
 - 埋め込みコンテンツ由来のフリーズやクラッシュ、悪意あるコンテンツによる攻撃といった問題からブラウザ本体を守るために基本的に常に付けておくようです。


### mozapp 属性

	<iframe src="http://mozilla.org" mozapp='http://path/to/manifest.webapp' mozbrowser>

 - Open Web App (Firefox アプリ) を &lt;iframe&gt; でロードするための属性です。属性値としてマニフェストファイルへの URL を指定します。
 - マニフェストファイル内でリクエストされたパーミッションでアプリがロードされます。
 - この属性の利用には "embed-apps" の認定 (certified) パーミッションが必要です。一般のアプリでは利用できません。
 - ドキュメントでは browser API の一部として mozapp 属性が説明されていますが、この属性はブラウザよりむしろ Firefox OS のサンドボックスを実現する鍵となる機能のようです。
 - このあたりの[資料](http://sssslide.com/www.slideshare.net/timdream/insight-gaia-os-shell-in-a-lthtml)を見ると、browser API はブラウザだけでなく、Firefox OS のサンドボックスを実現するための仕組みとして利用されていることが分ります。

## 拡張メソッド

***browser &lt;iframe&gt;*** が実装する拡張メソッドです。

- ナビゲーション系
     - reload(), stop()
     - goBack(), goForward()
     - getCanGoBack(), getCanGoForward()

- リソース管理系
     - setVisible(), getVisible() … 見えていないタブのリソースを解放するのに使う？
     - purgeHistory() … &lt;iframe&gt; のリソース (cookie, localStorage, cache 等) を削除する。

- イベント系
     - &lt;iframe&gt; での addEventListener(), removeEventListener(), dispatchEvent() のサポート。
     - sendMouseEvent(), sendTouchEvent()
     - addNextPaintListener() / removeNextPaintListener() … MozAfterPaint イベントのハンドラを設定・削除する。

- その他
     - getScreenshot() ... 埋め込みコンテンツのサムネイルを取る。

## 拡張イベント
**browser &lt;iframe&gt;** が送出する拡張イベントです。

<table>
<tbody>
  <tr><td>mozbrowserasyncscroll</td><td>browser &lt;iframe&gt; 内のスクロール位置の変更。</td></tr>
  <tr><td>mozbrowserclose</td><td>browser &lt;iframe&gt; 内の window.close() の呼び出し。</td></tr>
  <tr><td>mozbrowsercontextmenu</td><td>コンテキストメニューの呼び出し。</td></tr>
  <tr><td>mozbrowsererror</td><td>エラーハンドリング。</td></tr>
  <tr><td>mozbrowsericonchange</td><td>favicon の変更。</td></tr>
  <tr><td>mozbrowserloadend</td><td>ロード終了。</td></tr>
  <tr><td>mozbrowserloadstart</td><td>ロード開始。</td></tr>
  <tr><td>mozbrowserlocationchange</td><td>位置情報の変更。</td></tr>
  <tr><td>mozbrowseropenwindow</td><td>browser &lt;iframe&gt; 内の window.open() の呼び出し。</td></tr>
  <tr><td>mozbrowsersecuritychange</td><td>SSL state の変更。</td></tr>
  <tr><td>mozbrowsershowmodalprompt</td><td>alert(), confirm(), prompt() の呼び出し。</td></tr>
  <tr><td>mozbrowsertitlechange</td><td>タイトルの変更。</td></tr>
  <tr><td>mozbrowserusernameandpasswordrequired</td><td>HTTP 認証が必要な場合。</td></tr>
  <tr><td>mozbrowseropensearch</td><td>検索エンジンへのリンクが見つかった。</td></tr>
</tbody>
</table>

## サンプルコード

[MDN のサンプル](https://developer.mozilla.org/en-US/docs/WebAPI/Browser#Example)をインストール出来るようにしたものを GitHub に置きました。

<https://github.com/flatbird/FxOS-MdnBrowser-Example>

マニフェストでは type を "privileged" にして "browser" パーミッションを設定します。
<pre><code>"type": "privileged",
"permissions": {
  "browser": {}
}
</code></pre>

特権アプリなので以下のデフォルト CSP が適用され、外部のスクリプトやインラインスクリプトは禁止されます。
<pre><code>"default-src *; script-src 'self'; object-src 'none'; style-src 'self' 'unsafe-inline'"
</code></pre>

## リファレンス

<ul><li>
<a href="https://developer.mozilla.org/en-US/docs/WebAPI/Browser">
Using the browser API - WebAPI | MDN</a>
</li></ul>

### 参考資料
- [WebAPI/BrowserAPI - MozillaWiki](https://wiki.mozilla.org/WebAPI/EmbeddedBrowserAPI)
- [Security/B2G/Browser API - MozillaWiki](https://wiki.mozilla.org/Security/B2G/Browser_API)
- [Insight Gaia - OS Shell in a <html>](http://sssslide.com/www.slideshare.net/timdream/insight-gaia-os-shell-in-a-lthtml)
     - MozBrowser API について説明している。

- [FirefoxOS Application Security](http://people.mozilla.org/~ptheriault/FirefoxOSSec/)
     - [Ruxcon 2012](http://2012.ruxcon.org.au/)の資料。[動画](http://www.youtube.com/watch?v=8aVkRcBwW7s) もある。
     - こちらも、browser API について触れている。
