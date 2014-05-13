---
layout: post
title: "Google Play の APK をダウンロードする方法のメモ"
description: ""
category: 
tags: [Android]
---
{% include JB/setup %}

コマンドラインから Google Play から APK をダウンロードする方法のメモ。

### セットアップ

- **[Google Play Unofficial Python API](https://github.com/egirault/googleplay-api)** を落とす。
	- https://github.com/egirault/googleplay-api
	- Python 2.5+, Protocol Buffers が必要。

- Protocol Buffers のインストール (Mac OSX)
	- https://code.google.com/p/protobuf/
	- [protobuf-2.5.0.tar.bz2](https://code.google.com/p/protobuf/downloads/detail?name=protobuf-2.5.0.tar.bz2)を落としてきた。
	- ビルドとインストール

``` bash
$ tar xf protobuf-2.5.0.tar.bz2
$ cd protobuf-2.5.0
$ ./configure
$ make
$ make check
$ sudo make install
$ protoc --version

```

- Pyhon Protocol Buffers のインストール


``` bash
$ cd python
$ python setup.py build
$ python setup.py test
$ python setup.py install

```

- Python の Requests モジュールのインストール

``` bash
$ pip install requests
```

- config.py を編集
     - Android ID は Android 端末で `*#*#8255#*#*` をダイヤルして出てくる画面で `aid:` に続く HEX 文字列がそれ。

```
LANG            = "ja_JP"
ANDROID_ID      = "38f4a40bda656e76"
GOOGLE_LOGIN    = "flatbird.test@gmail.com"
GOOGLE_PASSWORD = "this_is_a_password"
```

### 実行

- download.py にパッケージ名を指定して実行する

``` bash
$ python download.py com.example.packagename
```

### APK ダウンロード以外にも色々できる
- search.py
	- キーワードによるアプリの検索。
- categories.py
	- アプリのカテゴリ一覧を取得。ショッピングとか仕事効率化とか。
- list.py
	- 各カテゴリのサブカテゴリー (Top free とか) のアプリのリストが取れる。
- permissions.py
	- 指定したアプリの要求するパーミッションが取れる。
- 以上、使い方の詳細は [README](https://github.com/egirault/googleplay-api/blob/master/README.md) 参照。

### (参考) その他の実装

- https://github.com/Lekensteyn/apk-downloader
	- 有名な Chrome Extension
	- コマンドラインで叩けないので今回はパス。

- https://github.com/evilsocket/google-play-downloader 
	- Python の実装。古めなので動くかわからない。

- https://github.com/Akdeniz/google-play-crawler
	- Java の実装。新し目なのでたぶん動く。

