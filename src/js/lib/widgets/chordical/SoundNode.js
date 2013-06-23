define([
    'core/core',
    'compiled-templates/widgets/chordical/soundNode'
], function (core, soundNodeTemplate) {
    core.log('SoundNode View module loaded');

    /**
     * UI for sound nodes, which allow you to chain destinations (effects) together.
     *
     * @type {*}
     */
    var View = core.mvc.View.extend({
        id:'', // each view needs a unique id for transitions.
        template:soundNodeTemplate,
        isWidget:true,
        bindViewToModel:true,
        //initialize:function(){core.mvc.View.prototype.initialize.apply(this, arguments);},
        events:{
            "click":function (e) {
                core.log('click for SoundNode occurred');
            }
        },
        modelEvents:{
            'change:selectedNodeType':function(){
                core.log('refreshing html so the selectedNodeType options are displayed');
                this.render();
            }
        }
    });

    return View;
});