---
layout: post
title: "Mocha/Chai/Sinon のメモ"
description: ""
category: 
tags: [Test, JavaScript]
---
{% include JB/setup %}


## リファレンス
### Mocha
- http://visionmedia.github.io/mocha/

### Chai
- Assertion Styles (アサーションの書き方)
	- http://chaijs.com/guide/styles/
- BDD API Reference
	- http://chaijs.com/api/bdd/

### Sinon
- Spy
	- http://sinonjs.org/docs/#spies
	- テスト対象の関数の実行回数や引数、返り値などを記録する。
- Stub
	- http://sinonjs.org/docs/#stubs
	- テスト対象の関数が呼ばれたときの振る舞い (返り値、例外の発生など) を設定する。
	- Spy を継承し、Spy の機能を全て持つ。
- Mock
	- http://sinonjs.org/docs/#mocks
	- スタブに事前に期待値を設定し、事後に verify() で期待値通りだったかテストする。
	- Stub を継承し、Stub の機能を全て持つ。
- Fake timers
	- http://sinonjs.org/docs/#clock-api
	- 時を操る。
- Fake XHR
	- http://sinonjs.org/docs/#server-api
	- サーバのふりをする。

## インストール (npm)

```
npm install --save-dev mocha
npm install --save-dev chai
npm install --save-dev sinon
```

- 以下のファイルを使う
	- node_modules/mocha/mocha.js
	- node_modules/mocha/mocha.css
	- node_modules/chai/chai.js
	- node_modules/sinon/pkg/sinon.js

## テスト例 (BDD)

``` javascript
var expect = require('chai').expect;
var user = { name: 'flatbird'};
describe('User', function() {
  it('should have a name', function() {
    // この関数内で例外が発生したらテスト失敗
    expect(user.name).to.exist;
    expect(user.name).to.be.a('string');
  });
});
```

- 非同期
	- it の引数で done を取るだけで非同期になる。
	- 処理が終わったところで done() をコール。

``` javascript
  it('should be done 1 second later', function(done) {
     setTimeout(function() {
          done()
     }, 1000);
  });
```

## テスト実行 (コマンド)

- mocha コマンドを叩くと `test/` フォルダ下のテストが自動的に実行される。
- `npm install -g` でインストールしなかった場合は以下の場所にある。

```
node_modules/mocha/bin/mocha
```

- `node run test` で実行する場合。
	- package.json に以下の記述を追加する。

``` javascript
"scripts": {
  "test": "node_modules/mocha/bin/mocha"
},
```

## テスト実行 (ブラウザ)

``` html
<html>
<head>
  <meta charset="utf-8">
  <title>Mocha Tests</title>
  <link rel="stylesheet" href="test/mocha.css" />
</head>
<body>
  <div id="mocha"></div>
  <script src="test/mocha.js"></script>
  <script src="test/chai.js"></script>
  <!-- Set up mocha -->
  <script>mocha.setup('bdd')</script>

  <!-- Test code should come here -->
  <script>
    describe('test example', function () {
      it('calculates well', function () {
        chai.expect(2 + 2).to.equal(4);
      });
    });
  </script>

  <!-- Call mocha.run() -->
  <script>
    window.onload = function() {
      mocha.run();
    };
  </script>
</body>
</html>

```

## 事前処理と事後処理
- describe ブロックの中に書く。
- beforeEach() / afterEach() … it で記述した各テストの実行前後に呼ばれる。
- before() / after() … 各 describe の前と後に一回だけ呼ばれる。

