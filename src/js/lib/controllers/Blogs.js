define([
    'core/core',
    'lib/views/Blog',
    'jquery'
], function(core, BlogView, $){
    core.log('Blogs controller module loaded');

    var Controller = core.mvc.Controller.extend({
        initialize:function(){
            core.log('Blogs Controller constructor called.');
            //this.blogView = new BlogView();
        },
        action:function(routeName, pageName){
            core.log('Blogs Controller action called with routeName:{0} pageName:{1}', routeName, pageName);

            this.blogView = new BlogView();
            this.blogView.render();

            core.ui.transitionPage(this.blogView);
        }
    });

    return new Controller();//singleton
});
