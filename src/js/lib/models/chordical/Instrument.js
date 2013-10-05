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
            this.setDestinationsForSoundNodes();

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
                    selectedNodeType:'gain',
                    gain:{
                        amount:.9
                    },
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
            this.setDestinationsForNote(playableNote);  //we have to do this for every play/
            playableNote.play();
        },

        stopNote:function(playableNote){
            playableNote.stop();
        },
        setDestinationsForNote:function(playableNote){
            core.log('setting destinations');
            //if no soundNodes, just connect to default
            if(!this.attributes.soundNodes){
                playableNote.set('destination', core.audio.audioContext.destination);
            }else{//connect it to the first soundNode
                playableNote.set('destination', this.attributes.soundNodes[0].getWebAudio());
            }

        },

        //when a new sound node is added (eg gain, panner), link them together.
        setDestinationsForSoundNodes:function(){
            if(core.audio.audioContext.noWebAudio){return;} //allow the page to be displayed without error if no web audio.
            var soundNodes = this.attributes.soundNodes;
            //if we only have 1 sound node, just connect it to the speakers
            if(soundNodes.length === 1){
                //soundNodes[0].set('destination', core.audio.audioContext.destination);
                soundNodes[0].connect(core.audio.audioContext.destination);
                return;
            }

            var previousSoundNode = null,
                soundNode = null;
            for(var i = 0; i < soundNodes.length; ++i){
                soundNode = soundNodes[i];
                core.log('setting a destination with type: ' + soundNode.get('type'));
                if(previousSoundNode){
                    //previousSoundNode.set('destination', soundNode.getWebAudio());
                    previousSoundNode.connect(soundNode.getWebAudio());      //.context.destination
                }
                previousSoundNode = soundNode;
            }
            //connect the last sound node to the speakers
            soundNode.set('destination', core.audio.audioContext.destination);
        }
    });

    return InstrumentModel;
});