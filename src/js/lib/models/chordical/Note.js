define([
    'core/core',
    'lib/models/chordical/notes'
], function(core, notes){
    core.log('Note Model module loaded.');

    //todo: polyfill https://github.com/g200kg/WAAPISim

    var context = new webkitAudioContext();//you can only have 1 context per window   http://stackoverflow.com/questions/14958175/html5-audio-api-audio-resources-unavailable-for-audiocontext-construction

    //http://tympanus.net/codrops/2013/06/10/web-audio-stylophone/
    var NoteModel = core.mvc.Model.extend({
        initialize:function(attributes, options){
            core.log('Note initialize called with note: ' + attributes.note + ' octave: ' + attributes.octave);
            if(!attributes.note){attributes.note = 'c';}
            if(!attributes.octave){attributes.octave = 3;}
//            this.set({note:note});
//            this.set({octave:octave});
            var frequency = this.getNoteFrequency(attributes.note, attributes.octave);
            this.set({frequency:frequency});
            core.log('Note frequency is: ' + frequency);

            this.context = context;


        },
        defaults:{

        },
        /**
         * returns the web audio frequency for given note and octave.
         * @param note - a, b, c, c#, db, bb, etc.
         * @param octave
         * @return {*}
         */
        getNoteFrequency:function(note, octave){
            core.log('getNoteFrequency called for note:' + note + ' octave: ' + octave);
            var match = notes[note];
            if(!match){core.log('no match found for note'); return;}
            return match.frequencies[octave];
        },
        play:function(){
            core.log('Note.play() called');
            //touch events can be weird. prevent notes from never ending.
            if(this.isPlaying){return;}
            this.isPlaying = true;


            this.oscillator = this.context.createOscillator();
            this.oscillator.type = this.oscillator.SQUARE;
            this.oscillator.frequency.value = this.get('frequency');
            this.oscillator.connect(this.context.destination); // Connect our oscillator to the speakers.

            this.oscillator.noteOn(0);
        },
        stop:function(){
            this.isPlaying = false;
            core.log('Note.stop() called');
            this.oscillator.noteOff(0);
            this.oscillator.disconnect();
        }
    });

    return NoteModel;
});