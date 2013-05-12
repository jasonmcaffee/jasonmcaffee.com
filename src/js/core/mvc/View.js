define([
    'backbone',
    'core/util/log'
], function(Backbone, log){
    var View = Backbone.View.extend({
        template: null, //you should define a template function
        attributes:{
            'class':'page'
        },
        initialize:function(options){
            log('core.mvc.View initialize called');
            this.options = options || {};
            this.options.widgets = this.options.widgets || [];
            this.options.templates = this.options.templates || [];
        },
        render : function(){
            log('Core View render called.');

            this.$el.html(this.template(this.getModelAsJSON()));

            _.each(this.options.widgets, function(widgetMap){
                this.$el.find(widgetMap.selector).append(widgetMap.widget.render().el);  //can't use el.innerHTML cause you'll lose events.
            }, this);

            _.each(this.options.templates, function(templateMap){
                this.$el.find(templateMap.selector).append(templateMap.template(this.getModelAsJSON()));
            }, this);

            return this;
        },
        getModelAsJSON:function(){
            if(this.model){
                if(this.model.toJSON){
                    return this.model.toJSON();
                }else{
                    return this.model;
                }
            }else{
                return null;
            }
        }
    });

    return View;
});