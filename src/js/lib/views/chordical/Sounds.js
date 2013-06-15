define([
    'core/core',
    'compiled-templates/chordical/soundsPage'
], function (core, soundsTemplate) {
    core.log('Sounds View module loaded');

    var View = core.mvc.View.extend({
        id:'SoundsPage', // each view needs a unique id for transitions.
        template:soundsTemplate,
        //initialize:function(){core.mvc.View.prototype.initialize.apply(this, arguments);},
        events:{
            "change input":function (e) {

            }
        }
    });

    return View;
});