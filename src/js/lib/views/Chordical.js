define([
    'core/core',
    'modernizer',
    'compiled-templates/chordical/chordical',
    'lib/models/chordical/Note',
    'lib/models/chordical/notes',
    'lib/widgets/chordical/keyboard'
], function(core, modernizr, chordicalTemplate, NoteModel, notes, KeyboardWidget){
    core.log('Chordical View module loaded');

    var View = core.mvc.View.extend({
        id:'chordical', // each view needs a unique id for transitions.
        template:chordicalTemplate,
        initialize:function(){
            core.log('Chordical View initialize called.');
            if(!modernizr.webaudio){ alert('web audio is not supported on your browser.');return;}

            this.model = {
                notes: notes
            };

            //create a note model for each note
            for(var note in notes){
                notes[note].playableNote = new NoteModel({note:note});
            }

            this.options.widgets=[
                {selector:'#keyboardContainer', widget: new KeyboardWidget({model:this.model})}
            ];

            core.mvc.View.prototype.initialize.apply(this, [this.options]);
        },
        events:{
            //note presses
            'mousedown .note':"handleNotePress",
            'mouseup .note':"handleNoteRelease",
            'touchstart .note':"handleNotePress",
            'touchend .note':"handleNoteRelease",

            //prevent scrolling when move occurs on the keyboard
            'touchmove .note':"handleUnintentionalMovement",
            'touchcancel .note':"handleUnintentionalMovement",
            'touchleave .note':"handleUnintentionalMovement"
        },
        handleUnintentionalMovement:function(e){
            e.preventDefault();
            //alert('touch move canceled');
        },
        handleNotePress:function(e){

            var $this = $(e.currentTarget);
            var noteToPlay = $this.attr('note');
            core.log('note pressed: ' + noteToPlay);
            var playableNote= this.model.notes[noteToPlay].playableNote;
            playableNote.play();
        },
        handleNoteRelease:function(e){
            var $this = $(e.currentTarget);
            var noteToStop = $this.attr('note');
            core.log('note released: ' + noteToStop);
            var playableNote= this.model.notes[noteToStop].playableNote;
            playableNote.stop();
        }
    });

    return View;
});