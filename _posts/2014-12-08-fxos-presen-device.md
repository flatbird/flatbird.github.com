---
layout: post
title: "Firefox OS でプレゼン専用デバイスを作る"
description: ""
category: 
tags: [Firefox OS, Open Web Board]
---
{% include JB/setup %}

今回は『[Firefox OS Advent Calendar 2014](http://www.adventar.org/calendars/411)』８日目の記事です。

タイトルで「Firefox OSで…」と言いつつ、Open Web Board の記事なのですが、今回はアプリ側のことしか扱わないので、<span class="strong">Firefox OS は興味があるけど Open Web Board には興味がない人にもお読みいただける</span>と思います。

## やりたいこと

Open Web Board を使ってプレゼン専用デバイスを作ります。画面の出力は Open Web Board をテレビやプロジェクターに HDMI で接続して行います。入力にはパワポ操作用のコクヨの「[黒曜石](http://www.kokuyo-st.co.jp/stationery/fp/)」というデバイスを使います。黒曜石は Open Web Board の USB ポートにつなぎます。

こんな感じになります。

![](/assets/posts/2014-12-08/owb-kokuyo.jpg)

プレゼンのスライドは Google Docs に置かれたプレゼンテーションを表示します。そのため Open Web Board はネットワークに接続している必要があります。Open Web Board の WiFi 設定にはテレビやマウスを接続する必要があり、割と面倒なので、いつも携帯しているスマホのテザリングを利用するようあらかじめ設定しておきます。

これが実現できれば、小さな Open Web Board と黒曜石そしてスマホがあれば、テレビのある所ならどこでもプレゼンすることができます。(電源の問題は後述します)


## 動機

Open Web Board は Firefox OS が載っていて、HDMI ポートに挿すだけで Web アプリの UI 画面を表示できるデバイスなので、せっかくなのでそれを生かしたものが作りたいなと。そうでないと WoT 的なものを作るにしても Edison で node.js でもいいじゃんと思ってしまうので。。。


## 実現のために必要なこと

この Firefox OS のプレゼン専用デバイスを実現するために、以下のようなことが必要です。

- Google Docs のプレゼンを Firefox OS アプリで開く (Browser API)。
- 黒曜石のキーイベントを拾ってプレゼンを操作する (Browser API)。
- Google Docs のプレゼン一覧から選択できるようにする (Google Drive API & OAuth)。
- プレゼンアプリをホーム画面アプリにする (デバイス起動からプレゼン開始まで黒曜石だけで操作できるようにするため)。

他にも付随していくつかやることがあり、Firefox OS の Web API を色々使ったりして勉強になりました。


## Google Docs のプレゼンを Firefox OS アプリで開く (Browser API)

Google Docs のプレゼンを Firefox OS アプリで開きます。Firefox OS アプリは Web アプリなので、単にブラウザで開くのと根本的には変わらないのですが、後で行う黒曜石のキーイベント関連の処理やホーム画面アプリ化のために、単独アプリとして開発することにします。

アプリ内で Google Docs を開くには iframe で表示するのですが、それだけでは残念ながらエラーになってしまいます。

``` javascript
var frame = document.querySelector('iframe');
frame.width  = window.innerWidth;
frame.height = window.innerHeight;
frame.src = url; // これだけでは駄目
```

Google Docs のレスポンスヘッダーには `X-Frame-Options:"SAMEORIGIN"` が指定されているので、オリジンの異なる iframe では開けません。Firefox OS のパッケージ型アプリの URL は "app://"" URI スキームで、当然、オリジンは異なります。次のようなエラーになります。

```
Load denied by X-Frame-Options: https://docs.google.com/presentation/d/1a6Fu(…省略…)Dg11k/present?slide=id.p does not permit cross-origin framing.
```

ここで役に立つのが Firefox OS の Browser API です。iframe に "mozBrowser" という属性を付けるだけで browser ifame という特殊な iframe となり、その iframe で開かれているコンテンツはトップレベルのウィンドウで開いているような扱いになります。これで `X-Frame-Options:"SAMEORIGIN"` の制約も解決されます。

``` html
<!-- たったこれだけ -->
<iframe mozbrowser>
```

Browser API の利用には特権 (privileged) アプリで "browser" のパーミッションが必要です。manifest.webapp で以下のように記述します。

``` javascript
  "type": "privileged",
  "permissions": {
    "browser": {}
  }
```

browser iframe では標準の iframe に加えてブラウザの実装に必要な色々なメソッドやイベントが追加されています。詳しくは次の過去記事や MDN をご覧下さい。

- (過去記事) [browser API [Firefox OS]](/2014/01/22/fxos-browser-api)


## 黒曜石のキーイベントを拾ってプレゼン操作 (Browser API でマウスイベントを投げる)

黒曜石には「NEXT」,「BACK」,「BLACK OUT」の３つのボタンがあり、４種類のキーイベントが発信されます。

- NEXT ... PageDown
- BACK ... PageUp
- BLACK OUT ... b
- NEXT (長押し) ... F5

なお、これはすでに調べてくれている方がいて助かりました。

- (参考)『[KOKUYOの黒曜石のキーバインドを解析して各種プレゼンツールで利用する - Qiita](http://qiita.com/sawanoboly/items/6aebf81092ebd8772170)』

###「進む・戻る」操作のサポート

とりあえず、プレゼンに必須となるスライドの「進む・戻る」の操作をサポートします。

Google Docs のプレゼンモードが PageDown/PageUp で「進む・戻る」に対応してるので、簡単そうに見えたのですが、罠がありました。Open Web Board では PageDown/PageUp で keyCode が取得できず 0 が返されます。そのため、Google Docs も反応しません。

```
keydown {target: <body>, key: "PageUp", charCode: 0, keyCode: 0}
```

幸い、キーイベントの "key" プロパティでキー種別の文字列 ("PageDown"/"PageUp") は取れているため、自前で "onkeydown" で処理できます。

PageDown では Browser API の [sendMouseEvent()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement.sendMouseEvent) で iframe に擬似的にクリックを発生させます。Google Docs のプレゼンモードではスライドの任意の場所のクリックで「進む」のアクションになるようです。

PageUp では Browser API の [goBack()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement.goBack) で戻ることで「戻る」のアクションの代わりとします。

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

ちなみに、sendTouchEvent() や sendMouseEvent() で横スワイプのジェスチャをシミュレートして「進む・戻る」のアクションを発生させようとしたのですが、なかなか上手くいかずあきらめました。

### フォーカスの取得

browser iframe でページを開いたりマウスイベントを送ると、iframe 側にフォーカスが取られてキーイベント等が親ウィンドウに飛んでこなくなり、PageUp/PageDown が取れなくなります。オリジンが異なるので iframe 内にイベントリスナーを仕掛けることもできません。

この問題は Browser API の "mozbrowserlocationchange" イベントを監視して、その都度 blur() で iframe からフォーカスを外すことで解決できました。

``` javascript
iframe.addEventListener('mozbrowserlocationchange', function(evt) {
  iframe.blur();
});
```

これでスライドを「進める・戻す」という最低限の動作がとりあえず出来るようになりました。


## Google Docs から開くプレゼンを選択できるようにする (Google Drive API & OAuth)

ここまでは特定のスライドの URL をアプリに埋め込んで表示してきましたが、プレゼンしたいスライドを選べなければ使いものになりません。そこで、Google Drive API で自分のアカウントの Google Drive からプレゼンテーション一覧を取ってきて、そこから選べるようにします。

- (参考)『[Google Drive Web APIs — Google Developers](https://developers.google.com/drive/web/)』

### OAuth の認証情報や API キーの取得 

Drive API を使うには、まず、『[Google Developers Console](https://console.developers.google.com/)』で OAuth の認証情報や API キーを取得する必要があります。

1. [Google Developers Console](https://console.developers.google.com/) を開きます。ログインしていなければログインします。
2. プロジェクトを新たに作るか、既存プロジェクトを選択します。
3. サイドバーの 「API と認証」の「API」メニューを開き、「Drive API」を探して有効にします。
4. サイドバーの 「API と認証」の「認証情報」メニューを開き、OAuth のクライアント ID と API キーを作ります。
	- [OAuth]「OAuth」の「新しいクライアント ID を作成」ボダンで OAuth のクライアント ID を作ります。アプリケーションの種類を聞かれるので「インストールされているアプリケーション」を選択します。「リダイレクト URI」は "http://localhost" を使います。
	- [API キー]「公開 API へのアクセス」の「新しいキーを作成」で API キーを作ります。「リファラー」に "http://localhost" を指定しています。

![](/assets/posts/2014-12-08/credentials.png)

### OAuth 2.0 の実装

Drive API には SDK が提供されていて、それで OAuth の処理もやってくれるようですが、Firefox OS のパッケージ型アプリで利用できる JavaScript の SDK はありません。なので、このあたりを参考に自分で作りました。

- 『[Using OAuth 2.0 for Installed Applications - Google Accounts Authentication and Authorization — Google Developers](https://developers.google.com/accounts/docs/OAuth2InstalledApp)』
- 『[OAuth 2.0 認証の実装 - YouTube — Google Developers (日本語)](https://developers.google.com/youtube/v3/guides/authentication?hl=ja)』

後者は YouTube Data API のドキュメントですが、OAuth 2.0 については同じなので、日本語ドキュメントとして役立ちます。

#### □ 承認ページ（ログインページ）を開く

ユーザに Drive API の使用を承認してもらうため、次のような URL を作成してブラウザで承認ページを開きます。ユーザがログインしていなければ、最初に Google アカウントのログインページが表示され、ログイン後に承認ページが開かれます。

```
https://accounts.google.com/o/oauth2/auth?
  scope=https://www.googleapis.com/auth/drive&
  redirect_uri=http://localhost&
  response_type=code&
  client_id=<クライアントID>
```

この URL を Browser API の iframe で開きます。承認が成功すると "redirect_uri" に指定した URL にリダイレクトされます。

Firefox OS のパッケージ型アプリでは、manifest.webapp に "redirects" を指定することでアプリ内にリダイレクトさせることができます。

``` javascript
"redirects": [
  {
    "from": "http://localhost",
    "to": "/redirect.html"
  }
],
```

リダイレクト先の URL には次のように OAuth の承認コードが指定されてきます。

```
http://localhost/?code=<承認コード>
```

アプリ側では次のように承認コードを取得できます。

``` javascript
var params = new URL(document.location).searchParams;
var authCode = params.get('code');
```

#### □ アクセストークンの取得

取得した承認コードをアクセストークンと交換します。

クロスオリジン通信が可能な System XHR を使いますので、manifest.webapp に特権パーミッションの "systemXHR" を追加します。

``` javascript
"type": "privileged",
"permissions": {
  "systemXHR": {}
},
```

ソースコードでは、mozSystem を指定して XHR を取得します。

``` javascript
var xhr = new XMLHttpRequest({mozSystem: true});
```

次のような POST リクエストを XHR で https://accounts.google.com/o/oauth2/token に投げます。

``` http
POST /o/oauth2/token HTTP/1.1
Host: accounts.google.com
Content-Type: application/x-www-form-urlencoded

code=<承認コード>&
client_id=<クライアントID>&
client_secret=<クライアントシークレット>&
redirect_uri=http://localhost&
grant_type=authorization_code
```

成功すると JSON で次のようなレスポンスが返ります。見たまんま "access_token" がアクセストークンです。

``` javascript
{
  "access_token" : "ya29.AHES6ZTtm7SuokEB-RGtbBty9IIlNiP9-eNMMQKtXdMP3sfjL1Fc",
  "token_type" : "Bearer",
  "expires_in" : 3600,
  "refresh_token" : "1/HKSmLFXzqP0leUihZp2xUt3-5wkU7Gmu2Os_eBnzw74"
}
```


### Drive API でファイルリストを取得

アクセストークンが取れたら Drive API を利用できるようになります。今回はファイルリストを取得します。

- (参考)[『Files: list - Google Drive Web APIs — Google Developers』](https://developers.google.com/drive/v2/reference/files/list)

これも System XHR で、https://www.googleapis.com/drive/v2/files に GET リクエストを投げます。

``` http
GET /drive/v2/files?key=<APIキー> HTTP/1.1
Host: www.googleapis.com
Authorization: Bearer <アクセストークン>
Referer: http://localhost

```

[ポイント]

- クエリ文字列に API キーを指定します。
- Authorization ヘッダにアクセストークンを指定します。
- Referer に "http://localhost" を指定します。 ここは API キー取得時の「リファラー」に指定したものと対応していると思われます。

レスポンスは次のような JSON データが返ります。

``` javascript
{
  "kind": "drive#fileList",
  "etag": "\"Lie3Y624-6bAlCGsnUSYyb6P-dU/qEOCGN03E80WH5pRwyQZDf88Qmk\"",
  "selfLink": "https://www.googleapis.com/drive/v2/files",
  "nextPageToken": "3|0|f__-wQTlxn8wQjN1RTNVUV9YZ0d0WHpKSFJFeHJaamhNUmxVAA",
  "nextLink": "https://www.googleapis.com/drive/v2/files?pageToken=3%7C0%7Cf__-wQTlxn8wQjN1RTNVUV9YZ0d0WHpKSFJFeHJaamhNUmxVAA",
  "items": [
    {
      "appDataContents": false,
      "shared": true,
      "writersCanShare": true,
      "copyable": true,
      "editable": true,
      "lastModifyingUser": {
        "emailAddress": "flatbird.hiratori@gmail.com",
        "permissionId": "15624718302097344679",
        "isAuthenticatedUser": true,
        "picture": {
          "url": "https://lh4.googleusercontent.com/-v906LhBCLIk/AAAAAAAAAAI/AAAAAAAAABo/AQJnvZpAZTw/s64/photo.jpg"
        },
        "displayName": "Hayato Hiratori",
        "kind": "drive#user"
      },
      "lastModifyingUserName": "Hayato Hiratori",
      "owners": [
        {
          "emailAddress": "flatbird.hiratori@gmail.com",
          "permissionId": "15624718302097344679",
          "isAuthenticatedUser": true,
          "picture": {
            "url": "https://lh4.googleusercontent.com/-v906LhBCLIk/AAAAAAAAAAI/AAAAAAAAABo/AQJnvZpAZTw/s64/photo.jpg"
          },
          "displayName": "Hayato Hiratori",
          "kind": "drive#user"
        }
      ],
      "ownerNames": [
        "Hayato Hiratori"
      ],
      "quotaBytesUsed": "0",
      "userPermission": {
        "type": "user",
        "role": "owner",
        "selfLink": "https://www.googleapis.com/drive/v2/files/1a6Fu84O65QKFs_PW1bBuCGav5-m22FR5GB7jP3Dg11k/permissions/me",
        "id": "me",
        "etag": "\"Lie3Y624-6bAlCGsnUSYyb6P-dU/LLj2IeKHVdDHnBe8s-MrYaY1BAw\"",
        "kind": "drive#permission"
      },
      "exportLinks": {
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": "https://docs.google.com/feeds/download/presentations/Export?id=1a6Fu84O65QKFs_PW1bBuCGav5-m22FR5GB7jP3Dg11k&exportFormat=pptx",
        "application/pdf": "https://docs.google.com/feeds/download/presentations/Export?id=1a6Fu84O65QKFs_PW1bBuCGav5-m22FR5GB7jP3Dg11k&exportFormat=pdf",
        "text/plain": "https://docs.google.com/feeds/download/presentations/Export?id=1a6Fu84O65QKFs_PW1bBuCGav5-m22FR5GB7jP3Dg11k&exportFormat=txt"
      },
      "parents": [
        {
          "isRoot": false,
          "parentLink": "https://www.googleapis.com/drive/v2/files/0B3uE3UQ_XgGtTXd2WWpQWWZlLW8",
          "selfLink": "https://www.googleapis.com/drive/v2/files/1a6Fu84O65QKFs_PW1bBuCGav5-m22FR5GB7jP3Dg11k/parents/0B3uE3UQ_XgGtTXd2WWpQWWZlLW8",
          "id": "0B3uE3UQ_XgGtTXd2WWpQWWZlLW8",
          "kind": "drive#parentReference"
        }
      ],
      "version": "17091",
      "thumbnailLink": "https://docs.google.com/feeds/vt?gd=true&id=1a6Fu84O65QKFs_PW1bBuCGav5-m22FR5GB7jP3Dg11k&v=0&s=AMedNnoAAAAAVIQNdHd-z9YhOZVBNVRkWIKd9DLvjquL&sz=s220",
      "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_presentation_list.png",
      "embedLink": "https://docs.google.com/presentation/d/1a6Fu84O65QKFs_PW1bBuCGav5-m22FR5GB7jP3Dg11k/preview",
      "alternateLink": "https://docs.google.com/presentation/d/1a6Fu84O65QKFs_PW1bBuCGav5-m22FR5GB7jP3Dg11k/edit?usp=drivesdk",
      "selfLink": "https://www.googleapis.com/drive/v2/files/1a6Fu84O65QKFs_PW1bBuCGav5-m22FR5GB7jP3Dg11k",
      "etag": "\"Lie3Y624-6bAlCGsnUSYyb6P-dU/MTQxNjAyODM5NjM3Nw\"",
      "id": "1a6Fu84O65QKFs_PW1bBuCGav5-m22FR5GB7jP3Dg11k",
      "kind": "drive#file",
      "title": "Camera API",
      "mimeType": "application/vnd.google-apps.presentation",
      "labels": {
        "viewed": true,
        "restricted": false,
        "trashed": false,
        "hidden": false,
        "starred": false
      },
      "createdDate": "2014-11-13T04:13:32.186Z",
      "modifiedDate": "2014-11-15T05:13:16.377Z",
      "modifiedByMeDate": "2014-11-15T05:13:16.377Z",
      "lastViewedByMeDate": "2014-12-03T07:51:23.987Z",
      "markedViewedByMeDate": "2014-12-03T07:50:56.607Z"
    },
    (…省略…)
  ]
}
```

"nextPageToken" がある場合は、クエリ文字列に "pageToken" を追加した URL で後続のデータを取得します。

```
https://www.googleapis.com/drive/v2/files?key=<APIキー>&pageToken=<nextPageToken>
```

今回は自分が所有者のプレゼンファイルのみを表示します。以下の条件を満たすファイルのみを対象にします。

- "mimeType" === "application/vnd.google-apps.presentation"
- "userPermission.role" === "owner"

取得したプレゼンの一覧を画面に表示した所です。なぜが "thumbnailLink" が Not Found でリンク切れ画像になってしまうのですが、時間切れで調査できず。。。

<p><img src="/assets/posts/2014-12-08/slide-list.png" style="box-shadow: 3px 3px 6px #bbb"></p>

これでとりあえず選択したプレゼンを開けるようになりました。


## アプリをホーム画面アプリにする 

Open Web Board をテレビに挿して起動しても、通常のホーム画面では黒曜石で操作できないため、プレゼンが開始できません。そこで、デバイス起動からプレゼン開始までを黒曜石だけで操作できるようにするため、このアプリをホーム画面にします。

アプリをホーム画面に設定できるようにするには manifest.webapp で次のように "role" を追加します。

``` javascript
  "role": "homescreen",
```

設定画面の「ホーム画面」メニューでホーム画面を切り替えられるようになります。詳しくは過去記事をご参照ください。

- (過去記事) [Firefox OS のホームスクリーン切り替えを調べてみた](/2014/04/29/fxos-replaceable-homescreen-api)

### 設定画面を開けるようにする

ホーム画面アプリで気をつけないといけないのが、切り替え後のホーム画面で設定画面が開けないと、元に戻す事ができなくなることです。adb がつながれば何とか戻せるはずですが、なかなか大変そうです。なので、ホーム画面アプリでは設定画面を開けるようにします。

設定画面は Web Activities で次のように開けます。

``` javascript
var pick = new MozActivity({
  name: 'configure',
  data: { target: 'device' }
});
```

### WiFi 接続状態の確認

ホーム画面アプリはバグがあると操作不能になるのでけっこう怖いです。起動直後に常にエラーになるようなバグがあると何もできなくなります。実際、それに遭遇しました。。。

ホーム画面はブート後すぐに起動されますが、そのタイミングでは WiFi 接続が完了しておらず Google Drive へのアクセスで常にエラーになってしまいました。幸い設定画面は開けるようになっていたので事なきを得ましたが。。。

このアプリでは WiFi 接続時に Google Drive への通信を開始するようにするため、WiFi Information API を使って接続状態を確認するようにします。

- (参考)『[WiFi Information API - Web API Interfaces | MDN](https://developer.mozilla.org/en-US/docs/Web/API/WiFi_Information_API)』

WiFi Information API は認定 (certified) API で、"wifi-manage" というパーミッションが必要です。

``` javascript
  "type": "certified",
  "permissions": {
    "wifi-manage": { "description": "Check WiFi status" }
  },
```

次のように接続状態が "connected" になったら通信処理を開始します。

``` javascript
var wifiMgr = navigator.mozWifiManager;
if (wifiMgr.connection.status === 'connected') {
  start();
} else {
  wifiMgr.onstatuschange = function (event) {
    if (event.status === 'connected') {
      start();
    }
  }
}
```

## 実際にテレビで試してみた

1. テレビで The Fox。
![](/assets/posts/2014-12-08/tv-fox.jpg)

2. プレゼンリスト画面。
![](/assets/posts/2014-12-08/tv-list.jpg)

3. プレゼンを開いた所。
![](/assets/posts/2014-12-08/tv-slide.jpg)


### 給電について

テレビの USB ポートから Open Web Board の給電を試みました、、、が、Open Web Board のケースが邪魔でテレビの USB ポートが使えず。。。

![](/assets/posts/2014-12-08/insert.jpg)

ケースを外して USB ケーブルを接続して試してみましたが、テレビの USB ポートからの給電では問題があるみたいで、起動中の The Fox の画面で中断・起動の繰り返しになってしまいます。残念。これができれば、少ない持ち物で本当にプレゼンが可能だったのですが。。。


## 今後の展望

プレゼン専用アプリに必要な機能のフィジビリティは確認できましたが、残念ながらまだアプリとしてはできあがっていません。
おいおい完成させたいです。

みなさん同様、ほとんどいつも PC を持ち歩いているので、こういうデバイスが必要かというとぶっちゃけ不要なのですが、Firefox OS 搭載でテレビにつながるデバイスの可能性を求めて、こういったものを作っていくのは面白いと思います。


