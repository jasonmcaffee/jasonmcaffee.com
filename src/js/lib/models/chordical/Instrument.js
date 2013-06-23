define([
    'core/core',
    'lib/models/chordical/SoundNode'
], function (core, SoundNodeModel) {
    core.log('Instrument Model module loaded.');

    /**
     * Used for the sound page of chordical. lets users pick different instruments(sounds), and stores selected preferences.
     * @type {*}
     */
    var InstrumentModel = core.mvc.Model.extend({
        initialize:function (attributes, options) {
            core.log('Sound Model initialize called');
            this.attributes.selectedSound = this.attributes.soundOptions['oscillator'];
            this.attributes.selectedSound.selectedSubType = this.attributes.selectedSound.subTypes[0];


        },
        defaults:{
            //sounds to choose from for instrument
            soundOptions:{
                'oscillator': {
                    type:'oscillator', //can't access property name in certain situations, so we need this redundant property. may be temporary.
                    subTypes:[
                        'SAWTOOTH', 'SINE', 'SQUARE', 'TRIANGLE'
                    ],
                    selectedSubType:0
                }
            },
            selectedSound:0,
            //gain, pan, etc array of nodes that the sound will pass through before reaching speakers.
            soundNodes:[
                //create a default gain SoundNode
                new SoundNodeModel({
                    type:'gain',
                    value1:1,
                    uiId:0 //so the ui can have unique ids (soundNode0)
                })
            ],
            soundNodeOptions:[
                'gain'
            ]
        },
        /**
         * plays a note through the instrument.
         * @param playableNote
         */
        playNote:function(playableNote){
            playableNote.play();
        },
        stopNote:function(playableNote){
            playableNote.stop();
        }
    });

    return InstrumentModel;
});