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
        Effect = {
            fadeIn: function (el) {
                el.style.opacity = 0;

                var last = +new Date();
                var tick = function() {
                    el.style.opacity = +el.style.opacity + (new Date() - last) / 60;
                    last = +new Date();

                    if (+el.style.opacity < 1) {
                        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
                    }
                };

                tick();
            },
            fadeOut: function (el) {
                el.style.opacity = 1;

                var last = +new Date();
                var tick = function() {
                    el.style.opacity = +el.style.opacity - (new Date() - last) / 60;
                    last = +new Date();

                    if (+el.style.opacity > 0) {
                        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
                    }
                };

                tick();
            }
        },
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
            headerHtml: "\
             <div class='wcl-tooltip-header'>\
                <h1 class='wcl-tooltip-title'>__TITLE__</h1>\
                <a href='javascript:void(0)' class='wcl-tooltip-close'>\
                    <img width='18' height='18' alt='close' src='data:image/png;base64,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' />\
                </a>\
             </div>\
            ",
            bodyHtml: "\
             <div class='wcl-tooltip-body'>__BODY__</div>\
            ",
            init: function () {
                var createdElement;
                var holderElement;
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
                            tooltip.style.left = (scrollX + targetRect.left + targetRect.width / 2 - tooltipRect.width / 2) + 'px';
                            break;
                        case 'bottom':
                            tooltip.style.top = (scrollY + targetRect.bottom + 6) + 'px';
                            tooltip.style.left = (scrollX + targetRect.left + targetRect.width / 2 - tooltipRect.width / 2) + 'px';
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

                    firstInit && -function() {
                        var container = document.createElement('div');
                        container.id = 'wcl-tooltip-container';
                        document.body.appendChild(container);

                        Event.addClickEvent(document, function (o) {
                            if (createdElement &&
                                ((!DOM.hasClass(o.target, 'wcl-tooltip-holder') &&
                                !DOM.closest(o.target, '.wcl-tooltip-holder') &&
                                !DOM.closest(o.target, '.wcl-tooltip')) ||
                                (DOM.hasClass(o.target, 'wcl-tooltip-close') || DOM.closest(o.target, '.wcl-tooltip-close')))
                            ) {
                                DOM.removeClass(holderElement, 'wcl-tooltip-holder');
                                createdElement.remove();
                                createdElement = null;
                                holderElement = null;
                            }
                        });
                        firstInit = false;
                    }();

                    var obj = document.querySelectorAll(selector);
                    for (var i = 0, length = obj.length; i < length; i++) {
                        Event.addClickEvent(obj.item(i), function () {
                            if (DOM.hasClass(this, 'wcl-tooltip-holder')) return;

                            var element = document.createElement('div');

                            if (this.hasAttribute('data-wcltip-text')) {
                                element.textContent = this.getAttribute('data-wcltip-text');
                            } else if (this.hasAttribute('data-wcltip-text-src')) {
                                element.textContent = document.getElementById(this.getAttribute('data-wcltip-text-src')).innerHTML;
                            } else if (this.hasAttribute('data-wcltip-html-src')) {
                                var html = Tooltip.bodyHtml.replace('__BODY__', document.getElementById(this.getAttribute('data-wcltip-html-src')).innerHTML);
                                if (this.hasAttribute('data-wcltip-title')) {
                                    html = Tooltip.headerHtml.replace('__TITLE__', this.getAttribute('data-wcltip-title')) + html;
                                }
                                element.innerHTML = html;
                            }
                            DOM.addClass(element, 'wcl-tooltip');
                            Effect.fadeIn(element);

                            document.getElementById('wcl-tooltip-container').appendChild(element);
                            calcPosition(this, element, option);

                            DOM.addClass(this, 'wcl-tooltip-holder');

                            if (createdElement) {
                                DOM.removeClass(holderElement, 'wcl-tooltip-holder');
                                createdElement.remove();
                                createdElement = null;
                                holderElement = null;
                            }
                            createdElement = element;
                            holderElement = this;
                        });
                    }
                };
            }()
        };

    module.exports = Tooltip;
}();