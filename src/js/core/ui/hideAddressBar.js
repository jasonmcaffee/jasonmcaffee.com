define([
    'core/util/log',
    'jquery',
    'modernizer'
], function(log, $, modernizr){
    log('hideAddressBar module loaded');

    //http://mobile.tutsplus.com/tutorials/mobile-web-apps/remove-address-bar/
    function hideAddressBar(){
        log('hideAddressBar called');
        if(modernizr.addressbaradjustment){
            if(document.height < window.outerHeight)
            {
                var diff = window.outerHeight - document.height;
                diff = diff < 4 ? 4 : diff;//ios 5 lies
                log('address bar size is: ' + diff);
                document.body.style.height = (window.outerHeight + diff) + 'px';
                setTimeout( function(){ window.scrollTo(0, 1); }, 1 );
            }
        }

    }

    return hideAddressBar;
});


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