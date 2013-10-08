define([
    'core/util/log',
    'modernizer'
], function (log, modernizr) {
    log('audio module loaded');
    var audio = {
        init:function(){
            log('core audio init called');
            if(modernizr.webaudio){
                //try newer standard first
                if(typeof AudioContext != 'undefined'){
                    this.audioContext = new AudioContext();
                }else if(typeof webkitAudioContext != 'undefined'){
                    this.audioContext = new webkitAudioContext();
                }else{
                    log('NO WEBAUDIO SUPPORT');
                    this.audioContext = {noWebAudio:true};
                }
            }else{
                log('NO WEBAUDIO SUPPORT');
                this.audioContext = {noWebAudio:true};
            }
        },

        createGain:function(){
            if(this.audioContext.createGain){
                return this.audioContext.createGain();
            }else{
                return this.audioContext.createGainNode();
            }
        }
    };

    return audio;
});