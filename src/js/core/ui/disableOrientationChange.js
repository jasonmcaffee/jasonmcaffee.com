
define([
    'core/util/log',
    'jquery',
    'modernizer'
], function(log, $, modernizr){

    log('IN PROGRESS DONT USE. disableOrientationChange module loaded');

    function disableOrientationChange(){
        function reorient(e) {
            var portrait = (window.orientation % 180 == 0);
            $("body > div").css("-webkit-transform", !portrait ? "rotate(-90deg)" : "");
        }
        window.onorientationchange = reorient;
        window.setTimeout(reorient, 0);
    }

    return disableOrientationChange;
});

