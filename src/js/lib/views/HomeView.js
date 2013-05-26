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
        },
        events:{
            //some links just scroll up and down the page.
            'click a[scrollTo]':function(e){
                e.preventDefault();
                var $this = $(e.target);
                var selectorToScrollTo = $this.attr('scrollTo');
                var scrollPosition =$(selectorToScrollTo).offset().top;
                core.log('scrolling to : ' + selectorToScrollTo + ' top: ' + scrollPosition);

//                $('html, body').animate({
//                    scrollTop: $(selectorToScrollTo).offset().top
//                }, 200);

                window.scrollTo(0, scrollPosition);
//                $('body').css({
//
//                });
            }
        }
    });

    return HomeView;
});