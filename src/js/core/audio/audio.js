define([
    'core/util/log',
    'modernizer'
], function (log, modernizr) {
    log('audio module loaded');
    var audio = {
        init:function(){
            log('core audio init called');
            if(modernizr.webaudio){
                if(typeof webkitAudioContext != 'undefined'){
                    this.audioContext = new webkitAudioContext();
                }else if(typeof AudioContext != 'undefined'){
                    this.audioContext = new AudioContext();
                }else{
                    log('NO WEBAUDIO SUPPORT');
                    this.audioContext = {noWebAudio:true};
                }
            }else{
                log('NO WEBAUDIO SUPPORT');
                this.audioContext = {noWebAudio:true};
            }
        }
    };

    return audio;
});