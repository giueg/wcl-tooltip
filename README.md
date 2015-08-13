# wcl-tooltip

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

| Option   | Values                                               | Description           |
|----------|------------------------------------------------------|-----------------------|
| type     | click (default)<br> hover                            | tooltip show trigger. |
| position | auto (default)<br> top<br> left<br> bottom<br> right | tooltip position.     |
| theme    | standard (default)<br> dark                          | tooltip look.         |

## Roadmap

* arrow not display
* ajax
* sticky theme
* bower support
* direct html script
* delay show

## TODO

* Add minimum test
* min&map js
