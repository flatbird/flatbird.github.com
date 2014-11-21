---
layout: post
title: "FxOSコードリーディングミートアップ＃１１に行ってきました"
description: ""
category: 
tags: [Firefox OS]
---
{% include JB/setup %}

去る11月15日、Firefox OS (FxOS) のソースコードを読んだりするグループ「FxOSコードリーディング」のミートアップに行ってきました。行ってきましたっていうか主催者側の一員ですが。。。

[FxOSコードリーディングミートアップ＃１１ : ATND](https://atnd.org/events/58292)

![](/assets/posts/2014-11-21/meetup.png)

ほぼ毎月開催しているミートアップは、ふだんは平日夜に特にアジェンダもなくコードを読んだり交流したりするイベントなのですが、今回は一周年記念ということで、休日開催のセミナー会でした。自分も Camera API について発表させて頂きました。

事前登録数が少なかったので、歩留まりを考えるとこじんまりした感じになるかと思いましたが、けっこう参加率がよく盛り上がりました。

こんな声も。。。
<blockquote class="twitter-tweet" data-partner="tweetdeck"><p>明らかに登録者の数より参加者の数の方が多い、歩留まり100%越えのイベントになっとる <a href="https://t.co/3gJcI7b7yM">https://t.co/3gJcI7b7yM</a> <a href="https://twitter.com/hashtag/fxos_read?src=hash">#fxos_read</a></p>&mdash; dynamis (でゅなみす＠もじら) (@dynamitter) <a href="https://twitter.com/dynamitter/status/533498648533819393">November 15, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

以下のような発表と LT がありました。

### ちょっとContacts API読んでみますね
- By 藪下正美(@aoi_nagatsuki)さん
- 数少ない Privileged API の中でも、プラットフォームの機能らしい機能を利用できることで魅力的な [Contacts API](https://developer.mozilla.org/en-US/docs/Web/API/Contacts_API) のお話です。
  - そういえば、自分も[日経 Linux さん記事](/2014/10/31/fxos-nikkei-linux-article)のサンプルアプリで Contacts API 使いました。２ヶ月くらい前なのに大昔に思えるな。。。
- [mozContact](https://developer.mozilla.org/en-US/docs/Web/API/mozContact) の定義は [WebIDL](https://github.com/mozilla/gecko-dev/blob/master/dom/webidl/Contacts.webidl) で見られるよーとか、[ContactManager.remove()](https://developer.mozilla.org/en-US/docs/Web/API/ContactManager.remove) に渡すオブジェクトには id しか指定しなくていいよーといったお話がありました。
- 実装を読んでみた話をしたかったそうですが、使い方だけでスライド数十枚になったので、読んでみた話は「藪下＠２課のガジェオタです」でおなじみの(?)、[GCG さんの技術ブログ](http://www.gcg.bz/labo_blog/?cat=6)に書かれるそうで、お楽しみです。

### グンマーのヤボー活動報告・色々
- [スライド](http://www.slideshare.net/gurezo/20141115-41586651)
- By グレ蔵(@ic_lifewood)さん
- いつもグンマー国から応援に来て下さる頼もしい「グンマーさん」ことグレ蔵さんです。
- グンマーさんのコミュニティでのこれまでの活動と、今後の展望のお話でした。凹んでも切り換えの早い所が素敵ないいお話でした。
- 自分もコミュニティではグンマーさんと似た感じの経緯で来てて、わりと自分は今まさに凹みフェーズなので、お互い頑張りたいですね！

### JavaScript初心者がFirefox OSの時計アプリを読んでみた
- [スライド](https://speakerdeck.com/benevolent/javascriptchu-xin-zhe-gafirefox-osfalseshi-ji-apuriwodu-ndemita)
- By クポ(staybuzz)さん,マックブックオレ(benevolent0505)さん,もにょもにょ(@jade_halcyon)さん
- 電通大のお三方がプログラム初心者にして Firefox OS アプリのコードを読んでみたお話しです。
- 「初デバッガ、初ブレークポイントに感動」など、初々しく、３人で協力してコードを読んだ楽しさが伝わる、いいお話でした。

### Camera APIで何か
- [スライド](https://speakerdeck.com/flatbird/camera-apidehe-ka)
- By ひらとりはやと(@flatbirdH)
- Firefox OS 2.0 から Privileged API になった Camera API の使い方や Flame で実際に試してみたお話をしました。
- ３日前位まで準備してなかったので、途中に清水さんのスライドを使わせて頂いてやっと間に合った感じでした。
- なお、間に合わなくて「近日公開」としていた内容をこちらの[記事（Open Web Board で Camera API）](/2014/11/21/owb-camera-api/)で書きました。

### Web Audio API について
- [スライド](http://www.slideshare.net/chikoski/20141115-fx-oscodereading)
- By 清水智公(@chikoski)さん
- Web Audio API の概要と、BiquadFilter の種類をさくっと切り替えるのに１つのフィルタで切り替えるのと、フィルタを並列で複数持っておいて切り替えるのとどちらが良いか、コードを読んだら１つのフィルタで良いことが分かった、といったお話でした。
- 難しめのお話でしたが、Web Audio API ってどんなものか全く知らなかったのでとても興味深かったです。

### mozInputMethod API と Gaiaのキーボードアプリ
- [スライド](http://mozilla.l10n.jp/~mar/pdf/FxOSCodeReadingMeetup%2311_20141115%20-%20Keyboard%20App.pdf)
- By mar(@marsf)さん
- mozInputMethod API によるキーボードアプリの作り方と、mar さん自作のポケベル入力など面白キーボードアプリのデモでした。
- LT コマを２杯おかわりするほど情報量の多いお話でした。

### LT コーナー

LT も最近貴重な登壇となった浅井(@dynamitter)さんに始まり、色々な人が話して下さって盛り上がりました！

- @dynamitter さんの「Firefox OS いろいろ 201411」[（スライド）](http://www.slideshare.net/dynamis/firefox-os-something-201411)
- @masawada さんの Vue.js や CSP のお話
- @inayuta さんの Open Web Board でスマートホームを作るぞなお話
- @hikaru__m さんの Twitter アプリの OAuth がバグでシミュレーターで動かないお話

懇親会は主催者の薮下さん勤務先、[株式会社グローバルサイバーグループ](http://www.gcg.bz/)さんの提供で、ピザをご馳走になりました。

今回も色々なお話が聞けて楽しかったです！

