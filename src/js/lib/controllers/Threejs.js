define([
    'core/core',
    'lib/views/ThreejsDemoOne'
], function(core, ThreejsDemoOne){
    core.log('threejs controller module loaded');

    var Controller = core.mvc.Controller.extend({
        action:function(){
            core.log('threejs action');

            this.view = new ThreejsDemoOne({model:undefined});
            this.view.render();

            core.ui.transitionPage(this.view);
        }
    });

    return new Controller();//singleton
});