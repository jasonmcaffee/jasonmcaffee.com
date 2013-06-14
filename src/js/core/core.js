define([
    'core/util/log',
    'backbone',
    'core/plugins/handlebars/eachWithIndex',
    'core/plugins/handlebars/eachProperty',
    'core/mvc/View',
    'core/mvc/Controller',
    'core/touch/customEvents',
    'core/device/deviceInfo',
    'modernizer',
    'lib-third-party/FastButton2',
    'core/ui/hideAddressBar',
    'core/modernizrTests/tests',
    'core/ui/transitionPage',
    'core/ui/requestAnimationFrame',
    'core/ui/disableOrientationChange',
    'core/util/cookieMonster',
    'core/ui/scroll',
    'core/ui/orientation'
], function(log, Backbone, eachWithIndexPlugin, eachPropertyPlugin, View, Controller,
            customEvents, deviceInfo, modernizer, fastButton2, hideAddressBar, modernizrTests,
            transitionPage, requestAnimationFrame, disableOrientationChange, cookieMonster, scroll, orientation){
    log('core module loaded');

    var core = {

        init:function(){
            this.initPlugins();
            customEvents.init();

            log('device os: {0}  version: {1}', deviceInfo.os.name, deviceInfo.os.version);
            deviceInfo.addBrowserInfoCssClassToHtml();

            //every click on the page will be a fast click!
            if(deviceInfo.os == 'ios'){
                fastButton2.init('body');
            }


            scroll.init();

            orientation.init();
            //hideAddressBar();
        },
        initPlugins : function(){
            log('core.initPlugins called');
            eachWithIndexPlugin.init();
            eachPropertyPlugin.init();
        },
        mvc : {
            View : View,
            Model : Backbone.Model,
            Controller : Controller
        },
        ui : {
            transitionPage : transitionPage,
            requestAnimationFrame : requestAnimationFrame.requestAnimationFrame,
            cancelAnimationFrame : requestAnimationFrame.cancelAnimationFrame,
            hideAddressBar: hideAddressBar,
            disableOrientationChange: disableOrientationChange,
            scroll: scroll,
            orientation: orientation
        },
        log : log,
        deviceInfo : deviceInfo,
        cookieMonster: cookieMonster
    };


    return core;
});