define([
    'core/core',
    'compiled-templates/chordical/instrumentEdit',
    'lib/widgets/chordical/SoundNode',
    'lib/models/chordical/SoundNode'
], function (core, instrumentEditTemplate, SoundNodeWidget, SoundNodeModel) {
    core.log('Instrument View module loaded');

    //NOTE: wonky - if you reset the model, make sure to call listenForChangesToSoundNodeModels
    var View = core.mvc.View.extend({
        id:'InstrumentPage', // each view needs a unique id for transitions.
        template:instrumentEditTemplate,
        bindViewToModel: true,
        initialize:function(){
            core.mvc.View.prototype.initialize.apply(this, arguments);
            this.listenForChangesToSoundNodeModels();
            this.createSoundNodeWidgetsUsingModel();
        },
        //cleanup model bindings for each soundNode in array
        remove:function(){
            var soundNodes = this.model.get('soundNodes');
            for(var x=0; x < soundNodes.length; ++x){
                var soundNodeModel = soundNodes[x];
                soundNodeModel.off('change:selectedNodeType', this.handleSoundNodeModelSelectedNodeTypeChange, this);
            }
            core.mvc.View.prototype.remove.apply(this, arguments);
        },
        //since i didn't use a collection, i need to explicitly listen for changes to items in soundNodes
        listenForChangesToSoundNodeModels:function(){
            var soundNodes = this.model.get('soundNodes');
            for(var x=0; x < soundNodes.length; ++x){
                var soundNodeModel = soundNodes[x];
                this.listenForChangesToSoundNodeModel(soundNodeModel);
            }
        },
        listenForChangesToSoundNodeModel:function(soundNodeModel){
            //when the selectedNodeType is changed, we have to reconnect all destinations so they point to the right node (panner, gain, etc).
            soundNodeModel.on('change:selectedNodeType', this.handleSoundNodeModelSelectedNodeTypeChange, this);
        },
        handleSoundNodeModelSelectedNodeTypeChange:function(){
            //note:this must happen after the SoundNode's change:selectedNodeType handler has been called so that webAudio is the right node (gain, panner,etc)
            this.model.setDestinationsForSoundNodes();
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
                    model:soundNodeModel
                })
            });
        },
        events:{

            /**
             * when addNode is clicked, a SoundNode model and widget is created, and the soundNodesContainer is regenerated.
             * @param e
             */
            "click #addNodeButton":function (e) {
                core.log('Instrument add node button clicked');
                e.preventDefault();
                var soundNodeModel = new SoundNodeModel({
                    type:'gain',
                    value1:22,
                    uiId:this.model.get('soundNodes').length
                });

                this.listenForChangesToSoundNodeModel(soundNodeModel);
                //http://stackoverflow.com/questions/7325004/backbone-js-set-model-array-property
                this.model.get('soundNodes').push(soundNodeModel);
                this.model.trigger('change');
                this.model.trigger('change:soundNodes');

                this.createSoundNodeWidgetAndAddToWidgets(soundNodeModel);
                this.reRenderWidgetsWithSelector('#soundNodesContainer');
            },
            'click #logSoundNodesNativeConnection':function(e){
                e.preventDefault();
                var soundNodes = this.model.get('soundNodes');
                for(var x=0; x < soundNodes.length; ++x){
                    var soundNodeModel = soundNodes[x];
                    core.log('soundNode type:{0} is connected to: {1}', soundNodeModel.get('selectedNodeType'), soundNodeModel.get('destination'));
                }
            }
        },
        modelEvents:{
            'change:selectedSound':function(){
                core.log('Instrument View selectedSound changed');
            },
            'subPropertyChange:selectedSound.selectedSubType':function(newVal){
                core.log('Instrument View selectedSound subproperty changed to: ' + newVal);
            },
            'change:soundNodes':function(){
                core.log('Instrument View sound nodes changed');
                this.model.setDestinationsForSoundNodes();
            }
        }
    });

    return View;
});