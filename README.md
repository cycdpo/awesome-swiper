# Awesome Swiper

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/awesome-swiper.svg?style=flat-square
[npm-url]: https://npmjs.org/package/awesome-swiper
[travis-image]: https://img.shields.io/travis/cycdpo/awesome-swiper.svg?style=flat-square
[travis-url]: https://travis-ci.org/cycdpo/awesome-swiper
[david-image]: https://img.shields.io/david/cycdpo/awesome-swiper.svg?style=flat-square
[david-url]: https://david-dm.org/cycdpo/awesome-swiper
[david-dev-image]: https://david-dm.org/cycdpo/awesome-swiper/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycdpo/awesome-swiper?type=dev
[node-image]: https://img.shields.io/badge/node.js-%3E=_6.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/awesome-swiper.svg?style=flat-square
[download-url]: https://npmjs.org/package/awesome-swiper
[license-image]: https://img.shields.io/npm/l/awesome-swiper.svg?style=flat-square

awesome-swiper based on [swiper 4+](https://github.com/nolimits4web/Swiper). ([Releases](https://github.com/cycdpo/awesome-swiper/releases) | [Demo](https://cycdpo.github.io/awesome-swiper/))

[English](https://github.com/cycdpo/awesome-swiper/blob/master/README.md) | [中文](https://github.com/cycdpo/awesome-swiper/blob/master/README_zhCN.md)
***

## Install
```shell
# via npm
$ npm install awesome-swiper --save

# or via yarn
$ yarn add awesome-swiper
```

## Usage
**Awesome Swiper based on [Swiper 4+](https://github.com/nolimits4web/Swiper). Add Script of swiper in your project first**

```javascript
import AwesomeSwiper from 'awesome-swiper';

// OR
const AwesomeSwiper = require('awesome-swiper');

let awesomeSwiper = new AwesomeSwiper().init(context [, ...config , ...overlayConfig]);

// if need thumbs
let awesomeSwiper = new AwesomeSwiper()
                        .init(context [, ...config, ...overlayConfig])
                        .addThumbs(thumbsContext [, ...thumbsConfig]);
```

### `AwesomeSwiper().init()` params:
* `context`: [String | Element] the wrapper of swiper. Height and width of wrapper must be initialized.
* config: [Object]
  * `loop`: [Boolean] Set to `true` to enable loop. Default `false`.
  * `autoplay`: [Number] Set autoplay delay. `0` means close. Default `0`.
  * `mousewheel`: [Boolean] Set to `true` to enable navigation through slides using mouse wheel. Default `true`.
  * `pagination`: [Object] Set pagination. If you do not want a pagination, set `null`.
    * `color`: [String] `'default'` is blue. You also can set `'black'` or `'white'` and embed your own style
  * `navigation`: [Object] Set navigation. If you do not want a navigation, set `null`.
    * `color`: [String] `'default'` is blue. You also can set `'black'` or `'white'`
    * `styles`: [Object] Custom style
      * `prevEl` [Object] Custom style for prevEl.
      * `nextEl` [Object] Custom style for nextEl.
* overlayConfig: [Object] Use Custom swiper api to overlay config.

### `AwesomeSwiper().addThumbs()` params:
* `thumbsContext`: [String | Element] the wrapper of thumbs. Height and width of wrapper must be initialized.
* thumbsConfig: [Object] You can set it follow swiper api.
  * `direction`: [String] Set direction. Could be 'horizontal' or 'vertical'.
  * `spaceBetween`: [Number] Distance between slides in px. Default `10`.
  * `slidesPerView`: [Number | 'auto'] Number of slides per view. Default `'auto'`.

### new css classes in AwesomeSwiper
* `.swiper-full-img`: Full images container.
* `.swiper-explain`: Explain text container.

## Use in browser
```html
<link href="swiper.min.css" rel="stylesheet">
<link href="AwesomeSwiper.min.css" rel="stylesheet">

<div id="basic" class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">slide1</div>
    ...
  </div>
</div>

<script src="swiper.min.js"></script>
<script src="AwesomeSwiper.min.js"></script>
<script>
  new AwesomeSwiper().init('basic');
</script>
```

or use standalone:
```html
<link href="AwesomeSwiper.standalone.min.css" rel="stylesheet">

<div id="basic" class="swiper-container">
  ...
</div>

<script src="AwesomeSwiper.standalone.min.js"></script>
<script>
  new AwesomeSwiper().init('basic');
</script>
```

