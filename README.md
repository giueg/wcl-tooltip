# wcl-tooltip

## Installation

```
npm install https://github.com/kawausokun/wcl-tooltip
```

## Usage

```
window.addEventListener('load', function () {
  var tooltip = require('wcl-tooltip');
  tooltip.init('.i-need-tooltip');
});
```

## Option

init options

| Option   | Values                                               | Description           |
|----------|------------------------------------------------------|-----------------------|
| type     | click (Default)<br> hover                            | tooltip show trigger. |
| position | auto (Default)<br> top<br> left<br> bottom<br> right | tooltip position.     |
| theme    | standard (Default)<br> dark                          | tooltip look.         |

## Roadmap

* arrow not display
* sticky theme
* bower support
* direct html script
* delay show

## TODO

* Add minimum test
* min&map js
