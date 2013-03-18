define([
    'jquery'
], function($){

//http://forum.jquery.com/topic/how-to-remove-the-300ms-delay-when-clicking-on-a-link-in-jquery-mobile
//======================================================== FASTCLICK
    function FastButton(element, handler) {
        this.element = element;
        this.handler = handler;
        element.addEventListener('touchstart', this, false);
    }
    FastButton.prototype.handleEvent = function(event) {

        switch (event.type) {
            case 'touchstart': this.onTouchStart(event); break;
            case 'touchmove': this.onTouchMove(event); break;
            case 'touchend': this.onClick(event); break;
            case 'click': this.onClick(event); break;
        }
    };
    FastButton.prototype.onTouchStart = function(event) {

        event.stopPropagation();
        this.element.addEventListener('touchend', this, false);
        document.body.addEventListener('touchmove', this, false);
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
        isMoving = false;
    };
    FastButton.prototype.onTouchMove = function(event) {
        if(Math.abs(event.touches[0].clientX - this.startX) > 10 || Math.abs(event.touches[0].clientY - this.startY) > 10) {
            this.reset();
        }
    };
    FastButton.prototype.onClick = function(event) {
        this.reset();
        this.handler(event);
        if(event.type == 'touchend') {
            //alert('ghost click');
            preventGhostClick(this.startX, this.startY);
        }
    };
    FastButton.prototype.reset = function() {
        this.element.removeEventListener('touchend', this, false);
        document.body.removeEventListener('touchmove', this, false);
    };
    function preventGhostClick(x, y) {
        coordinates.push(x, y);
        window.setTimeout(gpop, 2500);
    }
    function gpop() {
        coordinates.splice(0, 2);
    }
    function gonClick(event) {
        for(var i = 0; i < coordinates.length; i += 2) {
            var x = coordinates[i];
            var y = coordinates[i + 1];
            if(Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }
    document.addEventListener('click', gonClick, true);
    var coordinates = [];

//    function initFastButtons() {
//        new FastButton(document.getElementById("header"), goSomewhere);
//    }

    function goSomewhere() {
        console.log('goSomewhere emitting click');
        var theTarget = document.elementFromPoint(this.startX, this.startY);
        if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;

        //this randomly doesn't work when showing hiding elements. using trigger instead.
        //        var theEvent = document.createEvent('MouseEvents');
        //        theEvent.initEvent('click', true, true);
        //        theTarget.dispatchEvent(theEvent);

        //anchor hrefs dont get navigated to with just $theTarget.trigger('click');
        //http://stackoverflow.com/questions/9904170/trigger-a-click-on-a-anchor-link
        if(theTarget.nodeType == 1 && theTarget.nodeName == "A"){
            console.log('triggering click for anchor tag');
            $(theTarget).get(0).click();
        }else{
            $(theTarget).trigger('click');
        }
    }


//========================================================

    var fb ={
        FastButton : FastButton, //probably won't need direct access, but provide it just in case
        /**
         * Turns all touch events into fast click events
         * @param selector - e.g. body or html
         */
        init : function(selector){
            $(function(){
                console.log('initializing fastbutton2');
                new FastButton($('body')[0], goSomewhere);
            });
        }
    };
   return fb;
});