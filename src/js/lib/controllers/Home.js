define([
    'core/core',
    'lib/views/HomeView',
    'jquery'
], function(core, HomeView, $){
    core.log('Home module loaded');

    var StrapkitController = core.mvc.Controller.extend({
        initialize:function(){
            core.log('Home initialize called.');

        },
        action:function(params){
            core.log('Home controller action called');
            this.homeView = new HomeView();
            this.homeView.render();
            core.ui.transitionPage(this.homeView);
        }
    });

    return new StrapkitController();
});