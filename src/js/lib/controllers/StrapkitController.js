define([
    'core/core',
    'lib/views/HomeView',
    'jquery'
], function(core, HomeView, $){
    core.log('StrapkitController module loaded');

    var StrapkitController = core.mvc.Controller.extend({
        initialize:function(){
            core.log('StrapkitController constructor called.');
            this.homeView = new HomeView();
        },
        action:function(params){
            core.log('StrapkitController.showHomePage');
            this.homeView.render();
        }
    });

    return StrapkitController;
});