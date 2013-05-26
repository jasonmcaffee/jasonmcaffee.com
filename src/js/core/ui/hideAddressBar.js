define([
    'core/util/log',
    'jquery',
    'modernizer',
    'core/device/DeviceInfo',
    'core/util/cookieMonster'
], function(log, $, modernizr, deviceInfo, cookieMonster){
    log('hideAddressBar module loaded');

    //http://mobile.tutsplus.com/tutorials/mobile-web-apps/remove-address-bar/
    //should only be called when address bar is visible.
    function hideAddressBar(){
        log('hideAddressBar called');
        if(modernizr.addressbaradjustment){
            if((deviceInfo.os == 'ios') &&
                document.height < window.outerHeight)
            {
                calculateAddressBarHeight(function(addressBarHeight){
//                    document.body.style.height = (window.outerHeight + addressBarHeight -16) + 'px';
//                    setTimeout( function(){ window.scrollTo(0, 1); }, 1 );
                });
                //worked well, but want exact
                var diff = window.outerHeight - document.height;
                diff = diff < 4 ? 4 : diff;//ios 5 lies
                log('address bar size is: ' + diff);
                document.body.style.height = (window.outerHeight + diff) + 'px';
                setTimeout( function(){ window.scrollTo(0, 1); }, 1 );

            }

            if(deviceInfo.browser == 'android'){
                //var diff = window.outerHeight - document.height;
                //diff = diff < 4 ? 4 : diff;//ios 5 lies
                var diff = 56;

                calculateAddressBarHeight(function(addressBarHeight){
                    //logDimensions();
                    document.body.style.height = window.innerHeight + addressBarHeight + 'px';
                    setTimeout( function(){ window.scrollTo(0, 1); }, 1 );
                });
                //alert('window.screen.height: ' + window.screen.height + ' document.height: ' + document.height + ' address bar size is: ' + diff + ' scrollHeight: ' + document.body.scrollHeight);
                //document.body.style.height = (document.height + diff) + 'px';
                //setTimeout( function(){ window.scrollTo(0, 1); }, 1 );

            }
        }

    }

    function logDimensions(){
        $('body').on('click', function(e){
            e.preventDefault();
            var heightBeforeScroll = document.body.clientHeight;
            var diff = 55;

            logDimensions();
        });

        var dimensions = {
            clientHeight : document.body.clientHeight,
            bodyHeight: $('body').height(),
            bodyScrollHeight: document.body.scrollHeight,
            documentHeight: document.height,
            windowScreenHeight: window.screen.height,
            windowInnerHeight: window.innerHeight,
            windowOuterHeight: window.outerHeight

        };

        alert(JSON.stringify(dimensions));
    }

    //scrolls the page and calculates window.innerHeight to determine the scrollbar size.
    //should only be ran once, then have the value stored in a cookie.
    //requires the page be scrollable.(not an inner element)
    var addressBarHeightCookieName = 'addressBarHeight';
    function calculateAddressBarHeight(callback){
        //try reading from a cookie first, since we don't want to do this over and over again.
        var addressBarHeightCookie = cookieMonster.read(addressBarHeightCookieName);
        if(addressBarHeightCookie){
            addressBarHeightCookie = parseInt(addressBarHeightCookie);
            //alert('addressBarHeight already calculated and stored in cookie: ' + addressBarHeightCookie);
            if(callback){
                //callback(addressBarHeightCookie);
            }
            //return;//don't continue
        }

        var isScrollable = document.body.scrollHeight > document.body.clientHeight;
        //if already scrollable, just scroll the page.
        //if(isScrollable){
            var heightBeforeScroll = window.innerHeight;

            function done(){
                var addressBarHeight = window.innerHeight - heightBeforeScroll;
                var heightWhenAddressBarIsHidden = window.innerHeight;
                //logDimensions();
                log('done calculateAddressBarHeight');
                cookieMonster.create(addressBarHeightCookieName, addressBarHeight, 365);
                //reset scroll position and call the callback
                setTimeout(function(){
                    window.scrollTo(0,0);
                    setTimeout(function(){
                        if(callback){
                            callback(
                                addressBarHeight//,
                                //heightWhenAddressBarIsHidden: heightWhenAddressBarIsHidden
                            );
                        }
                    },1);

                },1);

            }

            //logDimensions();
            setTimeout(function(){
                window.scrollTo(0,0);//first scroll to the top
                setTimeout(function(){
                    heightBeforeScroll = window.innerHeight;
                    setTimeout(function(){
                        window.scrollTo(0, 100);
                        if(heightBeforeScroll >= window.innerHeight){
                            //android 2.3 needs a little extra time
                            setTimeout(function(){
                                if(heightBeforeScroll >= window.innerHeight){
                                    //one more
                                    setTimeout(function(){
                                        done();
                                    }, 200);
                                }else{
                                    done();
                                }
                            },10);
                        }else{
                            done();
                        }
                    }, 1);
                }, 1);
            }, 1);



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