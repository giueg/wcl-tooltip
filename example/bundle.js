(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

window.onload = function() {
  var tooltip = require('tooltip');
  tooltip.init('.tooltipped');
};

},{"tooltip":2}],2:[function(require,module,exports){
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
            init: function () {
                var createdElement;
                var firstInit = true;

                function calcPosition(target, tooltip, option) {
                    var targetRect = target.getBoundingClientRect();
                    var tooltipRect = tooltip.getBoundingClientRect();
                    var scrollX = window.scrollX;
                    var scrollY = window.scrollY;
                    var position = option.position === 'auto' ? function(t, d) {
                            if (window.scrollY + t.top > d.height) {
                                return 'top';
                            } else if (window.scrollY + t.bottom > d.height) {
                                return 'bottom';
                            } else if (window.scrollX + t.right > d.width) {
                                return 'right';
                            }
                            return 'left';
                        }(targetRect, tooltipRect) : option.position;

                    DOM.addClass(tooltip, 'tooltip-' + position);

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
                            if (createdElement && !DOM.hasClass(o.target, 'tooltip-holder') && !DOM.closest(o.target, '.tooltip-holder')) {
                                DOM.removeClass(createdElement.parentElement, 'tooltip-holder');
                                createdElement.remove();
                                createdElement = null;
                            }
                        });
                        firstInit = false;
                    }

                    var obj = document.querySelectorAll(selector);
                    var length = obj.length;
                    for (var i = 0; i < length; i++) {
                        Event.addClickEvent(obj.item(i), function () {
                            if (DOM.hasClass(this, 'tooltip-holder')) return;

                            var element = document.createElement('div');
                            element.innerHTML = this.getAttribute('data-tooltip-text');
                            DOM.addClass(element, 'tooltip');

                            this.appendChild(element);
                            calcPosition(this, element, option);

                            DOM.addClass(this, 'tooltip-holder');

                            if (createdElement) {
                                DOM.removeClass(createdElement.parentElement, 'tooltip-holder');
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
},{}]},{},[1]);
