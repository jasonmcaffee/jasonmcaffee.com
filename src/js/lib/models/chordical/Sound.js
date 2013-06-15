define([
    'core/core'
], function (core) {
    core.log('Sound Model module loaded.');

    var SoundModel = core.mvc.Model.extend({
        initialize:function (attributes, options) {
            core.log('Sound Model initialize called');
            this.attributes.selectedSound = this.attributes.soundOptions['oscillator'];
            this.attributes.selectedSubType = this.attributes.selectedSound.subTypes[0];
        },
        defaults:{
            //sounds to choose from for instrument
            soundOptions:{
                'oscillator': {
                    subTypes:[
                        'SAWTOOTH', 'SINE', 'SQUARE', 'TRIANGLE'
                    ]
                }
            },
            selectedSound:0,
            selectedSubType:0
        }
    });

    return SoundModel;
});