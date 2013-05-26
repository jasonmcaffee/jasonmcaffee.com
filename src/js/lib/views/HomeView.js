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

            //update which link is highlighted when scrolling
            core.ui.scroll.on(this.handleScroll.bind(this));

        },
        events:{
            //some links just scroll up and down the page.
            'click a[scrollTo]':function(e){
                e.preventDefault();

                var $this = $(e.target);

                //first mark selected
                this.updateSelectedNavLink($this);


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
        },
        handleScroll:function(scrollPosition, amountScrolled){
            //core.log('scrollPosition: ' + scrollPosition + ' amountScrolled: ' + amountScrolled);
            this.$scrollToAnchors = this.$scrollToAnchors || $('a[scrollTo]');
            for(var i =0; i<this.$scrollToAnchors.length; ++i){
                var scrollToAnchor = this.$scrollToAnchors[i];
                var scrollToSelector = $(scrollToAnchor).attr('scrollTo');
                var $scrollTo = $(scrollToSelector);
                var positionOfScrollTo = $scrollTo.offset().top - 10;
                var heightOfScrollTo = $scrollTo.outerHeight();

                if(  scrollPosition > positionOfScrollTo &&
                    scrollPosition < (positionOfScrollTo + heightOfScrollTo)  ){
                    //core.log('scrolling inside of ' + scrollToSelector + ' height: ' + heightOfScrollTo);
                    this.updateSelectedNavLink($(scrollToAnchor));
                    break;
                }
            }
        },
        updateSelectedNavLink:function($selectedAnchor){
            this.$scrollToAnchors = this.$scrollToAnchors || $('a[scrollTo]');
            this.$scrollToAnchors.removeClass('selected');
            $selectedAnchor.addClass('selected');
        }
    });

    return HomeView;
});