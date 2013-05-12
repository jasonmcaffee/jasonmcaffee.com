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
        },
        render : function(){
            log('Core View render called.');

            if(this.model){
                if(this.model.toJSON){
                    this.$el.html(this.template(this.model.toJSON()));
                }else{
                    this.$el.html(this.template(this.model));
                }
            }else{
                this.$el.html(this.template());
            }

            _.each(this.options.widgets, function(widgetMap){
                this.$el.find(widgetMap.selector).append(widgetMap.widget.render().el);  //can't use el.innerHTML cause you'll lose events.
            }, this);

            return this;
        }
    });

    return View;
});