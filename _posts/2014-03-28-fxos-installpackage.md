---
layout: post
title: "Firefox Marketplace のアプリを installPackage できるのか？[Firefox OS]"
description: ""
category: 
tags: [Firefox OS]
---
{% include JB/setup %}

## 概要
Firefox Marketplace (以下 Marketplace) にあるパッケージ型アプリを外部の Web サイトから [installPackage](https://developer.mozilla.org/ja/docs/DOM/Apps.installPackage) でインストールできるか試したら出来なかったので、その原因を調べてみたというお話しです。

## なぜ試したのか？
もしこれが可能なら、アプリの宣伝を自社サイトで行い、そのサイト上でアプリを直接インストールさせることが出来ます。Marketplace 上のアプリのページにリンクで飛ばしてもだいたい同じですが、installPackage で直接インストール出来ればユーザの手間を一手間減らせます。この一手間はアプリのインストール率にけっこう影響するはずです。

また、アプリの紹介を自前のサイトで行い、パッケージのホストは Marketplace に委ねる形式のサードパーティー・アプリストアが作れます。例えば日本語対応アプリだけを集めたアプリストアなどです。

## installPackage

パッケージ型アプリは Apps API (mozApps) の [installPackage](https://developer.mozilla.org/ja/docs/DOM/Apps.installPackage) でインストールできます。
第一引数でパッケージ型アプリの [Mini manifest](https://developer.mozilla.org/ja/docs/Web/Apps/Packaged_apps#Mini-manifest_fields) の URL を渡します。

{% highlight javascript %}
var manifestUrl = 'http://www.example.com/fxosapp/manifest.webapp';

var req = navigator.mozApps.installPackage(manifestUrl);
req.onsuccess = function() {
	console.log(this.result.origin);
};
req.onerror = function() {
	console.log(this.error.name);
};
{% endhighlight %}

## 外部サイトから Marketplace のアプリに installPackage してみる
では、Marketplace にホストされているアプリに対して外部の Web サイトから installPackage を呼び出すとどうなるでしょうか？

installPackage には Mini manifest の URL が必要です。Marketplace のアプリの情報は Marketplace API で取得できます。例えば Flappy Birds の情報は Marketplace API を呼び出すこちらの URL で取得できます。

<https://marketplace.firefox.com/api/v1/apps/app/flappy-birds/?format=JSON>

API が返す JSON オブジェクトの "manifest_uri" プロパティからマニフェストの URL が得られます。パッケージ型アプリならこれが Mini manifest の URL です。

{% highlight javascript %}
"manifest_url": "https://marketplace.firefox.com/app/09490ca4-2e4b-4802-a112-28d3888ea400/manifest.webapp",
{% endhighlight %}

では、実際に外部サイトからこの Mini manifest URL で installPackage を呼び出すとどうなるでしょう？ 

結果はインストールが失敗します。

## インストールが失敗する原因

なぜインストールが失敗するのでしょうか？ それはパッケージが署名されているのが原因でした。

特権 (privileged) アプリは Marketplace 以外からのインストールが許されていないのはよく知られていると思います。しかし実は特権アプリでなくても  Marketplace のパッケージ型アプリは署名されていて、その署名のために Marketplace 以外からのインストールは失敗します。

パッケージ型アプリの署名については[にしむねあさんのスライド](http://www.slideshare.net/muneakinishimura/firefox-os-26501584/12)に良い説明がありますので、興味がある方はそちらをご覧ください。

この署名ではアプリが改ざんされていないことと署名者が秘密鍵を持つ Firefox Marketplace であることは検証されます。しかし、installPackage を呼び出したサイトのドメイン (オリジン) に関しては検証されません。

それでもインストールが失敗するのはなぜでしょう？ installPackage のコードを調べて分かりました。署名付きアプリの場合は installPackage の呼び出し元オリジンが Marketplace ("https://marketplace.firefox.com")  以外ならエラーにするという実装になっていたのです。

こちらがそのコードになります。[B2G/source/dom/apps/src/Webapps.jsm#3066](
http://mxr.mozilla.org/mozilla-b2g28_v1_3/source/dom/apps/src/Webapps.jsm#3066)

{% highlight javascript %}
3066   _checkSignature: function(aApp, aIsSigned, aIsLocalFileInstall) {
3067     // XXX Security: You CANNOT safely add a new app store for
3068     // installing privileged apps just by modifying this pref and
3069     // adding the signing cert for that store to the cert trust
3070     // database. *Any* origin listed can install apps signed with
3071     // *any* certificate trusted; we don't try to maintain a strong
3072     // association between certificate with installOrign. The
3073     // expectation here is that in production builds the pref will
3074     // contain exactly one origin. However, in custom development
3075     // builds it may contain more than one origin so we can test
3076     // different stages (dev, staging, prod) of the same app store.
3077     //
3078     // Only allow signed apps to be installed from a whitelist of
3079     // domains, and require all packages installed from any of the
3080     // domains on the whitelist to be signed. This is a stopgap until
3081     // we have a real story for handling multiple app stores signing
3082     // apps.
3083     let signedAppOriginsStr =
3084       Services.prefs.getCharPref("dom.mozApps.signed_apps_installable_from");
3085     // If it's a local install and it's signed then we assume
3086     // the app origin is a valid signer.
3087     let isSignedAppOrigin = (aIsSigned && aIsLocalFileInstall) ||
3088                              signedAppOriginsStr.split(",").
3089                                    indexOf(aApp.installOrigin) > -1;
3090     if (!aIsSigned && isSignedAppOrigin) {
3091       // Packaged apps installed from these origins must be signed;
3092       // if not, assume somebody stripped the signature.
3093       throw "INVALID_SIGNATURE";
3094     } else if (aIsSigned && !isSignedAppOrigin) {
3095       // Other origins are *prohibited* from installing signed apps.
3096       // One reason is that our app revocation mechanism requires
3097       // strong cooperation from the host of the mini-manifest, which
3098       // we assume to be under the control of the install origin,
3099       // even if it has a different origin.
3100       throw "INSTALL_FROM_DENIED";
3101     }
3102   },
{% endhighlight %}

このコードで取得している `"dom.mozApps.signed_apps_installable_from"` のプリファレンスには[こちらのコード](http://mxr.mozilla.org/mozilla-b2g28_v1_3/source/modules/libpref/src/init/all.js#4493)で `"https://marketplace.firefox.com"` が設定されています。

このプリファレンスにはカンマ区切りで複数の値を指定できるので、複数のアプリストアを登録することは仕組みとしては可能なようです。(署名検証のためにそのストアの証明書の追加も必要になります)

ただし、コードのコメントにあるように、現状でここに複数のアプリストアを登録するのはセキュリティ的に問題があるようです。前述のように署名検証でストアのオリジンはチェックされないため、ここに複数のアプリストアが登録された場合、あるストアで署名された特権アプリを、複数登録された別のストアから installPackage でインストール出来てしまいます。

ということで、現状では特権アプリをインストールできる複数のアプリストアをデバイスに持たせることには問題があるようです。とはいえ、[Firefox OS アプリのセキュリティモデル](https://wiki.mozilla.org/Apps/Security#Privileged_Application_Review_Guidelines)では、複数アプリストアに特権アプリのインストールを許可できるようにするのがゴールである ("Our goal is that multiple stores will become approved for installing privileged app")、と言っていますので、将来的に強いニーズがあれば何らかの仕組みが実装されるのでしょう。

ちなみに、自分は Marketplace 以外から特権アプリをインストールできないのはアプリのパッケージをホストするサイトのオリジンで制限していると勘違いしていましたが、今回調べて、installPackage を呼んでいるサイトのオリジンで制限していることが分かりました。

## まとめ
- Marketplace のパッケージ型アプリを外部から installPackage することは出来ない。
- Marketplace のパッケージ型アプリは特権アプリか否かに関わらず署名されていて、installPackage は署名されたアプリを "https://marketplace.firefox.com" 以外からインストールできないようにしているため。
- 特権アプリのインストールを許可するアプリストアを複数持たせることは現状の仕組みではセキュリティ的に問題があるとされているが、必要があればサポートされるはず。
