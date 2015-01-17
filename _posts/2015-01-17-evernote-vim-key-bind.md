---
layout: post
title: "Evernote で Vim キーバインド (Max OS X 限定)"
description: ""
category: 
tags: [Evernote, Tips]
---
{% include JB/setup %}

Karabiner (旧 KeyRemap4MacBook) を使うと Evernote でも Vim キーバインドの利用が可能です。
（今回は KeyRemap4MacBook でしか試してないけど、Karabiner でも動くはず）

### KeyRemap4MacBook (Karabiner) のインストール

こちらのサイトからインストールします。

- Karabiner: <https://pqrs.org/osx/karabiner/index.html.ja>

OS X 10.9 (Mavericks) 以降は Karabiner, 10.8 (Mountain Lion) 以前は KeyRemap4MacBook をインストールします。

### VIM Emulation を有効にする

KeyRemap4MacBook (Karabiner) の Preference から VIM Emulation の項目を有効にします。

![](/assets/posts/2015-01-17/vimemu.png)

これで、ESC でノーマルモードに入って Vim キーバインドでのカーソル移動などが出来るようになります。

### Evernote だけに VIM Emulation を有効にする

デフォルトでは全てのアプリで Vim Emulation が有効になっています (ターミナル, MacVim, Firefox, Emacs, パスワード入力ポップアップを除く)。

これを Evernote だけに限定したい場合、「private.xml」に VIM_EMU_ONLY_APPS という設定を追加します。

KeyRemap4MacBook (Karabiner) の [Misc & Uninstall] タブの [Open private.xml] で private.xml を開きます。

![](/assets/posts/2015-01-17/openprivate.png)

次のように pvivate.xml に設定を追加します。

``` xml
<?xml version="1.0"?>
<root>
     <appdef>
		<appname>EVERNOTE</appname>
		<equal>com.evernote.Evernote</equal>
     </appdef>

     <replacementdef>
		<replacementname>VIM_EMU_ONLY_APPS</replacementname>
		<replacementvalue>EVERNOTE</replacementvalue>
     </replacementdef>
</root>
```

ファイルを保存したら、[Change Key] タブの [ReloadXML] で設定を有効化します。

![](/assets/posts/2015-01-17/reloadxml.png)


### 補足: 複数アプリの指定

VIM_EMU_ONLY_APPS にはカンマ区切りで複数のアプリを指定できます。

アプリを定義するには、上の EVERNOTE の例のように、&lt;appdef&gt; でアプリのバンドル ID を指定する必要があります。一部のアプリは `/Applications/KeyRemap4MacBook.app/Contents/Resources/appdef.xml` に既に定義されていますが、その他のアプリについては自分でバンドル ID を調べる必要があります。

バンドル ID は KeyRemap4MacBook (Karabiner) の EventViewer で調べられます。次のページを参考にしてください。

- [private.xml Reference Manual - Specify application](https://pqrs.org/osx/karabiner/xml.html.ja#appdef)

### 参考記事
- [『Vim以外でVimする: Mac編』](http://rcmdnk.github.io/blog/2013/06/10/computer-mac-keyremap4macbook-vim/)
- [『Karabinder: 設定の追加の方法』](https://pqrs.org/osx/karabiner/document.html.ja#privatexml)


