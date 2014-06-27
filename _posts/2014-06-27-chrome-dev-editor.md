---
layout: post
title: "ワクワクする Chrome Dev Editor - 話題の Material Design も！"
description: ""
category: 
tags: [Chrome]
---
{% include JB/setup %}

昨日 Twitter で Google I/O の情報をチェックしていたら、"Chrome Dev Editor" というものの情報が流れてきました。触ってみたらワクワクする面白いものだったので記事を書きました。

## Chrome Dev Editor とは

Chrome Dev Editor は開発者向けエディタで、主に Chrome 向けの Web アプリを開発するための開発ツールです。Chrome アプリとして実装・配布されています。

![](/assets/posts/2014-06-27/cde.png)

Chrome アプリなので Windows でも Mac でも Chromebook でも動きます。Chrome ウェブストアで気軽にインストール出来て、オフラインでも利用できます。Google の Dart チーム(?) が開発しているらしく、Dart で書かれています。

Chrome Dev Editor は現在 Developer Preview で、Chrome ウェブストアからインストールできます。GitHub でソースも公開されています。

- [Chrome Dev Editor (developer preview)](https://chrome.google.com/webstore/detail/chrome-dev-editor-develop/pnoffddplpippgcfjdhbmhkofpnaalpg)
- GitHub: <https://github.com/dart-lang/chromedeveditor>

Web 技術で作られた開発用エディタというだけでも興味深いのですが、Chomebook 上で Chrome アプリで出来た開発ツールで Chrome アプリを開発するという、Chrome だけで完結した Chrome 漬けの開発環境が出来るのも面白いところです。

## けっこう多機能

Developer Preview なので単純なエディタとしての機能もまだ怪しいところもありますが、一方で Chrome Dev Editor は色々と高機能です。

触ってみてまず良かったのが、Vim のキーバインディングに変更できるところです。Emacs もあります! 設定画面で "Default" から "Vim"、"Emacs" に変更できます。

<div class="center">キーバインディング設定</div>
![](/assets/posts/2014-06-27/setting.png)
 
Git や bower も使えます。
そして、Markdown のプレビューも可能です。とりあえず手軽な Markdown エディタとして使うのも良いかもしれません。

<div class="center">Markdown プレビュー</div>
![](/assets/posts/2014-06-27/markdown.png)

アプリの実行機能もあります。.html ファイルなどを開いている時に Run ボタンを押すとローカルサーバが立ち上がり、Chrome ブラウザによる動作確認が可能です。

<div class="center">Web アプリの実行</div>
![](/assets/posts/2014-06-27/webapp.png)

対象プロジェクトが Chrome アプリなら、ブラウザではなく単独ウィンドウで Chrome アプリが起動されます。

実装済みの機能や将来予定している機能にはこちらの FAQ ページに掲載されています。

- <https://github.com/dart-lang/chromedeveditor/blob/master/doc/FAQ.md>

## ワクワクするプロジェクトテンプレート

Chrome Dev Editor で自分が特に面白いと感じたのはプロジェクトテンプレートの数々です。メニューから "New Project" でプロジェクトを作る際にテンプレートを選べます。

![](/assets/posts/2014-06-27/project_templ.png)

筆者が最近気になっていて触ってみないと…と思っていたものが色々と詰め合わせになった、嬉しいテンプレート群です。

### Polymer テンプレート ("JavaScript web app using Polymer")

Polymer を使った Web アプリのテンプレートです。

![](/assets/posts/2014-06-27/hellopolymer.png)

Google I/O のキーノートで発表された UX の新体系「[Material Design](http://www.publickey1.jp/blog/14/googleuxmaterial_designgoogle_io_2014.html)」も Web 向けには Polymer で提供されます。これは是非試さねば、、、と思っていた所に、丁度良いテンプレートが見つかりました。筆者はこれまで Polymer を触ったことがなかったのですが、おかげで簡単に試すことができました。

### Web Starter Kit

Google I/O に先立ち先週末に発表された「[Web Starter Kit](https://developers.google.com/web/starter-kit/)」。こちらも気になっていたのですが、Chrome Dev Editor には早速プロジェクトテンプレートが組み込まれていて、すぐに試すことが出来ました。素晴らしいです！

![](/assets/posts/2014-06-27/hellowebstarter.png)

ちなみに、このテンプレートには Firefox OS 用にしか見えない manifest.webapp が入ってるのですが、これはいったい？？？

- [manifest.webapp](https://github.com/dart-lang/chromedeveditor/blob/master/ide/app/lib/templates/web/web_starter_kit/app/manifest.webapp_)

``` javascript
{
  "version": "1.0.0",
  "name": "Web Starter Kit",
  "launch_path": "/index.html",
  "description": "A front-end template that helps you build fast, modern mobile web apps.",
  "icons": {
    "60": "/img/touch/touch-icon-60x60.png",
    "128": "/img/touch/touch-icon-128x128.png"
  },
  "developer": {
    "name": "",
    "url": ""
  },
  "installs_allowed_from": [
    "*"
  ],
  "default_locale": "en",
  "permissions": {
  },
  "locales": {
    "en": {
      "name": "Web Starter Kit",
      "description": "A front-end template that helps you build fast, modern mobile web apps."
    }
  }
}
```

### Chrome apps

Chrome アプリのテンプレートももちろんあります。

![](/assets/posts/2014-06-27/hellochromeapp.png)

Chrome ウェブストアへのデプロイと、さらには [Mobile Chrome Apps](https://github.com/MobileChromeApps/mobile-chrome-apps) による Android での動作確認が可能なようです。これには[以前の記事](http://flatbird.github.io/2014/01/31/mobile-chrome-apps-for-android-in-3-min/)で紹介した、[Chrome ADT](https://github.com/MobileChromeApps/chrome-app-developer-tool/releases) を使います。

Mobile Chrome Apps が正式にリリースされる日も近いのでしょうか？？？

## Chrome Dev Editor で Material Design

Material Design の Polymer elements が既に配布されているので、早速 Chrome Dev Editor で試してみました。

- メニューの "New Project" で "JavaScript web app using Polymer" プロジェクトを作成。
- bower.json に `"paper-elements": "Polymer/paper-elements"` を追加。
- プロジェクトを右クリックで "Bower install" を実行。
- index.html を以下のように書き換え。

``` html
<!DOCTYPE html>

<html>
<head>
  <title>Hello Material</title>
  <link rel="stylesheet" href="styles.css">
  <script src="bower_components/platform/platform.js"></script>
  <link rel="import" href="bower_components/paper-elements/paper-elements.html">
  <style>
    paper-button {
      background: #4285f4;
      color: #fff;
    }
    paper-button:hover {
      background: #2a56c6;
    }
  </style>
</head>

<body unresolved>
  <paper-button label="flat button"></paper-button>
</body>
</html>
```

これを実行すると、このように Material Design のボタンが表示されます。静止画だと何の変哲もないボタンですが、実際に動かすとエフェクトが面白いです。

![](/assets/posts/2014-06-27/material.png)

なお、Polymer の Material Design の情報はこちらで提供されています。

- <http://www.polymer-project.org/docs/elements/material.html>

こちらにはデモもあります。エフェクトが楽しい！

- <http://www.polymer-project.org/components/paper-elements/demo.html>

## 最近 Web IDE がアツい？

つい先日、Firefox Nightly には [WebIDE](http://www.mozilla.jp/blog/entry/10412/) が搭載され、これもとても便利だなーと思っていた矢先に、Chrome にも Chrome Dev Editor の登場です。

筆者はまだ触ったことはないのですが、「[Visual Studio "Monaco"](http://www.buildinsider.net/enterprise/visualstudiomonaco/01)」もとても面白いそうです。Web 技術で作られた IDE で Web アプリを作るのが当たり前になる日が、ついそこまで来ているみたいです。



