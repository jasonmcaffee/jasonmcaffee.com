define([
    'core/util/log',
    'backbone',
    'jquery',
    'compiled-templates/homePageTemplate'
], function(log, Backbone, $, homePageTemplateFunction){

    var HomeView = Backbone.View.extend({
        el:'#pages',
        initialize : function(){
            log('HomeView.initialize called.' + this.el);

        },
        render: function(){ //don't call until the dom is ready
            log('HomeView.render called.');

            log('HomeView.render executing now that dom is ready...' );

            this.$el.html(homePageTemplateFunction());
        }
    });

    return HomeView;
});