define([
    'core/util/log',
    'jquery'
], function(log, $){
    log('orientation module loaded');

    var callbackUniqueId = 0;

    var orientation = {
        callbacks : [],
        init: function(){
            $(window).on('orientationchange', this.orientationChange.bind(this));
            //window.addEventListener('orientationchange', this.orientationChange.bind(this));

            this.currentOrientation = this.getCurrentOrientation(window.orientation);
            //alert('orientation now: ' + this.currentOrientation);
        },
        currentOrientation:'portrait',
        getCurrentOrientation:function(o){
            switch(o)
            {
                case -90:
                case 90:
                    return 'landscape';
                    break;
                default:
                    return 'portrait';
                    break;
            }
        },
        orientationChange: function(){
            this.currentOrientation = this.getCurrentOrientation(window.orientation);

            //alert('orientation now: ' + this.currentOrientation);

            for(var i=0; i<this.callbacks.length; ++i){
                var c = this.callbacks[i];
                c(this.currentOrientation);
            }
        },
        on:function(callback){
            callback._scroll_callback_id = callbackUniqueId++;
            this.callbacks.push(callback);
        },
        off:function(callback){
            for(var i=0; i<this.callbacks.length; ++i){
                var c = this.callbacks[i];
                if(c._scroll_callback_id === c._scroll_callback_id){
                    this.callbacks.splice(i, 1);
                    break;
                }
            }

        }
    };

    return orientation;
});