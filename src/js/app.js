define([
    'core/core',
    'jquery',
    'backbone',
    //all controllers need to be listed here for requirejs build purposes (if not listed, won't get included in the final build)
    'lib/controllers/DemosController',
    'lib/controllers/StrapkitController',
    'lib/controllers/Resume',
    'lib/widgets/NavigationBar'
], function(core, $, Backbone, DemosController, StrapkitController, resumeController, NavigationBar){

    function App(){
        core.log('app constructor called.');

        //load plugins, etc
        core.init();

        var self = this;
        //make everything easier to manage by waiting until dom ready to create controllers
        $(function(){
            core.log('app : document ready. creating controllers and establishing routes.');
            //create controllers
            self.demosController = new DemosController();
            self.strapkitController = new StrapkitController();

            //setup routes
            self.setupRoutes();

            //create global widgets
            //self.navigationBar = new NavigationBar();

            //if there is no relative route, send them to the home page.
            core.log('current route is : ' + Backbone.history.fragment);
            if(Backbone.history.fragment == ""){
                //load the home page
                self.router.navigate('Resume', {trigger:true});
            }
        });



    }


    /**
     *
     */
    App.prototype.setupRoutes = function(){
        core.log('App.setupRoutes called.');
        var self = this;
        var AppRouter = Backbone.Router.extend({
            routes: {
//                "demos/buttonsDemo" : "buttonsDemo",
//                "demos/responsiveDemo" : "responsiveDemo",
//                "demos/responsiveFlexBoxDemo" : "responsiveFlexBoxDemo",
//                "home" : "home",
                "*notFound" : "allRoutes",
                "*notFound/:page" : "allRoutes" //eg #resume/tacos or #resume <--todo:stopped working after notFound added
            },
            initialize:function(){
                //this.bind("all", this.allRoutes); <-- doesn't fire when non-configured route is accessed (e.g. #balkdjflaksdjf doesn't fire this, and we need it to)
            },
            /**
             * Load the controller module, using convention:
             * 'http://example.com/#controllerName'
             * where '#controllerName' maps to require 'lib/controllers/controllerName'
             * The required controller is expected to be an object with an _action function.
             *
             * @param routeName
             */
            allRoutes:function(routeName){
                core.log('allRoutes called for routeName: ' + routeName);
                if(!routeName){return;}//nothing to do. can happen if user doesn't use 'http://host/#something'. #something is the routeName.

                //casing doesn't matter
               // routeName = routeName.toLowerCase();
                routeName = routeName.substring(0, 1).toUpperCase() + routeName.substring(1);
                var requirePathForRouteController = 'lib/controllers/' + routeName;
                var args = arguments;


                require([requirePathForRouteController], function(routeController){
                    core.log('route controller successfully retrieved.');
                    routeController._action.apply(routeController, args);
                });
            },
            home: function(){
              core.log('router: home called');
                self.strapkitController._action();
            },
            buttonsDemo : function(){
                core.log('router: buttonsDemo called.');
                self.demosController.showButtonsDemoPage();
            },
            responsiveDemo : function(){
                core.log('router: responsiveDemo called.');
                self.demosController.showResponsiveDemoPage();
            },
            responsiveFlexBoxDemo : function(){
                core.log('router: responsiveFlexBoxDemo called.');
                self.demosController.showResponsiveFlexBoxDemoPage();
            },
            demosHome : function(){
                core.log('router: demosHome called.');
                self.demosController.showDemosHomePage();
            }
        });

        this.router = new AppRouter();
        Backbone.history.start();
    };

    $(function(){
       core.log('document ready.');
    });

    return new App();
});