define([
    'core/util/log'
], function(log){
    log('cookieMonster module loaded');

    //http://www.quirksmode.org/js/cookies.html
    var cookieMonster = {
        create: function(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
        },
        read:function(name){
            var nameEQ = escape(name) + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' '){
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) == 0) {
                    return unescape(c.substring(nameEQ.length, c.length));
                }
            }
            return null;
        },
        delete:function(name){
            this.create(name, "", -1);
        }
    };

    return cookieMonster;
});