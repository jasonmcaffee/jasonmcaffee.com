define([
    'core/core',
    'backbone',
    'jquery',
    'compiled-templates/homePageTemplate'
], function(core, Backbone, $, homePageTemplateFunction){

    var HomeView = core.mvc.View.extend({
        id:'home',
        template:homePageTemplateFunction,
        initialize : function(){
            core.log('HomeView.initialize called. ');
        }
    });

    return HomeView;
});