---
layout: post
title: "Firefox Marketplace API で遊ぼう"
description: ""
category: 
tags: [Firefox OS]
---
{% include JB/setup %}

<style type="text/css">
.indent a, .center a {
	font-size: 1.2rem;
}

img.inline {
	display: inline;
}
</style>

[Firefox OS Advent Calendar 2013](http://www.adventar.org/calendars/103) の 8 日目 12/8 の記事です。

ひらとり ([@flatbirdH](https://twitter.com/flatbirdH)) です。好きな勉強会会場は Mozilla Japan オフィス@六本木です。

今日は、Firefox Marketplace API をご紹介します。

Firefox Marketplace API は Firefox OS のアプリマーケット [Firefox Marketplace](https://marketplace.firefox.com/) の色々な機能にアクセスできるステキ Web API です。

![Marketplace Logo](/assets/posts/2013-12-08/mktplace.png)

### Firefox Marketplace API を試してみる

早速ですが、Search API をコールする以下の URL をクリックしてみて下さい。<br>
これは、キーワード "twitter" でアプリを検索するリクエストです。JSON 形式でレスポンスが返ってきます。

<p class="indent">
	<a href="https://marketplace.firefox.com/api/v1/apps/search/?q=twitter&amp;app_type=hosted&amp;format=JSON">https://marketplace.firefox.com/api/v1/apps/search/?q=twitter&amp;app_type=hosted&amp;format=JSON</a>
</p>

このように、Firefox Marketplace API は REST API で簡単に利用できます。

ちなみに、筆者はこのような JSON 形式の API を試すときは curl と jq を使っています。もっといい方法があったら教えて下さい。

	$ curl https://marketplace.firefox.com/api/v1/apps/search/?q=twitter&app_type=hosted&format=JSON | jq .

### CORS とか Rate-limit とか

Firefox Marketplace API は CORS (Cross-Origin Resource Sharing) に対応していますので XHR でアプリからも使えます。

Rate-limit は今のところ Abuse API と Feedback API にしか掛かっていません。かなり自由に使えます。色々作れそう！

### アプリの種類

Firefox Marketplace は Firefox OS アプリだけでなく、PC 版 Firefox アプリと Android 版 Firefox アプリをホストしています。Firefox Marketplace API でもこれらのアプリ情報を統一して扱います。API では以下のように区別されています。

- "desktop"
- "android-mobile"
- "android-tablet"
- "firefoxos"

## Firefox Marketplace API の公式ドキュメント

Firefox Marketplace API の公式ドキュメントはこちらです。詳しい使い方はこちらを参照してください。
<p class="indent">
	<a href="https://firefox-marketplace-api.readthedocs.org/en/latest/">https://firefox-marketplace-api.readthedocs.org/en/latest/</a>
</p>

## Firefox Marketplace API で出来ること

Firefox Marketplace API で出来ることの例として、筆者が作ったアプリを２つご紹介します。

### Firechart
![Firechart](/assets/posts/2013-12-08/firechart.png)

<p class="center">
	<a href="http://www.firechart.info/">http://www.firechart.info/</a>
</p>

- Firefox Marketplace の情報をグラフで表示します。
- Firefox のホスト型アプリとしても公開しています。時々止まっているのはご愛嬌です。
- Firefox Marketplace の日次ダンプの Export データを利用しています。

### Firefox Marketplace for Tizen

<p class="center">
	<img class="inline" src="/assets/posts/2013-12-08/tizen-1.png">
	<img class="inline" src="/assets/posts/2013-12-08/tizen-2.png">
</p>
- Tizen OS 上で Firefox のホスト型アプリをあたかも普通のアプリのように起動する Tizen アプリです。
- Search API を利用して Firefox Marketplace のホスト型アプリを検索します。
- [LT](http://flatbird.github.io/LT-fxos-marketplace/) のために作ったネタアプリでなので怒らないで下さい...。公開もしてません。

このように、Firefox Marketplace API を使うことで Marketplace の情報にアクセスする色々なアプリやサービスを作れます。実際、Firefox OS にプリインの Marketplace アプリ [Fireplace](https://github.com/mozilla/fireplace) も Firefox Marketplace API を利用して実装されています。


## 色々な API

Firefox Marketplace API では、アプリ情報の検索・取得だけでなく Marketplace のほとんどの機能にアクセスすることができます。多くの API が情報の取得 (GET) だけでなく、作成 (POST)、更新 (PUT)、削除 (DELETE) に対応しています。

ここで、筆者の好きな API/気になる API のトップ 10 を決めてみました。

### 1. [Export API](https://firefox-marketplace-api.readthedocs.org/en/latest/topics/export.html)
- アプリ情報の日次ダンプデータを tarball で丸ごと取得できます。気前がいい！
- 無造作に .tgz ファイルが置いてあるだけでこれが果たして API なのかも怪しいですが、そんな大胆なところもステキです。

### 2. [Search API](https://firefox-marketplace-api.readthedocs.org/en/latest/topics/search.html)
- Marketplace API の王道 Search API はやはり外せませんね。
- Manifest URL もとれるので、[Apps.instal API](https://developer.mozilla.org/ja/docs/Web/API/Apps.install) でインストールもできます。

### 3. [Statistics API](https://firefox-marketplace-api.readthedocs.org/en/latest/topics/stats.html)
- Marketplace に登録されたアプリ数の推移やインストール数といった統計情報が取れます。
- Firefox OS が来るのか来ないのか？ マーケットの成長をウォッチできます。
- FireChart を作る前に欲しかった！

### 4. [Ratings](https://firefox-marketplace-api.readthedocs.org/en/latest/topics/ratings.html)
<ul>
<li>アプリのレーティング情報にアクセスできます。</li>
<li>各レーティング情報に含まれるコメント、ユーザ名、星の数、全て取れます！コメントが生々しい、...っていうかスペイン語(?) が多くて読めない!</li>
<li>レーティングをスパム報告する (Flagging as spam) なんて API もあります。</li>
</ul>

### 5. [App Features API](https://firefox-marketplace-api.readthedocs.org/en/latest/topics/features.html)
<ul>
<li>Firefox OS のサポートする色々な機能 ("TCP Sockets" とか "Simple Push" とか) の一覧がとれます。<a href="https://marketplace.firefox.com//api/v1/apps/features/">
https://marketplace.firefox.com//api/v1/apps/features/</a> を試してみてください。
</li>
<li>沢山の機能が Web API で実現されていて、ながめていると夢が広がります。どんどん増えて欲しいなー。
</li>
</ul>

### 6. [Site API](https://firefox-marketplace-api.readthedocs.org/en/latest/topics/site.html)
<ul>
<li>アプリのカテゴリ、キャリア、リージョンの一覧などが取れます。</li>
<li>キャリアに KDDI がいるねーとか、リージョンに China があるのに Japan がないのは何でだ！ぐぬぬ...とかできます。</li>
<li>Marketplace の設定が取れる <a href="https://marketplace.firefox.com/api/v1/services/config/site/">Configuration API</a> なんていう誰得 API もあります。</li>
</ul>

### 7. [Rocketfuel API](https://firefox-marketplace-api.readthedocs.org/en/latest/topics/rocketfuel.html)
<ul>
<li>Marketplace で<a href="http://jp.techcrunch.com/2013/09/03/20130902apple-microsoft-and-google-could-learn-something-from-mozillas-app-store-prototype">開発中の新機能</a>のための API みたいです。</li>
<li>こんなのも無造作にオープンにされててドキュメントまであるのが素敵です。</li>
</ul>

### 8. [Feed API](https://firefox-marketplace-api.readthedocs.org/en/latest/topics/feed.html)
- 現在の Marketplace API は Version 1 (v1) なのですが、なんとこれは v2 の API です。
- 将来 Rocketfuel で利用する機能として、他の API のデータのコンテナとなる "Feed" のストリームを操作するらしいです。

### 9. [Accounts API](https://firefox-marketplace-api.readthedocs.org/en/latest/topics/accounts.html)
<ul>
<li>自分のアカウントの情報や Marketplace 上での権限 ("admin", "developer", "localizer", "lookup", "reviewer") を確認できます。</li>
<li>インストール済アプリの一覧も見られるみたいです。</li>
</ul>

### 10. [Abuse API](https://firefox-marketplace-api.readthedocs.org/en/latest/topics/abuse.html)
- 不正なアプリ・ユーザをタレ込める API です。いつか使ってみたい!
- 30 リクエスト/時のレート・リミットがかかっています。

## その他のトピック

### 認証 (Authentication) 

情報を変更する API やユーザ自身の情報にアクセスする API には認証が必要になります。Firefox Marketplace API では Persona と OAuth の２種類の認証方法をサポートしています。

#### (参考)
- [Authentication](https://firefox-marketplace-api.readthedocs.org/en/latest/topics/authentication.html)
- [Persona クイックセットアップ](https://developer.mozilla.org/ja/docs/Mozilla/Persona/Quick_Setup)
- [Fireplace のソース](https://github.com/mozilla/fireplace/blob/master/hearth/media/js/login.js#L86)

### Zamboni

Zamboni は Firefox Marketplace と Firefox の [Add-ons](https://addons.mozilla.org/) サイトのソースコードです。Firefox Marketplace API のソースもここに含まれますので、詳しく調べることが出来ます。

- [Zamboni](https://github.com/mozilla/zamboni)

------
今日は Firefox Marketplace API をご紹介しました。かなり色々なことが出来そうなので、機会があれば使ってみてください。




