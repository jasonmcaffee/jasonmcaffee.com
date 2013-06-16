define([
    'core/util/log',
    'core/device/DeviceInfo',
    'jquery',
    'core/ui/hideAddressBar'
], function(log, deviceInfo, $, hideAddressBar){
    log('core/ui/transitionPage module loaded.');

    var config ={
        pageContainerId : '#pages',
        movePageLeftClass : 'move-page-off-screen-left',
        positionPageToRightOfScreenClass : 'add-page-to-screen',
        slideInClass: 'slide-in',
        slideOutClass: 'slide-out'
    };

    //pages will be added/removed to this container.
    //transitions will occur within the container.
    var $pageContainer;

    var currentView;

    function transitionView(viewToTransitionTo){
        log('transitionView called for view with id:{0}', viewToTransitionTo.id);

        //hideAddressBar();

        //wait for dom ready
        $(function(){

            $pageContainer = $pageContainer || $(config.pageContainerId);


            //first time don't do anything special. widths are wrong at this point anyways. (no scrollbar)
            if(!currentView){
                currentView = viewToTransitionTo;
                $pageContainer.append(currentView.$el);
                return;
            }


            var screenWidth = deviceInfo.screen.calculateWidth();
            log('screen width is : {0}', screenWidth);

            //hide vertical scroll bar
            $('body').css({
                'overflow-x':'hidden'
            });

//            currentView.$el.css({
//                'overflow':'hidden'
//            });
            //position the view to the right of the screen
//            viewToTransitionTo.$el.css({'left':screenWidth + 'px'});

            log('sliding out id: {0}', currentView.id);
            currentView.$el.addClass(config.slideOutClass)
                .css({'width':screenWidth+'px'}); //on iphone this screen grows to 200% wide.

            //disable webkit-overflow-scroll: touch, as the page isn't fully painted.
            //$('html').addClass('page-transitioning'); <-- doesn't work

            //add the page to the page container
            log('attaching $el to pageContainer');
            viewToTransitionTo.$el.addClass(config.slideInClass) //so it doesn't get painted wrong when attached.
                .css({width:screenWidth + 'px'
                //    , position:'relative' <-- messes up on iphone. els are stacked on top
                }); //fix iphone sizing? <-- makes scrollbar (horizontal) cover part of the page. hardly noticable.




            $pageContainer.append(viewToTransitionTo.$el);

            //if selectivizr is present, run it so the page doesn't look like crap in ie 8
            if(window.selectivizr){
                log('running selectivizr');
                window.selectivizr.init();
            }
//            viewToTransitionTo.$el.css({
//                'overflow':'hidden'
//            });



            //var currentViewWidth = currentView.$el.width(); //calculate just in case there's a scrollbar present.

//                .css({
//                    'width' : currentViewWidth + 'px'
//                });

            //since the view can use % widths, set it's width to be the screen width so it doesn't readjust while transitioning.
//            viewToTransitionTo.$el.css({
//                'width': screenWidth
//            });
            //add css class for sliding in the view


            //wait until the animation is done, then remove the old view (currentView)
            setTimeout(function(){
                log('transition is complete.');
                if(currentView){
                    log('removing old view from page container');
                    currentView.remove();
                    currentView.undelegateEvents();//make sure no event listeners for model and dom
                    //since removing the view doesn't mean that the $el properties are gone, remove the slideout class.
                    //currentView.$el.removeClass(config.slideOutClass) ;
                        //.css({'width':''}); //reset as styles are retained.
                }

//                $pageContainer.css({
//                    'width':''
//                });

                log('removing slidein class from view id: {0}', viewToTransitionTo.id);
                //remove the slide-in class, as it has position:absolute which messes up pageContainer's size.
                viewToTransitionTo.$el.removeClass(config.slideInClass)  //this causes a repaint, but fixes iphone bug where whole screen isn't painted.
                    .css({width:''});

                //enable webkit-overflow-scroll: touch
                //$('html').removeClass('page-transitioning');  <-- doesn't work

                //$('html').addClass('fix-iphone-scroll');   no worky

                //$('body').css({'overflow-x':''}); //this leads to a vertical scrollbar appearing.

                //the view has been transitioned to and is now the currentView.
                currentView = viewToTransitionTo;
            }, 300);


        });
    }


    function transitionViewOLD(viewToTransitionTo){
        log('transitionView called for view with id:{0}', viewToTransitionTo.id);

        //wait for dom ready
        $(function(){

            $pageContainer = $pageContainer || $(config.pageContainerId);

            //first time don't do anything special. widths are wrong at this point anyways. (no scrollbar)
            if(!currentView){
                currentView = viewToTransitionTo;
                $pageContainer.append(currentView.$el);
                return;
            }


            var width = deviceInfo.screen.calculateWidth() + 'px';
            log('screen width is : {0}', width);

            //set the width of the page container so it's not 100%
            $pageContainer.css({
                'width': width
            });


            var viewsWidth = viewToTransitionTo.$el.width();
            log('viewsWidth is ' + viewsWidth);

            //since the view can use % widths, set it's width to be the screen width so it doesn't readjust while transitioning.
            viewToTransitionTo.$el.css({
                'width': width
            });
            //add css class for sliding in the view
            viewToTransitionTo.$el.addClass(config.slideInClass);

            //add the page to the page container
            log('attaching $el to pageContainer');
            $pageContainer.append(viewToTransitionTo.$el);

            //if there's a page already displayed, transition it off the screen.
            if(currentView){
                log('sliding out id: {0}', currentView.id);
                currentView.$el.addClass(config.slideOutClass)
                    .css({
                        'width' : width
                    });

            }

            //wait until the animation is done, then remove the old view (currentView)
            setTimeout(function(){
                log('transition is complete.');
                if(currentView){
                    log('removing old view from page container');
                    currentView.remove();
                    //since removing the view doesn't mean that the $el properties are gone, remove the slideout class.
                    currentView.$el.removeClass(config.slideOutClass)
                        .css({'width':''}); //reset as styles are retained.
                }

                $pageContainer.css({
                    'width':''
                });

                log('removing slidein class from view id: {0}', viewToTransitionTo.id);

                //reset the previously set width
                viewToTransitionTo.$el.css({
                    'width':''
                });
                //remove the slide-in class, as it has position:absolute which messes up pageContainer's size.
                viewToTransitionTo.$el.removeClass(config.slideInClass);


                //the view has been transitioned to and is now the currentView.
                currentView = viewToTransitionTo;
            }, 1500);


        });
    }

    return transitionView;
});