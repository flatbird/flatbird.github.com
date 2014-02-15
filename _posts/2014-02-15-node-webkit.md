---
layout: post
title: "Web 技術で PC のアプリが作れる node-webkit"
description: ""
category: 
tags: []
---
{% include JB/setup %}

最近 node-webkit の記事をいくつか目にしたので試してみました。

## GitHub
<https://github.com/rogerwang/node-webkit>

## node-webkit とは
- PC の GUI アプリを実装する Chronium ベースのランタイム。
- Windows, Mac OSX, Linux のアプリが作れる。
- もともとインテルで開発されていたものがオープンソース化されたらしい。

## node-webkit のいいところ
- Web 技術 (HTML/CSS/JavaScript) で PC の GUI アプリが作れる。
- node.js のモジュールが使える。
- Webkit の HTML5 機能が使える。

## 使い方

(1) 公開されている [Prebuilt binaries](https://github.com/rogerwang/node-webkit#downloads) からターゲット環境のバイナリをダウンロード。

(2) HTML とマニフェストファイルを用意する。

[index.html]

~~~
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node.js <script>document.write(process.version)</script>.
  </body>
</html>
~~~

[package.json]

~~~
{
  "name": "nw-demo",
  "main": "index.html"
}
~~~

(3) ZIP に固める

~~~
$ zip app.nw index.html package.json
~~~

なお、動かすだけなら ZIP に固めなくても package.json のあるフォルダを指定するだけで良い。

### OSX での実行

node-webkit.app/Contents/MacOS/node-webkit にパスを指定して実行する。

~~~
$ node-webkit.app/Contents/MacOS/node-webkit app.nw
~~~

### Windows での実行

nw.exe にパスを指定して実行する。

~~~
nw.exe app.nw
~~~

### ツールバーを消す

マニフェストに以下を追加する。

~~~
"window": { "toolbar": false }
~~~

## 配布用パッケージの作成

もろもろ含んだ配布用のパッケージを作成するには。

### OSX 用パッケージの作成
node-webkit.app の Contents/Resources フォルダに ZIP に固めた app.nw を配置する。

~~~
$ cp app.nw node-webkit.app/Contents/Resources/
~~~

- または、Contents/Resources/app.nw フォルダを作成し package.json 他のファイルを配置する。
- これを .dmg ファイルに固めて配布すればよい。

### Windows 用パッケージの作成

~~~
copy /b nw.exe+app.nw app.exe
~~~

- 同梱されている .dll と同じフォルダで実行する必要があるため、.dll も一緒に配布する。
- アイコンとかを変えたい場合はリソースエディタを使う。

## ドキュメント
- Manifest format
	- <https://github.com/rogerwang/node-webkit/wiki/Manifest-format>
- Native UI API Manual
	- <https://github.com/rogerwang/node-webkit/wiki/Native-UI-API-Manual>
	- メニューとかシステムトレイアイコンとか。
- サンプル
	- <https://github.com/zcbenz/nw-sample-apps>

## 参考
- [node.jsを組み込んでローカルアプリケーション風に動作「node-webkit」](http://www.moongift.jp/2013/07/20130705/)
- [node-webkit を触ってみた](http://blog.geta6.net/post/58781350291/node-webkit)
- [nodeベースでGUIアプリを開発する「node-webkit」](http://ameblo.jp/ca-1pixel/entry-11765019318.html)
