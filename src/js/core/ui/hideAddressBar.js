define([
    'core/util/log',
    'jquery'
], function(log, $){
    log('hideAddressBar module loaded');

    //http://mobile.tutsplus.com/tutorials/mobile-web-apps/remove-address-bar/
    function hideAddressBar(){
        log('hideAddressBar called');
//        $(function(){
//            $(window).on('load', function(){    //wait until everything is done loading.
//
//                    if(document.height < window.outerHeight)
//                    {
//                        alert('adjust');
//                        document.body.style.height = (window.outerHeight + 50) + 'px';
//                    }
//                    document.body.style.height = (window.outerHeight + 50) + 'px';
//                    setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
//
//            });
//        });
    }

    return hideAddressBar;
});