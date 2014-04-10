---
layout: post
title: "Hera と Android と Chrome の統合"
description: ""
category: 
tags: [Android,Chrome]
---
{% include JB/setup %}


先日、海外のニュースサイト Android Police が Android の新しいプロジェクト "Hera" の噂を報じました。

![Hera top](/assets/posts/2014-04-10/hera_top.png)

[Rumor: Google's Plan To Bridge Chrome, Android, And Search To Do Everything On Your Device ［Updated］](http://www.androidpolice.com/2014/04/06/rumor-googles-plan-to-bridge-chrome-android-and-search-to-do-everything-on-your-device/)

Chrome を統括する Pichai 氏が Android の責任者を兼任して以来、Android と Chrome の統合がしばしば取り沙汰されますが、Hera はそれを思わせるプロジェクトのようです。しかし、まだ情報が少なく実像はよく分りません。元記事からの自分なりの理解を箇条書きにします。

- 簡単なアクションをアプリを開かず HTML5 の UI で Web 経由で実行できるようになる。
- Google ハングアウトを例にとると、新着メッセージの通知を受け、メッセージを表示し、リプライを返す、これらのアクションをアプリを開かずに行うことができる。
- Android のタスク一覧 (マルチタスキングビュー) が刷新され、これまでのアプリのスナップショットとともに Hara のタスクが表示されるようになる。

![Mutlitasking view](/assets/posts/2014-04-10/hera_taskview.png)

- Hera のタスクは Chromium のインスタンス上で実行される。このために、Android で動作してタスクを実行するための特別な Chromium のビルドが用いられる。
- Hera のタスクは共通したカード的な UI で表示される (?)
- 新しいマルチタスキングビューには、アプリ、Hera のタスク、検索クエリが統合されて表示される。
- 別のデバイスで検索した検索内容がカードとなってマルチタスクビューに表示される。
- Hera は Chrome Sync のような同期を行う。他のデバイスで開始したタスクは、新たなカードとしてマルチタスキングビューに追加される。
- この噂は 10 段階で 8 点の信頼度ということで確度の高い情報だけど、あくまで噂なので色々変わるかも。

以上、断片的な情報ですが、Android のタスク一覧が刷新され、Web アプリで簡単な操作をネイティブアプリを使わずに行えるようになるようです。

Hera の個々のタスクが Chrome ブラウザのタブのようなもので、それをタスク一覧で切り替えるようなイメージでしょうか。UI は Google Now のカードのようなシンプルなものを想定しているようです。このシンプルな UI は Android Wear へ発展していきそうな予感もします。

ネイティブアプリとの関係、特に Hera の各タスクの HTML5 コードがネイティブアプリのパッケージに含まれるのか、それとも Web でホストされるのか、はっきり書かれてはいませんが、マルチデバイスで同期されることを考えると Web でホストされるのでしょう。ネイティブアプリとのインタラクションには、もしやの Web Intents 的なものが登場するのかもしれません。

Chrome Apps が Web アプリをネイティブアプリに近づけていく方向で進んでいたので、Android と Chrome の統合も [Mobile Chrome Apps](http://flatbird.github.io/2014/01/31/mobile-chrome-apps-for-android-in-3-min/) や Firefox OS ような Web 技術によるネイティブアプリを想像していました。しかし、強力なネイティブアプリのプラットフォームを既に持っている Android では、サーバ側の Web のエクスペリエンスをプラットフォームに融合させる Hera のアプローチのほうがより有意義なことなのかもしれません。

ちなみに Hera はあのゼウスの恐ろしい正妻、女神ヘラのことみたいですね。



