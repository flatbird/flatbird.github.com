---
layout: post
title: "Firefox OS アプリの開発環境作りに「node-firefox」"
description: ""
category: 
tags: [Firefox OS]
---
{% include JB/setup %}

Mozilla Hacks で「[node-firefox](https://github.com/mozilla/node-firefox)」というのが紹介されていたので試してみた。ちなみに「[node-webkit](/2014/02/15/node-webkit/)」とは全く別用途。

『[Introducing node-firefox ✩ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2015/02/introducing-node-firefox/)』

### 概要

- node.js から Firefox OS のシミュレータを起動したりアプリをインストールしたりできる。
- WebIDE を使わずにコンソールからアプリがデプロイできる。
- node.js なので、grant や gulp でアプリ開発環境を構築できる。
- DevTools の [Remote Debugging Protocol](https://wiki.mozilla.org/Remote_Debugging_Protocol) を使用。
- 残念ながら、まだシミュレータのみで実機はサポートされていない。
- 現状は Mac OS がメイン。Windows は未サポート。Linux も出来ないことが多い。

### 出来ること

- デバッグ可能なランタイムを見つける。(リモートデバッギングのサーバを見つける)
- シミュレーターを見つけて起動する。
- ランタイムへの接続。
- アプリのインストール、起動、一覧取得、アンインストール。
- スタイルシートのリロード。

### 試してみた

#### 一連のモジュールをインストール。

``` bash 
$ npm install node-firefox-find-simulators
$ npm install node-firefox-start-simulator
$ npm install node-firefox-connect
$ npm install node-firefox-install-app
```

#### シミュレータを探して現在のフォルダからアプリをインストールする。

``` javascript
var startSimulator = require('node-firefox-start-simulator');
var connect = require('node-firefox-connect');
var installApp = require('node-firefox-install-app');
var findSimulators = require('node-firefox-find-simulators');

findSimulators().then(function(results) {
  // 2.x 以上のシミュレータに限定。1.x ではアプリインストールに失敗した。
  var sims = results.filter(function(simulator) {
    var major = parseInt(simulator.version.split('.')[0], 10);
    return (major >= 2);
  });
  if (sims.length > 0) {
    start({version: sims[0].version});
  }
});

function start(option) {
  startSimulator(option).then(function(simulator) {
    connect(simulator.port).then(function (client) {
      var path = process.cwd();
      installApp({appPath: path, client: client}).then(
        function (appid) {
          console.log('Installed: ' + appid);
        },
        function (err) {
          console.error('Error: ' + err);
        });
    });
  });
}
```

[README](https://github.com/mozilla/node-firefox/blob/master/README.md) によると、Cordova で Firefox OS の `cordova deploy` と `cordova emulate` を出来るようにするのにも使うらしい。 

絶賛開発中みたいなので、今後に期待です。

