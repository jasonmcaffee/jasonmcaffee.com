define([
    'core/util/log',
    'backbone',
    'jquery',
    'compiled-templates/demos/buttonsDemoPageTemplate'
], function(log, Backbone, $, buttonsDemoPageTemplate){

    var ButtonsDemoView = Backbone.View.extend({
        el:'#pages',
        initialize : function(){
            log('ButtonsDemoView.initialize called.');
            $(function(){

            });

        },
        render: function(){
            log('ButtonsDemoView.render called.');
            var self = this;
            $(function(){
                //render the template function to the dom
                self.$el.html(buttonsDemoPageTemplate());

                //on clicked button demos
                self.$el.on('click', '.button-type-on-click', function(event){
                    $(this).toggleClass('button-type-on-click-pressed');
                });
                self.$el.on('click', '.button-type-on-click-with-gpu', function(event){
                    $(this).toggleClass('button-type-on-click-pressed');
                });

                //fastbutton haxory.
                //document.getElementById('fastButtons').addEventListener('click', $.clickbuster.onClick, true);
//                $('.fast-button').each(function(){
//                    log('registering fast button ' + $(this).attr('class'));
//                    $.FastButton(this, function(){
//                        log('fast-button clicked!');
//                    });
//                });
            });
        }
    });

    return ButtonsDemoView;
});