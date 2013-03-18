define([
    'backbone',
    'core/util/log'
], function(Backbone, log){
    var View = Backbone.View.extend({
        template: null, //you should define a template function
        render : function(){
            log('Core View render called.');

            this.$el.html(this.template(this.model && this.model.toJSON()));

            _.each(this.options.widgets, function(widgetMap){
                this.$el.find(widgetMap.selector).append(widgetMap.widget.render().el);  //can't use el.innerHTML cause you'll lose events.
            }, this);

            return this;
        }
    });

    return View;
});