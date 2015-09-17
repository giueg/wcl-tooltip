
window.addEventListener('load', function () {
    'use strict';

    var tooltip = require('wcl-tooltip');
    tooltip.init('.tooltipped', {
        type: 'click',
        position: 'bottom-left'
    });

    var count = 0;
    var beforeRender = function(html) {
        count++;
        return html + ' count:' + count;
    };

    tooltip.init('.tooltip-hover-top-left-dark', {
        type: 'hover',
        position: 'top-left',
        theme: 'dark',
        beforeRender: beforeRender
    });

    tooltip.init('.tooltip-hover-top-dark', {
        type: 'hover',
        position: 'top',
        theme: 'dark',
        beforeRender: beforeRender
    });

    tooltip.init('.tooltip-hover-top-right-dark', {
        type: 'hover',
        position: 'top-right',
        theme: 'dark',
        beforeRender: beforeRender
    });

    tooltip.init('.tooltip-hover-right-top-dark', {
        type: 'hover',
        position: 'right-top',
        theme: 'dark',
        beforeRender: beforeRender
    });

    tooltip.init('.tooltip-hover-right-dark', {
        type: 'hover',
        position: 'right',
        theme: 'dark',
        beforeRender: beforeRender
    });

    tooltip.init('.tooltip-hover-right-bottom-dark', {
        type: 'hover',
        position: 'right-bottom',
        theme: 'dark',
        beforeRender: beforeRender
    });

    tooltip.init('.tooltip-hover-bottom-left-dark', {
        type: 'hover',
        position: 'bottom-left',
        theme: 'dark',
        beforeRender: beforeRender
    });

    tooltip.init('.tooltip-hover-bottom-dark', {
        type: 'hover',
        position: 'bottom',
        theme: 'dark',
        beforeRender: beforeRender
    });

    tooltip.init('.tooltip-hover-bottom-right-dark', {
        type: 'hover',
        position: 'bottom-right',
        theme: 'dark',
        beforeRender: beforeRender
    });

    tooltip.init('.tooltip-hover-left-top-dark', {
        type: 'hover',
        position: 'left-top',
        theme: 'dark',
        beforeRender: beforeRender
    });

    tooltip.init('.tooltip-hover-left-dark', {
        type: 'hover',
        position: 'left',
        theme: 'dark',
        beforeRender: beforeRender
    });

    tooltip.init('.tooltip-hover-left-bottom-dark', {
        type: 'hover',
        position: 'left-bottom',
        theme: 'dark',
        beforeRender: beforeRender
    });

    tooltip.init('.tooltip-click-menu', {
        type: 'click',
        position: 'bottom-right',
        arrow: false
    });
});
