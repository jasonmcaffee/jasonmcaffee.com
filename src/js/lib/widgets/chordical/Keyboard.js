define([
    'jquery',
    'core/core',
    'compiled-templates/widgets/chordical/keyboard'
], function ($, core, keyboardTemplate) {
    core.log('Keyboard View module loaded');

    //model should be the NotesModel created by the controller.
    var View = core.mvc.View.extend({
        id:'keyboardWidget', // each view needs a unique id for transitions.
        template:keyboardTemplate,
        isWidget:true,
        //used for handleKeyDown. since keydown is fired multiple times when you hold the key down, we use this object
        //to track whether the key is already down.
        keysPressed : {'1': false}, //keyCode on the left, whether its press on the right
        initialize:function(){
            core.log('keyboardWidget is attaching to ');
            core.mvc.View.prototype.initialize.apply(this, arguments);
            //assigning the result of bind so we can pass to off during destroy.
            this.handleKeyDown = this.handleKeyDown.bind(this);
            $(document).on('keydown', this.handleKeyDown);
            this.handleKeyUp = this.handleKeyUp.bind(this);
            $(document).on('keyup', this.handleKeyUp);
        },
        events:{
            //note presses
            'mousedown .sound-cell':"handleNotePress",
            'mouseup .sound-cell':"handleNoteRelease",
            'touchstart .sound-cell':"handleNotePress",
            'touchend .sound-cell':"handleNoteRelease",

            //prevent scrolling when move occurs on the keyboard
            'touchmove .sound-cell':"handleUnintentionalMovement",
            'touchcancel .sound-cell':"handleUnintentionalMovement",
            'touchleave .sound-cell':"handleUnintentionalMovement"
        },
        remove:function(){
            core.log('remove called for keyboardWidget');
            $(document).off('keydown', this.handleKeyDown);
            $(document).off('keyup', this.handleKeyUp);
            core.mvc.View.prototype.remove.apply(this, arguments);
        },

        //SoundNode listens for
        handleKeyDown:function(e){
            core.log('keydown! ' + e.keyCode);
            if(this.keysPressed[e.keyCode]){ return core.log('key is already pressed'); }
            this.keysPressed[e.keyCode] = true;
            //keydown will continue to fire while the key is held down, so dont call play over and over again.
            var notesToPlay = this.model.findNotesTriggeredByKeyCode(e.keyCode);
            this.playNotes(notesToPlay);

            var keyedEls = this.buildSelectorForElsTriggeredByKeyEvent(notesToPlay);
            this.$el.find(keyedEls).addClass('sound-cell-active');
        },
        //for key up and key down, we need to find the corresponding element for the note(s) that was played.
        //returns a string in the format  "[note='c#1'], [note='d#1']"
        buildSelectorForElsTriggeredByKeyEvent:function(notesToPlay){
            //find all els and add class
            var foundEls = ""; //build up a selector like "[note='c#1'], [note='d#1']"
            for(var i=0; i< notesToPlay.length; ++i){
                var note = notesToPlay[i];
                foundEls = foundEls.length > 0 ? foundEls + "," : foundEls;
                var noteSelector = "[note='" + note.noteSymbol + note.octave + "']";
                foundEls+=noteSelector;
            }
            core.log('foundEls is ' + foundEls);
            return foundEls;
        },
        handleKeyUp:function(e){
            core.log('keyup! ' + e.keyCode);
            this.keysPressed[e.keyCode] = false;
            var notesToStop = this.model.findNotesTriggeredByKeyCode(e.keyCode);
            this.stopNotes(notesToStop);

            var keyedEls = this.buildSelectorForElsTriggeredByKeyEvent(notesToStop);
            this.$el.find(keyedEls).removeClass('sound-cell-active');
        },
        playNotes:function(notesToPlay){
            for(var i=0; i<notesToPlay.length; ++i){
                var playableNote = notesToPlay[i].playableNote;
                this.model.instrument.playNote(playableNote);
            }
        },
        stopNotes:function(notesToPlay){
            for(var i=0; i<notesToPlay.length; ++i){
                var playableNote = notesToPlay[i].playableNote;
                this.model.instrument.stopNote(playableNote);
            }
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
            this.model.instrument.playNote(playableNote);
            $this.addClass('sound-cell-active');
        },
        handleNoteRelease:function(e){
            var $this = $(e.currentTarget);
            var noteToStop = $this.attr('note');
            core.log('note released: ' + noteToStop);
            var playableNote= this.model.notes[noteToStop].playableNote;
            this.model.instrument.stopNote(playableNote);
            $this.removeClass('sound-cell-active');
        }
    });

    return View;
});