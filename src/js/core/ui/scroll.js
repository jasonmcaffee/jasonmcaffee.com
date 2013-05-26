define([
    'core/util/log',
    'jquery'
], function(log, $){
    log('scroll module loaded');

    var hasScrolled = false,
        scrollInterval = 100,
        callbackUniqueId = 0,
        scrollPosition=0;

    var scroll = {
        callbacks : [],
        init: function(){
            $(window).scroll(function(){
                hasScrolled = true;
            });

            setInterval(this.scrollInterval.bind(this), scrollInterval);
        },
        scrollInterval: function(){
            if(hasScrolled){
                hasScrolled = false;
                var newScrollPosition = $(window).scrollTop();
                var amountScrolled = newScrollPosition - scrollPosition;
                scrollPosition = newScrollPosition;

                for(var i=0; i<this.callbacks.length; ++i){
                    var c = this.callbacks[i];
                    c(scrollPosition, amountScrolled);
                }
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

    return scroll;
});