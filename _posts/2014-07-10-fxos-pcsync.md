---
layout: post
title: "パソコンから Firefox OS 端末のデータを管理できる『PC Sync』"
description: ""
category: 
tags: [Firefox OS]
---
{% include JB/setup %}

面白そうな Firefox OS アプリがあったので試してみました。

『PC Sync』は Firefox ブラウザのアドオンと連携して、パソコンから Firefox OS 端末のデータを管理できるアプリです。
パソコンと  Firefox OS 端末は USB ケーブルまたは WiFi 経由で接続します。 アドレス帳、写真、音楽、動画のインポート・エクスポートなどが出来ます。

PC Sync: https://marketplace.firefox.com/app/pc%E8%BF%9E%E6%8E%A5%E5%99%A8

![](/assets/posts/2014-07-10/pcsync.png)

Mozilla Online Limited ([Mozilla China](http://en.wikipedia.org/wiki/Mozilla_China)) で作っているそうです。Marketplace の URL にも出てくるアプリ識別子 (slug) が「pc连接器」と、もろに簡体字中国語で若干ビビります。。。

デモ動画も公開されています。

動画: http://download.firefox.com.cn/b2g/share/20140423/tutorial.webm

PC Sync を使うには、パソコン側に Firefox アドオン、Firefox OS 側には PC Sync アプリがインストールされている必要があります。

アドオンは Marketplace の[説明文](https://marketplace.firefox.com/app/pc%E8%BF%9E%E6%8E%A5%E5%99%A8)に URL があるのでそこから落とします。

なお、ブラウザのサポートバージョンは "Firefox browser v28" とありますが、現行の Firefos 30 で大丈夫でした。

Firefox OS 側でリモートデバッグを有効にし、パソコンと Firefox OS が USB ケーブルで接続できることを確認します。

そして、パソコン側でアドオン (Firefox OS Assistant) を表示します。Firefox OS 側では PC Sync アプリを起動して "Start" を押します。その後、アドオン側を再読み込みしたり USB ケーブルを抜き差ししたりしていたら、つながりました！

最初に表示される画面では、このようにストレージの使用量が表示されます。

![](/assets/posts/2014-07-10/top.png)

アドレス帳はこんな感じで、この画面で直接データを追加・編集することが出来ます。

![](/assets/posts/2014-07-10/addr.png)

また、エクスポートは vCard 形式で出来ます。

![](/assets/posts/2014-07-10/vcf.png)

こちらは写真 (ギャラリー) です。このようにサムネイルが表示され、写真の削除やインポート・エクスポートができます。(写真によってインポートが失敗したり、まだまだ不安定です)

![](/assets/posts/2014-07-10/photo.png)

これは特権 (privileged) アプリなのですが、認定 (certified) アプリでなくてもアドオンと組み合わせるとこんなことも出来るんだなーと感心しました。まだまだ不安定ですが、ちゃんと使えるようになったらかなり便利そうなので、将来に期待ですね。

ちなみに、Android でもこういったアプリが中国では流行ってるみたいなので、中国のチームらしい機能なのかもしれません

