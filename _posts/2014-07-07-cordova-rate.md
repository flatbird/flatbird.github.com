---
layout: post
title: "Android の Cordova アプリの比率"
description: ""
category: 
tags: [Cordova, Android]
---
{% include JB/setup %}

先日 Google Play の Cordova アプリを調べた際、トップアプリでの Cordova アプリの比率は約 1 % でした。([参照: Cordova アプリの実態調査](http://flatbird.github.io/2014/06/10/cordova/))

この前、Android の Cordova アプリ率を調べるもっと良さげな方法を見つけました。

[AppBrain](http://www.appbrain.com/) でアプリの使用ライブラリの統計情報を取っていて、開発ツール ("Developer tools") のカテゴリに Cordova/PhoneGap の使用率も掲示されています。

- [Android Developer tools](http://www.appbrain.com/stats/libraries/dev)

<img src="/assets/posts/2014-07-07/appb-cordova.png" style="width:100%">

本日 (2014/07/7) のデータは以下のようになっていました。

![](/assets/posts/2014-07-07/appb-cordova-percent.png)

"~% of apps" と "~% of installs" の説明は見つけられませんでしたが、それぞれ Google Play のアプリの情報と、ユーザの端末に実際にインストールされているアプリの情報でないかと思います。

だとすると、Google Play は 5.86% ということで、前回トップアプリを調べた際よりも Cordova アプリの比率は大きいようです。 

ただ、２週間くらい前に見た際はもっと少なかったと思いますので、けっこう変動の激しいデータなのかもしれません。

まぁ、何かの参考にはなるかと思います。


