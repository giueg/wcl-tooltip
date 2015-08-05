
window.addEventListener('load', function () {
    var tooltip = require('wcl-tooltip');
    tooltip.init('.tooltipped', {
        type: 'click'
    });

    tooltip.init('.tooltip-hover-top-dark', {
        type: 'hover',
        position: 'top',
        theme: 'dark'
    });

    tooltip.init('.tooltip-hover-right-dark', {
        type: 'hover',
        position: 'right',
        theme: 'dark'
    });

    tooltip.init('.tooltip-hover-bottom-dark', {
        type: 'hover',
        position: 'bottom',
        theme: 'dark'
    });

    tooltip.init('.tooltip-hover-left-dark', {
        type: 'hover',
        position: 'left',
        theme: 'dark'
    });
});
