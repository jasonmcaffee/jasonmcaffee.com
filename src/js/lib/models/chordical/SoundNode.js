define([
    'core/core'
], function (core) {
    core.log('SoundNode Model module loaded.');

    var SoundNodeModel = core.mvc.Model.extend({
        initialize:function (attributes, options) {
            core.log('SoundNode Model initialize called');
        },
        defaults:{
            typeOptions : ['filter', 'gain'],
            selectedNodeType: 'gain',
            destination: core.audio.audioContext, //overwrite this when chaining.
            //when the node is 'gain', these properties will be set by modelbinding, and should be used when playing notes.
            gain:{
                amount:75
            }
        }
    });

    return SoundNodeModel;
});