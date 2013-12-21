---
layout: post
title: "Evernote Mac でノートの位置情報をオフにする"
description: ""
category: 
tags: [Evernote, Security]
---
{% include JB/setup %}

今日、Evernote で作ったノートに URL を追加しようとしてノート情報を開いたら、位置情報になんと自宅住所がバッチリと載っていてドッキリしました。
こんなカンジ。

![](/assets/posts/2013-12-21/evernote_location.png)

どうも、新規作成したノートに自動で位置情報が付く設定になってしまっているらしい。

[Evernote 公式](https://evernote.com/intl/jp/privacy/data_usage.php)によると Evernot Mac で「ユーザが Evernote を最初に起動する際、ユーザの位置情報へのアクセス許可を求めてきます。」とあります。どうも、これを許可してしまっていたらしいです。

調べてみたら、ノートブックを共有すると位置情報も公開されるらしい。ダメじゃん。。。

そこで、新規ノートに位置情報が付くのをオフにする方法と、位置情報が付いている既存ノートを探す方法を調べてみました。

## Evernote Mac の位置情報サービス利用をオフにする

「システム環境設定」 > 「セキュリティとプライバシー」を開き、以下の画面で Evernote の位置情報サービス利用を無効にします。

![](/assets/posts/2013-12-21/privacy_location.png)

## 位置情報が付いている既存ノートを探す

- 位置情報つきノートを探すには Evernote の検索ボックスに以下を入力します。

	`latitude:*`

- 位置情報つきの共有ノートを探すには、以下を入力します。

	`latitude:* shareDate:*`

こちらの方法は以下のサイトに載っていました。ありがとうございます。

- [Evernoteの位置情報を使う（8） - プライバシーを守るためにノートから位置情報を「自動で」削除する](http://szk3s-scripts-in.tumblr.com/post/35913715963/evernote-8)

ノートの位置情報をまとめて削除するスクリプトも公開されているそうです。

- [Evernoteの位置情報を使う（5） - ノートから位置情報を削除する](http://szk3s-scripts-in.tumblr.com/post/18847430763/delete-geotag)


以上、Evernote Mac のノート位置情報をオフにするお話でした。



