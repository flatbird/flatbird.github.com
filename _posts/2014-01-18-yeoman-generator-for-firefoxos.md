---
layout: post
title: "Firefox OS Yeoman Generator の使い方 [Firefox OS]"
description: ""
category: 
tags: [Firefox OS]
---
{% include JB/setup %}

<style>
.push-fail {
	font-size: smaller;
}
</style>

[Firefox OS ハッカソン](http://atnd.org/events/46352)があるので、[前回](http://atnd.org/event/fxoswin8hack)も使った Yeoman の Firefox OS 用ジェネレータの使い方をまとめてみた。

<p>
(参考) <a href="http://atnd.org/events/44739">関東 Firefox OS 勉強会 5th</a> の酒巻さんによる紹介<br>
<span class="indent">
	<a href="https://docs.google.com/presentation/d/1IW0UScdqbRGECDEy3U6zDtyprAyyNe4PoZGqX9VxITA/edit#slide=id.p">『フロントエンド技術社だってモバイル開発がしたいっ！』</a>
</span>
</p>

## Firefox OS Generator は３種類ある<br>使うのは generator-firefoxos

以前に使ったときに同じような名前のジェネレータがあって紛らわしいなーと思っていたので、改めて検索してみたら３種類あった。

	$ npm search yeoman-generator "firefox os"
	NAME                  DESCRIPTION                             AUTHOR      DATE              VERSION KEYWORDS
	generator-firefox-os  Yeoman Generator for Firefox OS         =zenorocha  2013-08-27 03:03  0.1.4  yeoman-generator firefoxos firefox-os firefox os
	generator-firefoxos   A Yeoman generator for Firefox OS apps  =ladybenko  2014-01-07 11:45  0.1.5  yeoman-generator firefoxos
	generator-fxos        Firefox OS Generator for grunt-fxos     =vladikoff  2013-06-27 19:15  0.1.1  yeoman-generator generator-yeoman

このうち、***generator-firefoxos*** が本命で、以下の２つはハズレ。

- **generator-firefox-os**
	- GitHub: <https://github.com/zenorocha/generator-firefox-os>
    - 単に [Boilerplate App](https://github.com/robnyman/Firefox-OS-Boilerplate-App) が入っているだけっぽい。 
	- ***generator-firefoxos*** と名前が似ていて非常に紛らわしい。
 
- **generator-fxos**
	- GitHub: <https://github.com/vladikoff/generator-fxos>
	- 同じ作者による [grant-fxos](https://github.com/vladikoff/grunt-fxos) が入っているだけ。
	- grant-fxos はけっこう色々できそうだけど generator-firefoxos ほど実用的でない。
	- 半年以上メンテされてない。

## generator-firefoxos の使い方

### GitHub
<a href="https://github.com/pdi-innovation/generator-firefoxos" class="indent">https://github.com/pdi-innovation/generator-firefoxos</a>

### Yeoman 本体のインストール
	$ sudo npm install -g yo

### generator-firefoxos のインストール
	$ sudo npm install -g generator-firefoxos

### プロジェクトの作成
	$ mkdir myapp
	$ cd myapp
	$ yo firefoxos

作成時にアプリ名や GitHub アカウントの情報、Gaia の [Building Blocks](http://www.buildingfirefoxos.com/) や Backbone を入れるか聞かれる。

### 実機へのインストール

	$ grunt push
	$ grunt reset 

<ul class="push-fail">
  <li>なお、Firefox OS v1.2, v1.3 (Geeksphone Peak) では push が固まってしまった。(v1.1 では成功)</li>
  <li>パッケージファイル (application.zip) のデバイスへの push は成功していた。</li>
  <li>node-firefoxos-cli の remote_debugger/index.js が送っている Remote Debug コマンドに対して応答がない。
    <ul>
      <li>{“to”: “root”, “type”: “listTabs”} を送っているが応答がない。</li>
      <li>このコマンドは<a href="http://www.slideshare.net/muneakinishimura/firefox-os-26501584" target="_blank">西村さんのスライド</a>で
"デバッガの提供する機能一覧の要求" であると説明されている。</li>
    </ul>
  </li>
  <li>App Manager に対応した際に何か変わったのかも？(App Manager のサポートは Firefox OS 1.2 以降)</li>
</ul>

### ブラウザ上での開発

以下のコマンドでローカルにサーバを起動してブラウザでアクセスする。

	$ grunt server

- ブラウザで http://localhost:9000 を開く。
- Firefox のレスポンシブデザインビュー (Mac OS なら ⌥⌘M) を使うとよい。Keon なら画面サイズは 320x480 となる。
- `grunt watch` も走るので Sass の変更もリアルタイムで反映される。
- アウトプットは .tmp/ ディレクトリに出来る。なので App Manager でディレクトリからインストールするときは app/ でなく .tmp/ ディレクトリからインストールする。

### JSHint
- `grunt push` や `grunt server` では自動的に JSHint のチェックが入る。
- 単体では `grunt jshint` で実行。
- .jshintrc から設定を変えられる。(参考: <http://www.jshint.com/docs/>)

### Sass (SCSS)
- デフォルトでは Sass が使われている。
- SCSS を使いたい場合は app/styles/main.sass を main.scss に置き換える。(もちろん中身も変更)

### テスト
<ul>
  <li>Mocha (テストフレームワーク), Sinon (モックライブラリ), Chai (アサーションライブラリ) が使われている。</li>
  <li>test/specs/ にテストを追加する。新たに追加したファイルは test/index.html 内の RequireJS のリストにも反映する。</li>
  <li>テストの実行 (PhantomJS)</li>
	<pre><code>$ grunt test</code></pre>
  <li>テストの実行 (ブラウザ)
    <ul>
      <li>以下のコマンドを実行し、Firefox Nightly で http://localhost:9002 を開く。</li>
    </ul>
  </li>
    <pre><code>$ grunt server:test</code></pre>
</ul>

### その他
- [How to develop apps for Firefox OS](https://github.com/pdi-innovation/generator-firefoxos/wiki/How-to-develop-apps-for-Firefox-OS)
	- 親切なチュートリアル。
- [What's included out of the box (and why)](https://github.com/pdi-innovation/generator-firefoxos/wiki/What%27s-included-out-of-the-box-%28and-why%29)
	- ディレクトリ構成や利用しているパッケージの説明。

