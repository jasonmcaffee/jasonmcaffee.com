define([
    'core/core',
    'compiled-templates/chordical/instrumentEdit',
    'lib/widgets/chordical/SoundNode',
    'lib/models/chordical/SoundNode'
], function (core, instrumentEditTemplate, SoundNodeWidget, SoundNodeModel) {
    core.log('Instrument View module loaded');

    var View = core.mvc.View.extend({
        id:'InstrumentPage', // each view needs a unique id for transitions.
        template:instrumentEditTemplate,
        bindViewToModel: true,
        initialize:function(){
            core.mvc.View.prototype.initialize.apply(this, arguments);
            this.createSoundNodeWidgetsUsingModel();
        },
        createSoundNodeWidgetsUsingModel:function(){
            var soundNodes = this.model.get('soundNodes');
            for(var x=0; x < soundNodes.length; ++x){
                var soundNodeModel = soundNodes[x];
                this.createSoundNodeWidgetAndAddToWidgets(soundNodeModel);
            }
        },
        createSoundNodeWidgetAndAddToWidgets:function(soundNodeModel){
            core.log('Instrument View creating soundNode Widget for model with uiId:' + soundNodeModel.uiId);
            this.options.widgets.push({
                selector:'#soundNodesContainer', //+soundNode.uiId,
                widget:new SoundNodeWidget({
                    id:'soundNodeContainer'+soundNodeModel.get('uiId'),
                    model:soundNodeModel //share the instrument model for now.
                })
            });
        },
        events:{
            "click #addNodeButton":function (e) {
                core.log('Instrument add node button clicked');
                e.preventDefault();
                var soundNodeModel = new SoundNodeModel({
                    type:'gain',
                    value1:22,
                    uiId:this.model.get('soundNodes').length
                });

                this.model.get('soundNodes').push(soundNodeModel);
                //var soundNodeWidget = new SoundNodeWidget();
                //this.options.widgets.push({selector:'#soundNodesContainer', widget:soundNodeWidget});
                this.createSoundNodeWidgetAndAddToWidgets(soundNodeModel);
                this.reRenderWidgetsWithSelector('#soundNodesContainer');
                //this.render();
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