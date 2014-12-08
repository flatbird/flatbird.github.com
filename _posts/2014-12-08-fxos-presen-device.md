---
layout: post
title: "Firefox OS でプレゼン専用デバイスを作る"
description: ""
category: 
tags: [Firefox OS, Open Web Board]
---
{% include JB/setup %}

今回は『[Firefox OS Advent Calendar 2014](http://www.adventar.org/calendars/411)』８日目の記事です。

タイトルで「Firefox OSで…」と言いつつ、また Open Web Board の記事なのですが、今回はアプリ側のことしか扱わないので、<span class="strong">Firefox OS は興味があるけど Open Web Board には興味がない人にもお読みいただける</span>と思います。

## やりたいこと

Open Web Board を使ってプレゼン専用デバイスを作ります。画面の出力は Open Web Board をテレビやプロジェクターに HDMI で接続して行います。入力にはパワポ操作用のコクヨの「[黒曜石](http://www.kokuyo-st.co.jp/stationery/fp/)」というデバイスを使います。黒曜石は Open Web Board の USB ポートにつなぎます。

こんな感じになります。

![](/assets/posts/2014-12-08/owb-kokuyo.jpg)

プレゼンのスライドは Google Docs に置かれたプレゼンテーションを表示します。そのため Open Web Board はネットワークに接続している必要があります。Open Web Board の WiFi 設定にはテレビやマウスを接続する必要があり、割と面倒なので、いつも携帯しているスマホのテザリングを利用するようあらかじめ設定しておきます。

これが実現できれば、小さな Open Web Board と黒曜石そしてスマホがあれば、テレビのある所ならどこでもプレゼンすることができます。(電源の問題は後述します)


## 動機

せっかく Firefox OS が載っていて、HDMI ポートに挿すだけで Web アプリの UI 画面を表示できるデバイスなので、それを生かしたものが作りたいなと。。。


## 実現のために必要なこと

この Firefox OS のプレゼン専用デバイスを実現するために、以下のようなことが必要です。

- Google Docs のプレゼンを Firefox OS アプリで開く (Browser API)。
- 黒曜石のキーイベントを拾ってプレゼンを操作する (Browser API)。
- Google Docs のプレゼン一覧から選択できるようにする (Google Drive API & OAuth)。
- プレゼンアプリをホーム画面アプリにする (デバイス起動からプレゼン開始まで黒曜石だけで操作できるようにするため)。

他にも付随していくつかやることがあって、Firefox OS の Web API を使ったりして色々と勉強になりました。


## Google Docs のプレゼンを Firefox OS アプリで開く (Browser API)

Google Docs のプレゼンを Firefox OS アプリで開きます。Firefox OS アプリは Web アプリなので、単にブラウザで開くのと根本的には変わらないのですが、後で行う黒曜石のキーイベント関連の処理やホーム画面アプリ化のために、単独アプリとして開発することにします。

アプリ内で Google Docs を開くには iframe で表示するのですが、それだけでは残念ながらエラーになってしまいます。

``` javascript
var frame = document.querySelector('iframe');
frame.width  = window.innerWidth;
frame.height = window.innerHeight;
frame.src = url; // これだけでは駄目
```

Google Docs のレスポンスヘッダーには `X-Frame-Options:"SAMEORIGIN"` が指定されているので、オリジンの異なる iframe では開けません。Firefox OS のパッケージ型アプリの URL は `app://` URI スキームから始まり、当然、オリジンは異なります。次のようなエラーになります。

```
Load denied by X-Frame-Options: https://docs.google.com/presentation/d/1a6Fu(…省略…)Dg11k/present?slide=id.p does not permit cross-origin framing.
```

ここで役に立つのが Firefox OS の Browser API です。iframe に `mozBrowser` という属性を付けるだけで browser ifame という特殊な iframe となり、その iframe で開かれているコンテンツはトップレベルのウィンドウで開いているような扱いになります。これで `X-Frame-Options:"SAMEORIGIN"` の制約も解決されます。

``` html
<!-- たったこれだけ -->
<iframe mozbrowser>
```

browser API の利用には特権 (privileged) アプリで "browser" のパーミッションが必要です。

```
  "type": "privileged",
  "permissions": {
    "browser": { "description": "OAuth" }
  }
```

browser iframe では標準の iframe に加えてブラウザの実装に必要な色々なメソッドやイベントが追加されています。詳しくは以前の記事や MDN をご覧下さい。

- [browser API [Firefox OS]](/2014/01/22/fxos-browser-api)


## 黒曜石のキーイベントを拾ってプレゼン操作 (Browser API でマウスイベントを投げる)

黒曜石には「NEXT」、「BACK」、「BLACK OUT」の３つのボタンがあり、４種類のキーイベントが発信されます。

- NEXT = PageDown
- BACK = PageUp
- BLACK OUT = b
- NEXT (長押し) = F5

なお、すでに調べてくれている方がいて助かりました。

- [KOKUYOの黒曜石のキーバインドを解析して各種プレゼンツールで利用する - Qiita](http://qiita.com/sawanoboly/items/6aebf81092ebd8772170)

### NEXT/BACK 操作のサポート

とりあえず、プレゼンに必須の NEXT/BACK の操作をサポートします。

これは Google Docs のプレゼンモードが PageDown/PageUp で  NEXT/BACK に対応してるので、簡単そうに思えたのですが、ここに罠がありました。Open Web Board では PageDown/PageUp で keyCode が取得できず 0 が返されます。そのため、Google Docs も反応しません。

```
keydown {target: <body>, key: "PageUp", charCode: 0, keyCode: 0}
```

幸い、key プロパティでキー種別の文字列 ("PageDown"/"PageUp") は取れているため、自前で onkeydown で処理できます。

PageDown では browser API の sendMouseEvent() で iframe 内に擬似的にクリックを発生させます。Google Docs のプレゼンモードではスライドの任意の場所のクリックで NEXT のアクションになるようです。

PageUp では browser API の goBack() で戻ることで BACK のアクションに換えます。


``` javascript
  function sendClick() {
    var x = frame.width / 2;
    var y = frame.height / 2;
    frame.sendMouseEvent('mousedown', x, y, 0, 1, 0);
    setTimeout(function () {
	    frame.sendMouseEvent('mouseup', x, y, 0, 1, 0);
    }, 10);
  }

  window.onkeydown = function(evt) {
    if (evt.key === 'PageDown') {
      sendClick();
    } else if (evt.key === 'PageUp') {
      frame.goBack();
    }
  }
```

ちなみに、sendTouchEvent() や sendMouseEvent() で横スワイプのジェスチャをシミュレートして NEXT/BACK のアクションを発生させようとしたのですが、なかなか上手くいかずあきらめました。原因は分かりません。

### フォーカスの取得

browser iframe でページを開いたりマウスイベントを送るとフォーカスが取られてキーイベント等が親ウィンドウに飛んでこなくなります。iframe の中にイベントリスナーを仕掛けるのもオリジンが違うと無理です。

これについては browser API の `mozbrowserlocationchange` イベントを監視して、その都度 blur() で iframe からフォーカスを外すことで対処できました。

```
  iframe.addEventListener('mozbrowserlocationchange', function(evt) {
    iframe.blur();
  });
```

これでスライドを進める/戻すという最低限の動作がとりあえず出来るようになりました。


## Google Docs のプレゼン一覧から選択できるようにする (Google Drive API & OAuth)

ここまでは特定のスライドの URL を埋め込んで開発してきましたが、スライドを選べなければ使いものになりません。そこで、Google Drive API でログインした自分のアカウントの Google Drive からスライドの一覧を取ってきて、そこから選べるようにします。

- [Google Drive Web APIs](https://developers.google.com/drive/web/)

### OAuth の認証情報や API キーの取得 

Drive API を使うには、まず、Google Developers Console で OAuth の認証情報や API キーを取得する必要があります。

- [Google Developers Console](https://console.developers.google.com/)

1. Google Developers Console に行きます (ログインしてなければログイン)。
2. プロジェクトを新たに作るか既存プロジェクトを選択します。
3. サイドバーの 「API と認証」の「API」メニューを開き、「Drive API」を探して有効にします。
4. サイドバーの 「API と認証」の「認証情報」メニューを開き、OAuth のクライアント ID と API キーを作ります。
	- OAuth の「新しいクライアント ID を作成」ボダンで OAuth のクライアント ID を作ります。アプリケーションの種類を聞かれるので「インストールされているアプリケーション」を選択。
	- 公開 API へのアクセスの「新しいキーを作成」で API キーを作ります。

![](/assets/posts/2014-12-08/credentials.png)

### OAuth 2.0 の実装

このあたりを参考に作りました。

- [Using OAuth 2.0 for Installed Applications - Google Accounts Authentication and Authorization — Google Developers](https://developers.google.com/accounts/docs/OAuth2InstalledApp)
- [OAuth 2.0 認証の実装 - YouTube — Google Developers (日本語)](https://developers.google.com/youtube/v3/guides/authentication?hl=ja)

（加筆予定）

#### □ ログインページを開く

```
https://accounts.google.com/o/oauth2/auth?
  scope=https://www.googleapis.com/auth/drive&
  redirect_uri=http://localhost&
  response_type=code&
  client_id=<client_id>
```

```
  "type": "privileged",
  "permissions": {
    "browser": {},
    "systemXHR": {}
  },
  "redirects": [
    {
      "from": "http://localhost",
      "to": "/index.html"
    }
  ],
```

```
http://localhost/oauth2callback?code=4/ux5gNj-_mIu4DOD_gNZdjX9EtOFf
```

（加筆予定）

#### □ アクセストークンの取得

承認コードと交換します。XHR でリクエストを投げます。

```
POST /o/oauth2/token HTTP/1.1
Host: accounts.google.com
Content-Type: application/x-www-form-urlencoded

code=<承認コード>&
client_id=<client_id>&
client_secret=<client_secret>&
redirect_uri=http://localhost&
grant_type=authorization_code
```

```
{
  "access_token" : "ya29.AHES6ZTtm7SuokEB-RGtbBty9IIlNiP9-eNMMQKtXdMP3sfjL1Fc",
  "token_type" : "Bearer",
  "expires_in" : 3600,
  "refresh_token" : "1/HKSmLFXzqP0leUihZp2xUt3-5wkU7Gmu2Os_eBnzw74"
}
```

（加筆予定）

### Drive API でファイルリストを取得

- [Files: list - Google Drive Web APIs — Google Developers](https://developers.google.com/drive/v2/reference/files/list)

``` javascript
    var url = 'https://content.googleapis.com/drive/v2/files?';
    url += 'key=' + secret.api_key;
    if (nextPageToken) {
      url += '&' + makeQuery('pageToken', nextPageToken);
    }
    console.log('getList ' + url);
    var xhr = new XMLHttpRequest({mozSystem: true});
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.setRequestHeader('Referer', redirectURI);
```

![](/assets/posts/2014-12-08/slide-list.png)

（加筆予定）

## アプリをホーム画面アプリにする 

デバイス起動からプレゼン開始まで黒曜石だけで操作できるようにするため。
ホーム画面アプリにバグがあると操作不能になるので割と怖い。起動直後に毎回エラーになるようなバグがあると何もできなかったり。

[WiFi Information API](https://developer.mozilla.org/en-US/docs/Web/API/WiFi_Information_API) を使う。認定 (certified) API です。

（加筆予定）

## 実際にテレビで試してみた

![](/assets/posts/2014-12-08/tv-fox.jpg)
![](/assets/posts/2014-12-08/tv-list.jpg)
![](/assets/posts/2014-12-08/tv-slide.jpg)

### 給電について

OWB のケースが邪魔でテレビの USB ポートが使えず。。。

![](/assets/posts/2014-12-08/insert.jpg)

ケースを外して USB ケーブルを接続してみましたが、テレビの USB ポートでは給電に問題があるみたいで、起動時の The Fox の画面で中断・起動の繰り返しになってしまいます。残念。

（加筆予定）

## 今後の展望

必要な個々の機能のフィジビリティは確認できましたが、まだアプリとしては出来あがっていないので完成させたいです。
（加筆予定）

