define([
    'core/core',
    'lib/views/Resume',
    'lib/models/Resume',
    'jquery'
], function(core, ResumeView, ResumeModel, $){
    core.log('Resume controller module loaded');

    var Controller = core.mvc.Controller.extend({
        initialize:function(){
            core.log('Resume Controller constructor called.');
            this.resumeView = new ResumeView({model:new ResumeModel()});
        },
        action:function(routeName, pageName){
            core.log('Resume Controller action called with routeName:{0} pageName:{1}', routeName, pageName);
            this.resumeView.render();
        }
    });

    return new Controller();//singleton
});