---
layout: post
title: "Open Web Board とか TWE-Lite とか"
description: ""
category: 
tags: [Firefox OS, TWE-Lite]
---
{% include JB/setup %}

11月1日開催の Open Web Board と Gluin のイベントに参加できることになりました！

- [『Open Web Board』 『Gluin』  ハンズオン＆ラピッドプロトタイピング : ATND](https://atnd.org/events/58127)

![](/assets/posts/2014-10-31/owb.jpg)

もう明日に迫っているのですが、これに備えて(?) 最近さわっていた TWE-Lite (トワイライト) のこととかを書きたいと思います。

## Open Web Board / Gluin

Open Web Board と Gluin の良さげな記事をまとめました。この辺りをおさえておけば現時点で公開されている情報としてはバッチリかと。。。

- [KDDI のニュースリリース](http://news.kddi.com/kddi/corporate/newsrelease/2014/10/03/679.html)
- [KDDIのWeb開発者支援に関する取り組み (PDF)](http://au-fx.kddi.com/document/document001.pdf)
- [KDDI の人が Open Web Board と Gluin を説明する動画 (英語)](https://www.youtube.com/watch?v=fh8zX-Sw3wA)
- [Open Web Board のスペック (英語)](http://www.cnx-software.com/2014/10/06/kddi-mozilla-open-web-board/)
- [KDDI、Firefox OSベースの開発ボードをハッカソンなどで無償配布へ - BIGLOBEニュース](http://news.biglobe.ne.jp/it/1003/mnn_141003_2510332325.html)
- [KDDIがMozillaのイベントでFirefox OS Phone12月発売と、開発者支援策を発表](http://time-space.kddi.com/news/news/20141009/index.html)
- [KDDIがFirefox OSスマホを発売する目的とは？](http://weekly.ascii.jp/elem/000/000/264/264432/)

Open Web Board と Gluin については 10月3日の発表時から気になっていました。10月5日に開催された [Mozilla Open Web Day](http://www.mozilla.jp/events/2014/open-web-day/) では KDDI さんの展示で実際に動いている様子を見て、以下のようなお話を聞くこともできました。

- Gluin とデバイス間は WebSocket で通信する。
- Open Web Board には ZigBee でつながるセンサーデバイスを仲介して WebSocket で Gluin と通信するためのゲートウェイが入っている。
- Gluin は node.js で動いていて、オープンソース化する予定。

Open Web Board は販売予定がないということなので、ボードがもらえるイベントには絶対参加したいと思っていました。とても楽しみにしています。

## ZigBee の USB ドングル

さて今回のイベントにはアイデアソンもあるとのことで、Open Web Board / Gluin で何ができるか考えてみようとしたのですが、センサーがないとあまり何もできないような。。。

そこで、センサーデバイスと通信するのに Open Web Board に差している ZigBee の USB ドングル。あれが何なのか画像検索で探していたら、そのものズバリ、同じ物が見つかりました。ToCoStick というものです。

- [ToCoStick](http://akizukidenshi.com/catalog/g/gM-07232/)

![](/assets/posts/2014-10-31/tocostick.jpg)

## TWE-Lite (トワイライト)

調べてみたら ToCoStick は TWE-Lite (トワイライト) という ZigBee 内蔵マイコンを USB ドングルに載せたものでした。

- [〔公式〕超小型IEEE802.15.4/ZigBee無線モジュール　TWE-Lite（トワイライト）](http://tocos-wireless.com/jp/products/TWE-001Lite.html)

TWE-Lite についてはこちらのブログ記事も分かりやすかったです。

- [ZigBeeモジュール Wireless Engine TWE-Lite DIPを使ってみた - 人と技術のマッシュアップ](http://tomowatanabe.hatenablog.com/entry/2013/08/05/102151)
- [ツール・ラボ  » TWI-Liteの動作確認](https://tool-lab.com/2013/12/twi-lite-test/)

けっこう情報が多く、電子工作未経験の自分でも何とかなりそうな気がして、早速、本やパーツを買って試してみました。

## 書籍

- [TWE-Lite ではじめる カンタン電子工作](http://www.amazon.co.jp/TWE%E2%80%90Lite-%E3%83%88%E3%83%AF%E3%82%A4%E3%83%A9%E3%82%A4%E3%83%88-%E3%81%A7%E3%81%AF%E3%81%98%E3%82%81%E3%82%8B%E3%82%AB%E3%83%B3%E3%82%BF%E3%83%B3%E9%9B%BB%E5%AD%90%E5%B7%A5%E4%BD%9C%E2%80%95%E3%80%8C%E7%84%A1%E7%B7%9A%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%80%8D%E3%81%8C%E3%80%8C%E3%81%A4%E3%81%AA%E3%81%90%E3%80%8D%E3%81%A0%E3%81%91%E3%81%A7%E5%87%BA%E6%9D%A5%E3%82%8B-I%E3%83%BBO-BOOKS/dp/4777518485/)

公式サイトにも色々情報がありますが初心者にはちょっと分かりづらいため、この書籍はとても役立ちました。初めて触る人は必携だと思います。

- [日経 Linux 2014年 11月号 (2014/10/8 発売)](http://www.amazon.co.jp/%E6%97%A5%E7%B5%8C-Linux-%E3%83%AA%E3%83%8A%E3%83%83%E3%82%AF%E3%82%B9-2014%E5%B9%B4-11%E6%9C%88%E5%8F%B7/dp/B00NO28ZF8/) 【[目次](http://itpro.nikkeibp.co.jp/atcl/mag/14/236750/100600005/)】

特集の『楽しい電子工作』が役立ちました。特に Part 1 の『猫ツイートを再現！』がまさに TWE-Lite を使ったもので非常にタイムリー。また、Part 2 の『はじめての電子工作ステップ50』も未経験者には丁度良い記事でした。実は、11月号は[私が書かせて頂いた Flame 特集記事](/2014/10/31/fxos-nikkei-linux-article/)の第２回が載った号で、編集の方からの頂きものが手元にあったので非常に助かりました。


## パーツ

『TWE-Lite ではじめる カンタン電子工作』で勉強して必要な物を確認し、休日に秋葉原にパーツを買いにいきました。リンクは実際に購入した店舗のものです。

- TWE-Lite DIP (TWE-001L-DPC-WA 完成品) ￥1,945 x2
	- http://akizukidenshi.com/catalog/g/gM-06760/
	- 半完成品もあり、そちらはハンダ付けが必要なので、初心者には要注意です。
- ToCoStick [TWE-LITE-USB] ￥2,760 x1
	- http://www.aitendo.com/product/9506
- TWE-Liteパーツセット（初級編）￥100 x1
	- http://www.aitendo.com/product/6956
	- バラで買ったほうがいいのでしょうが、初心者なので楽なほうで。。。
- 透明なブレッドボード [TP039] ￥350 x1
	- http://www.aitendo.com/product/5104
- ブレッドボード ￥239 x1
	- http://www.marutsu.co.jp/pc/i/14660/
- ジャンプワイヤ（20本セット） [JWIRE-20P] ￥150 x1
	- http://www.aitendo.com/product/6983
- ジャンプワイヤパック【SKS-100】￥150 x1
	- http://www.marutsu.co.jp/pc/i/132758/
	- 長いジャンプワイヤはゴチャゴチャしそうだなーと思っていたので買いましたが、正解でした。
- 電池ボックス（単3×2本） [BATTERYBOX-T3-2]￥120 x2
	- http://www.aitendo.com/product/1281
- CDS セル ５mm タイプ ￥20 x1
	- http://akizukidenshi.com/catalog/g/gI-00110/
	- 照度センサーやりたくて買いました。まだ使ってません。
- 精密ピンセット ＴＳ－１５ ￥320 x1
	- http://akizukidenshi.com/catalog/g/gT-02541/
- デジタルマルチメータ（テスタ）Ｍ８３０Ｌ ￥900 x1
	- http://akizukidenshi.com/catalog/g/gM-01676/
	- 必要かと思って買いましたが、まだ使っていません。

L チカのために親機/子機として TWE-Lite DIP を 2 個と、USB ドングルの ToCoStick 1 個。そして、その他、必要そうなものを買いました。

## やってみた

実際にいじってみました。電子工作自体、初挑戦です。

### L チカ

電子工作の Hello World! とも言われる L チカ (LED チカチカ) です。初心者なので素直にここから始めました。
LED がある方 (上段) が子機、スイッチのある方 (下段) が親機です。

![](/assets/posts/2014-10-31/led.jpg)

チカりました！

![](/assets/posts/2014-10-31/ledon.jpg)

スイッチの形状が[書籍](http://www.amazon.co.jp/TWE%E2%80%90Lite-%E3%83%88%E3%83%AF%E3%82%A4%E3%83%A9%E3%82%A4%E3%83%88-%E3%81%A7%E3%81%AF%E3%81%98%E3%82%81%E3%82%8B%E3%82%AB%E3%83%B3%E3%82%BF%E3%83%B3%E9%9B%BB%E5%AD%90%E5%B7%A5%E4%BD%9C%E2%80%95%E3%80%8C%E7%84%A1%E7%B7%9A%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%80%8D%E3%81%8C%E3%80%8C%E3%81%A4%E3%81%AA%E3%81%90%E3%80%8D%E3%81%A0%E3%81%91%E3%81%A7%E5%87%BA%E6%9D%A5%E3%82%8B-I%E3%83%BBO-BOOKS/dp/4777518485/)と異なるものだったので少し戸惑いましたが、それ以外は問題なく出来ました。ただ、負論理で組まれている回路なので、最初がこれだと初心者には原理が理解しづらかったです。

### ToCoStick の PC 接続で UART シリアル通信 (Mac OS X)

公式サイトの[『TWE-Lite DIP使用方法（上級編）』](http://tocos-wireless.com/jp/products/TWE-Lite-DIP/TWE-Lite-DIP-step3.html)や[書籍](http://www.amazon.co.jp/TWE%E2%80%90Lite-%E3%83%88%E3%83%AF%E3%82%A4%E3%83%A9%E3%82%A4%E3%83%88-%E3%81%A7%E3%81%AF%E3%81%98%E3%82%81%E3%82%8B%E3%82%AB%E3%83%B3%E3%82%BF%E3%83%B3%E9%9B%BB%E5%AD%90%E5%B7%A5%E4%BD%9C%E2%80%95%E3%80%8C%E7%84%A1%E7%B7%9A%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%80%8D%E3%81%8C%E3%80%8C%E3%81%A4%E3%81%AA%E3%81%90%E3%80%8D%E3%81%A0%E3%81%91%E3%81%A7%E5%87%BA%E6%9D%A5%E3%82%8B-I%E3%83%BBO-BOOKS/dp/4777518485/)では Windows で TeraTerm を使用する方法が説明されています。しかし、手元には Mac OS X しかないので、それで試しました。

#### ■ ドライバのインストール
公式サイト等の情報からはちょっと分かりにくいのですが、仮想 COM ポートを使うため FTDI 社の VCP (Virtual COM Port) ドライバをインストールする必要があります。

- http://www.ftdichip.com/Drivers/VCP.htm

ダウンロードした FTDIUSBSerialDriver_v2_2_18.dmg には２つのファイルが含まれます。

- FTDIUSBSerialDriver_10_3
- FTDIUSBSerialDriver_10_4_10_5_10_6_10_7

OS X v10.3 Panther 用のものと、それ以降のバージョンのものです。(ファイル名には v10.7 Lion までしか含まれませんが、それ以降も大丈夫っぽいです)

ドライバを入れたらデバイスファイル "/dev/tty.usbserial-AHX08ABA" が追加されました。

![](/assets/posts/2014-10-31/device.png)

#### ■ シリアル接続

ターミナルから以下のようにシリアル接続します。

``` bash
$ sudo cu -s 115200 -l /dev/tty.usbserial-AHX08ABA
```

切断するときは ~ (チルダ) を入力し、プロンプトみたいなのが出たら . (ピリオド) を入力します。

**出力例:**
![](/assets/posts/2014-10-31/output.png)

出力される : (コロン) から始まる 16 進文字列は子機からのコマンドです。ToCoStick は出荷状態で親機として設定されているので、子機のコマンドを受信して表示します。

コマンドの読み方の情報はこの辺りにあります。

- [TWE-Lite DIP 使用方法（上級編）](http://tocos-wireless.com/jp/products/TWE-Lite-DIP/TWE-Lite-DIP-step3.html)
- [相手端末からの状態通知：0x81](http://tocos-wireless.com/jp/products/TWE-Lite-DIP/TWE-Lite-DIP-step3-81.html)

なお、[書籍](http://www.amazon.co.jp/TWE%E2%80%90Lite-%E3%83%88%E3%83%AF%E3%82%A4%E3%83%A9%E3%82%A4%E3%83%88-%E3%81%A7%E3%81%AF%E3%81%98%E3%82%81%E3%82%8B%E3%82%AB%E3%83%B3%E3%82%BF%E3%83%B3%E9%9B%BB%E5%AD%90%E5%B7%A5%E4%BD%9C%E2%80%95%E3%80%8C%E7%84%A1%E7%B7%9A%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%80%8D%E3%81%8C%E3%80%8C%E3%81%A4%E3%81%AA%E3%81%90%E3%80%8D%E3%81%A0%E3%81%91%E3%81%A7%E5%87%BA%E6%9D%A5%E3%82%8B-I%E3%83%BBO-BOOKS/dp/4777518485/)では他の親機からのコマンドも表示されるように書かれていましたが、実際にやってみたら表示されませんでした。

そこで、L チカで親機にしていた TWE-Lite DIP を子機として設定してスイッチを押したら ToCoStick がコマンドを表示するようになりました。さらに ToCoStick の LED も光りました！これは ToCoStick のデジタル出力1 (DO1) が LED (赤) に接続されているためです。

![](/assets/posts/2014-10-31/tocostickled.jpg)

### プログラムから操作 (Mac OS X)

PC に ToCoStick (親機) が接続されていれば、子機の TWE-Lite を操作したり、子機の TWE-Lite に接続されたセンサーのデータを受け取ることができます。Python で pySerial を使えば簡単にプログラムで操作できるようになります。

#### ■ pySerial のインストール

pip が入っていれば、簡単にインストールできます。

``` bash
$ pip install pyserial
```

pySerial のドキュメントはこちら。

- http://pyserial.sourceforge.net/pyserial_api.html


#### ■ コマンドの受信スクリプト

コマンドを受信してプリントします。

``` python
#!/usr/bin/env python
import serial

DEVICE='/dev/tty.usbserial-AHX08ABA'

s = serial.Serial(port=DEVICE, baudrate=115200)

while True:
    line = s.readline()
    print line.strip()
```

#### ■ コマンドの送信スクリプト

コマンドを送信して L チカの子機を操作します。手抜きですが、引数 "ON" で LED 点灯、"OFF" で消灯します。

``` python
#!/usr/bin/env python
import sys, serial

DEVICE='/dev/tty.usbserial-AHX08ABA'

if sys.argv[1] == 'ON':
    cmd = ':7880010101FFFFFFFFFFFFFFFF0D'
elif sys.argv[1] == 'OFF':
    cmd = ':7880010001FFFFFFFFFFFFFFFF0E'

s = serial.Serial(port=DEVICE, baudrate=115200)
s.write(cmd + '\r\n')
s.close()
```

4 バイト目 (16 進文字列の 7, 8 桁目) でデジタル出力の状態を指定します。下位 4 ビットが下からそれぞれ、デジタル出力の DO1/DO2/DO3/DO4 に対応します。ビットが 0 で Hi, ビットが 1 で Lo となります。スクリプトでは引数 "ON" で 4 バイト目を "01" (DO1=Lo) に、"OFF" で "00" (DO1=Hi) にします。L チカの回路は負論理なので、DO1=Lo で点灯します。ややこしいです。。。

コマンド送信についての情報はこのあたりにあります。

- [遠隔監視（リモートモニタリング）](http://tocos-wireless.com/jp/products/TWE-Lite-USB/monitor.html)
- [相手端末の出力を変更：0x80](http://tocos-wireless.com/jp/products/TWE-Lite-DIP/TWE-Lite-DIP-step3-80.html)

### おわりに

とりあえず、Open Web Board がもらえたら何かできそうな気がしてきました。次はアナログ入力で照度センサーを使ってみたいと思います。ところで、Android だとUSB ホストのシリアル通信については [android.hardware.usb](http://developer.android.com/reference/android/hardware/usb/package-summary.html) あたりで色々できるようですが、Firefox OS の Open Web Board はどうなってるんでしょうね？WebAPI が用意されているといいのですが。。。

- 参考:
	- [Android端末で使用する](http://tocos-wireless.com/jp/products/TWE-Lite-USB/android.html)
	- [FTDriver (no more supported)](https://github.com/ksksue/FTDriver)

