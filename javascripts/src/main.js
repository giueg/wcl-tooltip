
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

    var tables = document.getElementsByTagName('table');
    for (var i = 0, il = tables.length; i < il; i++) {
        tables[i].className = 'mdl-data-table mdl-js-data-table mdl-shadow--1dp';
        componentHandler.upgradeElement(tables[i]);
    }
});
