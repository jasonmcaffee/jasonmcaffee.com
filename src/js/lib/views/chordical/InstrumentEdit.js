define([
    'core/core',
    'compiled-templates/chordical/instrumentEdit',
    'lib/widgets/chordical/SoundNode'
], function (core, instrumentEditTemplate, SoundNodeWidget) {
    core.log('Instrument View module loaded');

    var View = core.mvc.View.extend({
        id:'InstrumentPage', // each view needs a unique id for transitions.
        template:instrumentEditTemplate,
        bindViewToModel: true,
        initialize:function(){
            core.mvc.View.prototype.initialize.apply(this, arguments);
            for(var soundNode in this.model.get('soundNodes')){
                core.log('Instrument View creating soundNode Widget');
                this.options.widgets.push({
                    selector:'soundNodeContainer'+soundNode.uiId,
                    widget:new SoundNodeWidget()
                });
            }
        },
        events:{
            "click #addNodeButton":function (e) {
                core.log('Instrument add node button clicked');
                e.preventDefault();
                var soundNodeWidget = new SoundNodeWidget();
                this.options.widgets.push({selector:'#soundNodesContainer', widget:soundNodeWidget});
                this.render();
            }
        },
        modelEvents:{
            'change:selectedSound':function(){
                core.log('Instrument View selectedSound changed');
            },
            'subPropertyChange:selectedSound.selectedSubType':function(newVal){
                core.log('Instrument View selectedSound subproperty changed to: ' + newVal);
            }
        }
    });

    return View;
});