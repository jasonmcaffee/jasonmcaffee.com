define([
    'core/util/log',
    'modernizer'
], function (log, modernizr) {
    log('audio module loaded');
    var audio = {
        init:function(){
            log('core audio init called');
            if(modernizr.webaudio){
                this.audioContext = new webkitAudioContext();
            }
        }
    };

    return audio;
});