define([
    'core/core'
], function (core) {
    core.log('Sound Model module loaded.');

    /**
     * Used for the sound page of chordical. lets users pick different instruments(sounds), and stores selected preferences.
     * @type {*}
     */
    var SoundModel = core.mvc.Model.extend({
        initialize:function (attributes, options) {
            core.log('Sound Model initialize called');
            this.attributes.selectedSound = this.attributes.soundOptions['oscillator'];
            this.attributes.selectedSound.selectedSubType = this.attributes.selectedSound.subTypes[0];
        },
        defaults:{
            //sounds to choose from for instrument
            soundOptions:{
                'oscillator': {
                    type:'oscillator', //can't access property name in certain situations. may be temporary.
                    subTypes:[
                        'SAWTOOTH', 'SINE', 'SQUARE', 'TRIANGLE'
                    ],
                    selectedSubType:0
                }
            },
            selectedSound:0

        }
    });

    return SoundModel;
});