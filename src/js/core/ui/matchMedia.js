//only useful if you need to execute different js for different view ports. use _media-queries.scss instead.

///**
// * javascript module to dectect configured media query change matches so that a css class name can be added to the html
// * element.
// *
// * todo: perf test the breakpoint class name getting removed and then added to the html document. (might cause an unneeded reflow)
// * todo: polyfill for ie media queries.
// *
// * //http://css-tricks.com/snippets/css/media-queries-for-standard-devices/
// * //http://thesassway.com/intermediate/responsive-web-design-part-2#the_future_of_media_queries_in_sass
// * //http://cssmediaqueries.com/
// *
// **/
//define([
//    'core/util/log',
//    'jquery',
//    'underscore'
//], function(log, $, _){
//    //breakpoint variables defined for reuse
//    var smallMaxWidth= '325px',
//        mediumMaxWidth = '989px',
//        largeMinWidth = '1224px',
//        gianMinWidth = '1824px';
//
//    //breakpoints/mediaqueries we are concerned with.
//    var breakpoints = {
//        'small' : '(max-width : ' + smallMaxWidth+ ')',
//        'medium' : '',
//        'large' : ''
//    };
//
//    return {
//        /***
//         * Call this function to initialize break point detection.
//         * This will listen for media query changed events, and call handleMediaMatch when media query is fired.
//         *
//         * https://developer.mozilla.org/en-US/docs/DOM/Using_media_queries_from_code
//         */
//        initBreakpointDetection: function(){
//            log('initBreakpointDetection called.');
//
//            //iterate over each breakpoint and add a media query listener
//            _.each(breakpoints, function(breakpointQuery, breakpointName){
//
//            });
//        },
//
//        /**
//         * when a breakpoint is matched (page is loaded, rotated, resized), this function will be fired and a corresponding
//         * css class name will be added to the html element.
//         * e.g. if screen size is 325px, the class name 'small' will be added
//         */
//        handleMediaMatch: function(mql){
//            log('handleMediaMatch called');
//            if(mql.matches){
//                //wait for document ready
//                $(function(){
//                    $('html').removeClass().addClass();
//                });
//            }
//
//        }
//    };
//
//});