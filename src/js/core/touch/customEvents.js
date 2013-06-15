/**
 * i haven't had a need to use this yet. might interfere with chordical.
 * todo: this might interfere with fastbutton. seems to work on desktop. need to check mobile.    a
 */

define([
    'core/util/log',
    'jquery',
    'underscore'
], function(log, $, _){
    log('touch customEvents module loaded');
    //stolen from zepto
    var customEvents = {
        init: function(){
//            var touch = {}, touchTimeout
//
//            function parentIfText(node){
//                return 'tagName' in node ? node : node.parentNode
//            }
//
//            function swipeDirection(x1, x2, y1, y2){
//                var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2)
//                return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
//            }
//
//            var longTapDelay = 750, longTapTimeout
//
//            function longTap(){
//                longTapTimeout = null
//                if (touch.last) {
//                    //console.log('triggering longTap');
//                    touch.el.trigger('longTap')
//                    touch = {}
//                }
//            }
//
//            function cancelLongTap(){
//                if (longTapTimeout) clearTimeout(longTapTimeout)
//                longTapTimeout = null
//            }
//
//            $(document).ready(function(){
//                //console.log('adding custom events like longTap, tap, singleTap, etc');
//                var now, delta
//
//                $(document.body).bind('touchstart', function(jqueryEvent){
//                    var e = jqueryEvent.originalEvent;
//                    now = Date.now()
//                    delta = now - (touch.last || now)
//                    touch.el = $(parentIfText(e.touches[0].target))
//                    touchTimeout && clearTimeout(touchTimeout)
//                    touch.x1 = e.touches[0].pageX
//                    touch.y1 = e.touches[0].pageY
//                    if (delta > 0 && delta <= 250) touch.isDoubleTap = true
//                    touch.last = now
//                    longTapTimeout = setTimeout(longTap, longTapDelay)
//                }).bind('touchmove', function(jqueryEvent){
//                        var e = jqueryEvent.originalEvent;
//                        cancelLongTap()
//                        touch.x2 = e.touches[0].pageX
//                        touch.y2 = e.touches[0].pageY
//                    }).bind('touchend', function(jqueryEvent){
//                        var e = jqueryEvent.originalEvent;
//                        cancelLongTap()
//
//                        // double tap (tapped twice within 250ms)
//                        if (touch.isDoubleTap) {
//                            touch.el.trigger('doubleTap')
//                            touch = {}
//
//                            // swipe
//                        } else if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
//                            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {
//                            //console.log('triggering swipe');
//                            touch.el.trigger('swipe') &&
//                            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
//                            touch = {}
//
//                            // normal tap
//                        } else if ('last' in touch) {
//                            //console.log('triggering tap');
//                            touch.el.trigger('tap')
//
//                            touchTimeout = setTimeout(function(){
//                                //console.log('triggering singleTap')
//                                touchTimeout = null
//                                touch.el.trigger('singleTap')
//                                touch = {}
//                            }, 250)
//                        }
//                    }).bind('touchcancel', function(){
//                        if (touchTimeout) clearTimeout(touchTimeout)
//                        if (longTapTimeout) clearTimeout(longTapTimeout)
//                        longTapTimeout = touchTimeout = null
//                        touch = {}
//                    })
//            })
//
//            //this breaks ie9, as ['a'].forEach is not supported.
////            ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(m){
////                $.fn[m] = function(callback){ return this.bind(m, callback) }
////            })
//
//            ;_.each(['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'], function(m){
//                $.fn[m] = function(callback){ return this.bind(m, callback) }
//            });

        }
    };

    return customEvents;
});