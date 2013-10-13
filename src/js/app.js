//needed at runtime since we download three.js only when needed.
require.config({
    shim:{
        three:{
            exports:'THREE'
        }
    }
});

define([
    'core/core',
    'jquery',
    'backbone',
    //all controllers need to be listed here for requirejs build purposes (if not listed, won't get included in the final build)
    'lib/controllers/DemosController', //todo:refactor to new approach
    'lib/controllers/Home',
    'lib/controllers/Resume',
    'lib/controllers/Blogs',
    'lib/controllers/Threejs',
    'lib/widgets/NavigationBar', //todo:refactor to new approach
    'lib/controllers/Images',
    'lib/controllers/Webcam',
    'lib/controllers/Chordical'
], function(core, $, Backbone, DemosController, homeController, resumeController, blogsController, NavigationBar){

    function App(){
        core.log('app constructor called.');

        //load plugins, etc
        core.init();

        var self = this;
        //make everything easier to manage by waiting until dom ready to create controllers
        $(function(){
            core.log('app : document ready. creating controllers and establishing routes.');
            //setup routes
            self.setupRoutes();

            core.ui.hideAddressBar();
            //create global widgets
            //self.navigationBar = new NavigationBar();

            //if there is no relative route, send them to the home page.
            core.log('current route is : ' + Backbone.history.fragment);
            if(Backbone.history.fragment == ""){
                var hashPathToNavigateTo = 'Home';//default is jasonmcaffee.com home
                //since a few urls can point here, go to the appropriate 'index' for the given host.
                if(window.location.host && window.location.host.indexOf('chordical.com') > 0){
                    hashPathToNavigateTo = 'chordical';
                }
                //load the appropriate 'index' page
                self.router.navigate(hashPathToNavigateTo, {trigger:true});
            }
        });



    }


    /**
     *
     */
    App.prototype.setupRoutes = function(){
        core.log('App.setupRoutes called. 1');
        var self = this;
        var AppRouter = Backbone.Router.extend({
            routes: {
                ":controller/:action":"allRoutes",
                "*notFound" : "allRoutes"
//                "*notFound/:page" : "allRoutes" //eg #resume/tacos or #resume <--todo:stopped working after notFound added
            },
            _extractParameters: function(route, fragment) {
                var result = route.exec(fragment).slice(1);
                return result;
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
            }
        });

        this.router = new AppRouter();
        Backbone.history.start();
    };

    return new App();
});