define([
    'core/core',
    'compiled-templates/widgets/chordical/keyboard'
], function (core, keyboardTemplate) {
    core.log('Keyboard View module loaded');

    var View = core.mvc.View.extend({
        id:'keyboard', // each view needs a unique id for transitions.
        template:keyboardTemplate//,
        //initialize:function(){core.mvc.View.prototype.initialize.apply(this, arguments);},
//        events:{
//            "":function(e){
//
//            }
//        }
    });

    return View;
});