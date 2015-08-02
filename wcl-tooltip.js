+function () {
    "use strict";

    var _ = {
            extend: function () {
                var args = Array.prototype.slice.call(arguments),
                    len = args.length,
                    ret = {};

                for (var i = 0; i < len; i++) {
                    var arg = args[i];
                    for (var key in arg) {
                        if (arg.hasOwnProperty(key))
                            ret[key] = arg[key];
                    }
                }

                return ret;
            }
        },
        Event = {
            addClickEvent: function (el, handler) {
                if (el.addEventListener) {
                    el.addEventListener('click', handler, false);
                } else if (el.attachEvent) {
                    el.attachEvent('onclick', handler);
                }
            },
            removeClickEvent: function (el, handler) {
                if (el.removeEventListener) {
                    el.removeEventListener('click', handler, false);
                } else if (el.detachEvent) {
                    el.detachEvent('onclick', handler);
                }
            }
        },
        DOM = function () {
            var matchesFn;
            // find vendor prefix
            ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
                if (typeof document.body[fn] == 'function') {
                    matchesFn = fn;
                    return true;
                }
                return false;
            });

            return {
                closest: function (el, selector) {
                    // traverse parents
                    while (el !== null) {
                        var parent = el.parentElement;
                        if (parent !== null && parent[matchesFn](selector)) {
                            return parent;
                        }
                        el = parent;
                    }

                    return null;
                },
                hasClass: function (el, className) {
                    if (el.classList)
                        return el.classList.contains(className);
                    else
                        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
                },
                addClass: function (el, className) {
                    if (el.classList) {
                        el.classList.add(className);
                    } else {
                        el.className += className;
                    }
                },
                removeClass: function (el, className) {
                    if (el.classList) {
                        el.classList.remove(className);
                    } else {
                        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    }
                }
            };
        }(),
        Bounds = {
            viewport: function () {
                return {
                    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
                }
            }
        },
        Tooltip = {
            defaultOption: {
                position: 'auto'
            },
            headerHtml: (function () {/*
             <div class="wcl-tooltip-header">
                <h1 class="wcl-tooltip-title">__TITLE__</h1>
                <a href="javascript:void(0)" class="wcl-tooltip-close">
                    <img width="18" height="18" alt="close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFMklEQVR4Xu3dTWoVQRSG4S86FjcjBJ2L4lRcgEF3oRgRN6GCGQpuQNGZILgenSuFtunc3NyuU3VO1fnL1Jvq7nqfVLd9/46QP6Fn4Cj00efBIwEER5AAEkDwGQh++LkCJIDgMxD88HMFSADBZyD44ecKkABEZuApgA8AfoqMHm/QmwAeAXjHfegSK8ArAM8AfAdwPxF0JyvxPwM4BnAK4GX3iKsBuAEs8ZdNJIK+Wuv4y0isCDgB7MZPBPzx2RFwAbgqfiJoQ7DvL393JJaVgAPAVvxEQENQE59tJegFUBs/EdQhoMRnQdADgBo/ERxG0BK/G0ErgNb4iWA/gp74XQhaAPTGTwQXEXDEb0ZABcAVPxH8nQHO+E0IKADK7d03ddcypEdFvVkkEX+Z+BMA72sqUADcAPAJwJ2agYmPiYZAMv43AA8A/KppQAFQxksENbMqd7W/tXVS/DIYFUAi2EpgKH4rgETQhkDNsr/e/ZYVYPn9PB3UQ1AZv2cFSAQO4nMAyNOBsXP+7u72nALWY+Xp4DIEtcs+1zXA7iEngvMZMRGf6xSQK8HFPwUz8SUARL8mMBVfCkBUBObiSwKIhsBkfGkAURCYjT8CgHcEpuOPAuAVgfn4IwF4Q+Ai/mgAXhC4iT8DgHUEruLPAmAVgbv4MwFYQ+Ay/mwAVhC4ja8BgHYEruNrAaAVgfv4mgBoQxAivjYAWhCEia8RwGwEoeJrBTALQbj4mgGMRhAyvnYAoxBcW30OX9km5w/5vXqcG68Zi+tl4TXban2M5KuNfwC4DuBW684d+D318S2sAMv8SiIQaA8T8S0BkD4dcCIwE98aAAsITMW3CEAzAnPxrQLQiMBkfMsANCEwG986AA0ITMf3AGAmAvPxvQCYgcBFfE8ARiJwE98bgAXBl3/fr8N5c2cZq3yg5b3aD2GU2AHuMS08F0A55vKs3lehe/tlP8pzB3c9fRGWJwCST+muEbr6WFsvAEbFX58KXHwlngcAo+O7QmAdwKz4bhBYBjA7vgsEVgFoiW8egUUA2uKbRmANgNb4ZhFYAqA9vkkEVgBYiW8OgQUAkvHLXb3ysvBjyv3myseauGOoHYBk/OVZvTIHYb8NTTOAEfGXr1aTfN+B6pVAK4CR8ZcVPSQCjQBmxA+LQBuAmfFDItAEQEP8cAi0ANAUPxQCDQA0xg+DYDYAzfFDIJgJwEJ89whmAbAU3zWCGQAsxneLYDQAy/FdIhgJwEN8dwhGAfAU3xWCEQA8xneDQBqA5/guEEgCiBDfPAIpAJHim0YgASBifLMIuAFEjm8SASeAjH/+cmEzLy/jApDxL79W3AQCDgAZ/+o3CqhH0Asg42+/S0Q1gh4AGX87vvoLw1YAGb8+vmoELQAyPj2+WgRUABm/Pb5KBBQAGb8/vjoEFABPALzlm4P/I7n67F3C/Ej97+A3gBMAZzX7QgFQxnsB4LRm4MrHRI0vtRKU+M8BvK6cf1ABcCKIHp8bATl+2YEWABwIMv7FP9He00FT/B4APQgy/v71uRVBc/xeAC0IMv7hkzMVQVd8DgAUBBm/7sqsFkF3fC4ANQgyfl382gtDlvicAA4hyPi0+FsI2OJzA9iHIOO3xb8KAWt8CQBrBBm/L/4ugtvUmzw1m2+9D7A19mMAHz19u9bWAQv/e7kwfFh7e5eyL1IAKPuQj504Awlg4uRr2HQC0FBh4j4kgImTr2HTCUBDhYn7kAAmTr6GTScADRUm7kMCmDj5GjadADRUmLgPCWDi5GvY9B/LJC6fN6v7PQAAAABJRU5ErkJggg==" />
                </a>
             </div>
            */}).toString().match(/\/\*([^]*)\*\//)[1],
            init: function () {
                var createdElement;
                var firstInit = true;

                function calcPosition(target, tooltip, option) {
                    var targetRect = target.getBoundingClientRect(),
                        tooltipRect = tooltip.getBoundingClientRect(),
                        scrollX = window.scrollX,
                        scrollY = window.scrollY,
                        position = option.position === 'auto' ? function(t, d) {
                            if (t.top > t.bottom) {
                                return 'top';
                            }
                            return 'bottom';
                        }(targetRect, tooltipRect) : option.position;

                    DOM.addClass(tooltip, 'wcl-tooltip-' + position);

                    switch (position) {
                        case 'top':
                            tooltip.style.top = (scrollY + targetRect.top - tooltipRect.height - 6) + 'px';
                            break;
                        case 'bottom':
                            tooltip.style.top = (scrollY + targetRect.bottom + 6) + 'px';
                            break;
                        case 'right':
                            tooltip.style.top = (scrollY + targetRect.top + targetRect.height / 2 - tooltipRect.height / 2) + 'px';
                            tooltip.style.left = (scrollX + targetRect.left + targetRect.width + 6) + 'px';
                            break;
                        case 'left':
                            tooltip.style.top = (scrollY + targetRect.top + targetRect.height / 2 - tooltipRect.height / 2) + 'px';
                            tooltip.style.left = (scrollX + targetRect.left - tooltipRect.width - 6) + 'px';
                            break;
                        default :
                    }
                }

                return function (selector, option) {
                    option = _.extend(Tooltip.defaultOption, option);

                    if (firstInit) {
                        Event.addClickEvent(document, function (o) {
                            if (createdElement &&
                                (!DOM.hasClass(o.target, 'wcl-tooltip-holder') && !DOM.closest(o.target, '.wcl-tooltip-holder') ||
                                (DOM.hasClass(o.target, 'wcl-tooltip-close') || DOM.closest(o.target, '.wcl-tooltip-close')))
                            ) {
                                DOM.removeClass(createdElement.parentElement, 'wcl-tooltip-holder');
                                createdElement.remove();
                                createdElement = null;
                            }
                        });
                        firstInit = false;
                    }

                    var obj = document.querySelectorAll(selector);
                    for (var i = 0, length = obj.length; i < length; i++) {
                        Event.addClickEvent(obj.item(i), function () {
                            if (DOM.hasClass(this, 'wcl-tooltip-holder')) return;

                            var element = document.createElement('div');

                            var text;
                            if (this.hasAttribute('data-wcltip-text')) {
                                text = this.getAttribute('data-wcltip-text');
                            } else if (this.hasAttribute('data-wcltip-text-src')) {
                                text = document.getElementById(this.getAttribute('data-wcltip-text-src')).innerHTML;
                            } else if (this.hasAttribute('data-wcltip-html-src')) {
                                text = document.getElementById(this.getAttribute('data-wcltip-html-src')).innerHTML;
                                if (this.hasAttribute('data-wcltip-title')) {
                                    text = Tooltip.headerHtml.replace('__TITLE__', this.getAttribute('data-wcltip-title')) + text;
                                }
                            }
                            element.innerHTML = text;
                            DOM.addClass(element, 'wcl-tooltip');

                            this.appendChild(element);
                            calcPosition(this, element, option);

                            DOM.addClass(this, 'wcl-tooltip-holder');

                            if (createdElement) {
                                DOM.removeClass(createdElement.parentElement, 'wcl-tooltip-holder');
                                createdElement.remove();
                                createdElement = null;
                            }
                            createdElement = element;
                        });
                    }
                };
            }()
        };

    module.exports = Tooltip;
}();