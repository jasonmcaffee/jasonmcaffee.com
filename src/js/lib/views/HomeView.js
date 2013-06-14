define([
    'core/core',
    'backbone',
    'jquery',
    'compiled-templates/homePageTemplate',
    'swipe'
], function(core, Backbone, $, homePageTemplateFunction, Swipe){

    var HomeView = core.mvc.View.extend({
        id:'home',
        template:homePageTemplateFunction,
        updateLinksDuringScroll: true, //need to turn this off when animating scrollTo
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

                var amountScrolled = 0;
                var amountToScroll = Math.abs(window.scrollY - scrollPosition);
                var scrollStep = window.scrollY < scrollPosition ? 70 : -70;
                var nextScroll =  window.scrollY + scrollStep;

                core.ui.requestAnimationFrame(function animate(){
                    this.updateLinksDuringScroll = false;
                    nextScroll =  window.scrollY + scrollStep;
                    var done = false;
                    if(amountScrolled  >= amountToScroll){
                        nextScroll = scrollPosition;
                        done=true;
                    }
                    amountScrolled += Math.abs(scrollStep);

                    //core.log('scrollStep : ' + scrollStep + ' scrollY: ' + window.scrollY + ' nextScroll: ' + nextScroll + ' scrollPosition: ' + scrollPosition);
                    window.scrollTo(0, nextScroll);
                    if(!done){
                        core.ui.requestAnimationFrame(animate.bind(this));
                    }else{
                        this.updateLinksDuringScroll = true;
                    }

                }.bind(this));

            }
        },
        handleScroll:function(scrollPosition, amountScrolled){
            //return false;
            if(!this.updateLinksDuringScroll){ return;}//don't do any work if the scroll is an animation
            //core.log('scrollPosition: ' + scrollPosition + ' amountScrolled: ' + amountScrolled);
            this.$scrollToAnchors = this.$scrollToAnchors || $('a[scrollTo]');
            for(var i =0; i<this.$scrollToAnchors.length; ++i){
                var scrollToAnchor = this.$scrollToAnchors[i];
                var scrollToSelector = $(scrollToAnchor).attr('scrollTo');
                var $scrollTo = $(scrollToSelector);
                if(!$scrollTo || !$scrollTo.offset()){return;}
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
        },
        postRender:function(){
//           this.$el.find('.swipe').Swipe({
//               startSlide: 2,
//               speed: 400,
//               auto: 3000,
//               continuous: true,
//               disableScroll: false,
//               stopPropagation: false,
//               callback: function(index, elem) {},
//               transitionEnd: function(index, elem) {}
//           });
        }
    });

    return HomeView;
});