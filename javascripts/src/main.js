
window.addEventListener('load', function() {
    'use strict';

    var tooltip = require('wcl-tooltip');
    tooltip.init('#tooltip-menu', {
        position: 'bottom-left',
        arrow: false
    });
    tooltip.init('#tooltip-square', {
        type: 'hover',
        theme: 'dark'
    });

});
