# wcl-tooltip

[![GitHub version](https://badge.fury.io/gh/kawausokun%2Fwcl-tooltip.svg)](http://badge.fury.io/gh/kawausokun%2Fwcl-tooltip)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/kawausokun/wcl-tooltip/master/LICENSE)
[![Circle CI](https://circleci.com/gh/kawausokun/wcl-tooltip.svg?style=shield)](https://circleci.com/gh/kawausokun/wcl-tooltip)
[![Code Climate](https://codeclimate.com/github/kawausokun/wcl-tooltip/badges/gpa.svg)](https://codeclimate.com/github/kawausokun/wcl-tooltip)

<!-- __SITE_DEMO__ -->

## Installation

```sh
npm install https://github.com/kawausokun/wcl-tooltip
```

## Usage

```js
window.addEventListener('load', function () {
  var tooltip = require('wcl-tooltip');
  tooltip.init('.i-need-tooltip', {
    type: 'click'
  });
});
```

```html
<span class="i-need-tooltip" data-wcltip-text="I'm tooltip!">data-wcltip-text</span>

<span class="i-need-tooltip" data-wcltip-text-src="menu2-tooltip">data-wcltip-text-src</span>
<span id="menu2-tooltip" style="display: none;">I'm tooltip too!</span>

<span class="i-need-tooltip" data-wcltip-html-src="menu3-tooltip" data-wcltip-title="Kuma-mon">data-wcltip-html-src</span>
<div id="menu3-tooltip" style="display: none;">
  <img src="img/kumamon.jpg" alt="kuma-mon"><br/>
</div>
```

## Option

### init options

| Option       | Values                                               | Description           |
|--------------|------------------------------------------------------|-----------------------|
| type         | click (default)<br> hover                            | Tooltip show trigger. |
| position     | auto (default)<br>top-left<br>top<br>top-right<br>left-top<br>left<br>left-bottom<br>bottom-left<br>bottom<br>bottom-right<br>right-top<br>right<br>right-bottom     | Tooltip position.     |
| theme        | standard (default)<br> dark                          | Tooltip look.         |
| arrow        | true (default)<br> false                             | Show arrow.           |
| beforeRender |                                                      | Hook method.          |

## License

[MIT](https://github.com/kawausokun/wcl-tooltip/blob/master/LICENSE)

## Author

[kawausokun](https://github.com/kawausokun)

## Roadmap

* input element support
* sticky theme
* ajax
* bower support
* direct html script src
* delay show
* responsive

## TODO

* Add minimum test
* min&map js

## Issues

* It have position problem when target element position is absolute.
