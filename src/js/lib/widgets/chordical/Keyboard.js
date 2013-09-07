define([
    'jquery',
    'core/core',
    'compiled-templates/widgets/chordical/keyboard'
], function ($, core, keyboardTemplate) {
    core.log('Keyboard View module loaded');

    var View = core.mvc.View.extend({
        id:'keyboardWidget', // each view needs a unique id for transitions.
        template:keyboardTemplate,
        isWidget:true,
        initialize:function(){
            core.log('keyboardWidget is attaching to ')
            core.mvc.View.prototype.initialize.apply(this, arguments);
            this.emitCustomDomEventsOnKeyEvents = this.emitCustomDomEventsOnKeyEvents.bind(this);
            $(document).on('keydown', this.emitCustomDomEventsOnKeyEvents);
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
            $(document).off('keydown', this.emitCustomDomEventsOnKeyEvents);
            core.mvc.View.prototype.remove.apply(this, arguments);
        },
        //SoundNode listens for
        emitCustomDomEventsOnKeyEvents:function(e){
            core.log('keydown! ' + e.keyCode);
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
            //playableNote.play();
        },
        handleNoteRelease:function(e){
            var $this = $(e.currentTarget);
            var noteToStop = $this.attr('note');
            core.log('note released: ' + noteToStop);
            var playableNote= this.model.notes[noteToStop].playableNote;
            this.model.instrument.stopNote(playableNote);
            //playableNote.stop();
        }
    });

    return View;
});