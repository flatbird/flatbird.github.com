---
layout: post
title: "Firefox OS のホームスクリーン切り替えを調べてみた"
description: ""
category: 
tags: [Firefox OS]
---
{% include JB/setup %}

Firefox OS のホームスクリーン切り替え機能について調べてみました。

ホームスクリーン切り替えは Firefox OS 1.3 から入っています。

- [B2G/Roadmap 1.3 Features](https://wiki.mozilla.org/B2G/Roadmap#1.3_Features) "System: Haida: Replaceable Homescreen prototype [898330](https://bugzilla.mozilla.org/show_bug.cgi?id=898330)"


## ホームスクリーン切り替えの仕組み

マニフェストに `"role": "homescreen"` が設定されているアプリがホームスクリーンアプリとして認識されます。以下は Firefox OS 組み込みのホームスクリーンの [manifest.webapp](http://mxr.mozilla.org/gaia/source/apps/homescreen/manifest.webapp) の抜粋ですが、こちらにも `"role": "homescreen"` が設定されています。

``` javascript
2   "name": "Homescreen",
3   "description": "Gaia Homescreen",
4   "launch_path": "/index.html#root",
5   "type": "certified",
6   "role": "homescreen",
```

このように `"role": "homescreen"` が設定されたアプリが複数インストールされていると、Firefox OS の設定で "Homescreen" の項目が表示されるようになります。

![homescreen setting](/assets/posts/2014-04-29/homescreen.png)

この表示の切り替えは Settings アプリ ([gaia/apps/settings](http://mxr.mozilla.org/gaia/source/apps/settings/)) の以下の部分で行っています。ホームスクリーンアプリの数に応じて "homescreen-section" の hidden プロパティを切り替えます。

- [gaia/source/apps/settings/js/try\_show\_homescreen\_section.js](http://mxr.mozilla.org/gaia/source/apps/settings/js/try_show_homescreen_section.js)

``` javascript
27   function updateHomescreenSectionVisibility() {
28     var hideHomescreen = homescreenCount < 2;
29     document.getElementById('homescreen-section').hidden = hideHomescreen;
30   };
```

設定でホームスクリーンアプリを変更すると、以下のコードで、新たに選択されたホームスクリーンアプリのマニフェスト URL を設定項目の "homescreen.manifestURL" に格納します。

- [gaia/apps/settings/js/homescreen.js](http://mxr.mozilla.org/gaia/source/apps/settings/js/homescreen.js#41)

``` javascript
41   handleChangeHomescreen: function handleChangeHomescreen(evt) {
42     var index = this._detailButton.dataset.appIndex;
43     this.setHomescreen(this._apps[index].manifestURL);
44   },
45 
46   setHomescreen: function setHomescreen(homescreenManifestUrl) {
47     this._settings.createLock().set({
48       'homescreen.manifestURL': homescreenManifestUrl
49     });
50   },
```

実際のホームスクリーンの起動は Gaia の System アプリ ([gaia/apps/system](http://mxr.mozilla.org/gaia/source/apps/system/)) が行います。"homescreen.manifestURL" に設定されたマニフェストを使用してアプリを起動します。(参考: [homescreen_launcher.js](http://mxr.mozilla.org/gaia/source/apps/system/js/homescreen_launcher.js))

なお、ホームスクリーンアプリの背景には選択済の壁紙が自動的に表示されるようです。仕組みはまだ調べていません。

## ホームスクリーン切り替えを試してみる

ホームスクリーンの切り替えは以下の FTP からダウンロードできる B2G デスクトップクライアントで手軽に試せます。

- [http://ftp.mozilla.org/pub/mozilla.org/b2g/nightly/latest-mozilla-central/](http://ftp.mozilla.org/pub/mozilla.org/b2g/nightly/latest-mozilla-central/)

Mac なら B2G.app (Windows なら b2g.exe) をクリックするだけで起動出来ると思います。
こちらのビルドには通常のホームスクリーンの他に、開発ビルド用の "homescreen2" が入っているので、自分でホームスクリーンをインストールしなくても設定に "Homescreen" 項目が表示されます。

なお、設定画面を開いたら何もせずに 4 秒ちょっと待って下さい。"Homescreen" 項目を表示するか判定するためには、全アプリをチェックしてホームスクリーンアプリの数をカウントする必要があります。設定画面を開いた際にこの負荷がかかるのを避けるため、Settings アプリは [Idle API](https://wiki.mozilla.org/WebAPI/IdleAPI) で 4 秒待ってからチェックを開始します。

開発ビルド用に含まれる "homescreen2" に変更すると以下のような縦スクロールの簡易ホームスクリーンになります。

![homescreen2](/assets/posts/2014-04-29/homescreen2.png)

## ホームスクリーンアプリを自作できるか？

マニフェストに `"role": "homescreen"` を含む自作アプリをインストールしてホームスクリーンを切り替えることはできます。

ただし、他のアプリの情報取得と起動に必要な [Apps.mgmt API](https://developer.mozilla.org/en-US/docs/Web/API/Apps.mgmt.getAll) の利用には "webapps-manage" の認定 (certified) パーミッションが必要になります。

なので、今のところサードパーティーの開発者はまともに動作するホームスクリーンアプリを開発して公開することは出来ません。

