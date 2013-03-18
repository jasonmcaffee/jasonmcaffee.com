define([
    'core/util/log',
    'backbone'
], function(log, backbone){

    log('core.mvc.controller module loaded.');
    //query string param constant for back button pressed indicator.
    var backButtonPressedParam = "bb";


    /**
     * Base controller which all controllers should extend.
     * Requires that an action function which accepts a params param be present.
     * e.g. core.mvc.controller.extend({action:function(params){doStuff()});
     */
    function Controller(){
        log('core.mvc.controller constructor called');
        this.initialize.apply(this, arguments);
        this.refreshIndicator = 0;
    }

    //attach inheritable functions to the prototype
    _.extend(Controller.prototype, {
        initialize:function(){
            log('base controller initialize called');
        },

        /**
         * filter for calls to action on the controller.
         * allows us to intercept and perform common actions, including:
         * 1) rewriting the url so that a bb query string param is present, so when browser back button is pressed, the
         *    query string param will be present, and we will know back or forward has been pressed.
         * 2) keeping track of a refreshIndicator, so we can determine if refresh has occurred.
         * @param params - query string params
         */
        _action:function(params){
            var args = arguments; //todo: concat query string params
            log('base controller _action called.');
            //log('request is ' + this.request);
            if(params && params[backButtonPressedParam]){
                //if the refreshIndicator is greater than 0, we know that action has been called at least once.
                //if not, the bb query param's presence let's us know refresh occurred.
                if(this.refreshIndicator > 0){
                    log('the user has clicked the browser forward or back button.');
                    this._backButtonAction.call(this, args);
                }else{
                    log('backbutton query param was present, but refresh indicator was incorrect. refresh occurred.');
                    this.refreshIndicator = 1;
                    this._refreshAction.call(this, args);
                }

            }else{
                //todo:implement this
                //this.rewriteUrlForBackButtonDetection();

                //the controller action is executing for the first time. set the refreshIndicator to 1 so that if the
                //backbutton is pressed, the bb
                this.refreshIndicator = 1;
                this.action.apply(this, args);
            }

        },
        /**
         * backButtonAction will occur when the bb query string param is present.
         * only this controller should be aware of the param (it should never be present in an href or in a core.navigate call)
         * @param params - same as action params
         */
        _backButtonAction:function(params){
            log('base controller _backButtonAction called.');
            if(this.backButtonAction){
                this.backButtonAction.apply(this, arguments);
            }else{
                log('back or forward button pressed occurred, but no backButtonAction defined on the controller. calling action instead');
                this.action.apply(this, arguments);
            }
        },
        /**
         * refreshAction will execute under two conditions:
         * 1) user visits a page, and then refreshes.
         * 2) user visits a page, copies the url, opens a new tab (or window) and pastes the url.
         *
         * typically we will treat refresh actions the same as if normal action occurs.
         * @param params - same as action params
         */
        _refreshAction:function(params){
            log('base controller _refreshAction called.');
            if(this.refreshAction){
                this.refreshAction.apply(this.arguments);
            }else{
                log('refresh occurred but no refreshAction defined on the controller. calling action instead');
                this.action.apply(this, arguments);
            }
        }//,
        //adds a query string param that will only be used for this controller.
        //when the param is present when the controller action is executed, it means that the user has either clicked
        //the back or forward browser button
//        rewriteUrlForBackButtonDetection:function(){
//            log('base controller rewriteUrlForBackButtonDetection called.');
//            //break out the query string so we can check if bb is already present.
//            var uri = core.helpers.parseUri(this.request);
//
//            //look at the current query string, see if bb is already present, and if there already are query string
//            //params.  append the bb=1 to the query string.
//            var modifiedRequest= this.request;
//            if(uri.query ===""){
//                modifiedRequest = this.request + "?" + backButtonPressedParam + "=1";
//            }else if(uri.query.indexOf(backButtonPressedParam) < 0){
//                modifiedRequest = this.request + "&" + backButtonPressedParam + "=1";
//            }
//            //update the url so that a param is sent if the user clicks back button.
//            //the silent option is needed on the first try.
//            core.navigate(modifiedRequest, {trigger:false, replace:true, silent:true});
//        }
    });

    Controller.extend = backbone.Model.extend;//use backbone's inheritance model.

    return Controller;
});