define([
    'core/core'
], function (core) {
    core.log('SoundNode Model module loaded.');

    var SoundNodeModel = core.mvc.Model.extend({
        initialize:function (attributes, options) {
            core.log('SoundNode Model initialize called');
        },
        defaults:{
            typeOptions : ['filter', 'gain']
        }
    });

    return SoundNodeModel;
});