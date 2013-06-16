define([
    'core/core',
    'compiled-templates/chordical/instrumentEdit'
], function (core, soundsTemplate) {
    core.log('Sounds View module loaded');

    var View = core.mvc.View.extend({
        id:'SoundsPage', // each view needs a unique id for transitions.
        template:soundsTemplate,
        bindViewToModel: true,
        //initialize:function(){core.mvc.View.prototype.initialize.apply(this, arguments);},
        events:{
//            "change input":function (e) {
//
//            }
        },
        modelEvents:{
            'change:selectedSound':function(){
                core.log('Sound View selectedSound changed');
            },
            'subPropertyChange:selectedSound.selectedSubType':function(newVal){
                core.log('Sound View selectedSound subproperty changed to: ' + newVal);
            }
        }
    });

    return View;
});