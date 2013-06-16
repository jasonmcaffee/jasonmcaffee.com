define([
    'core/core',
    'lib/views/Chordical',
    'lib/views/chordical/InstrumentEdit',
    'lib/models/chordical/Note',
    'lib/models/chordical/notes',
    'lib/models/chordical/Instrument'
], function(core, ChordicalView, InstrumentEditView, NoteModel, notes, InstrumentModel){
    core.log('Chordical controller module loaded');

    var Controller = core.mvc.Controller.extend({
        initialize:function(){
            core.log('Chordical Controller constructor called.');
            core.audio.init();
        },
        action:function(routeName, pageName){
            core.log('Chordical Controller action called with routeName:{0} pageName:{1}', routeName, pageName);

            switch(pageName){
                case "edit": this.editPageAction(); break;
                case "instrument":this.instrumentPageAction(); break;
                default:this.homePageAction();
            }

        },
        getNotesModel:function(){
            core.log('Chordical Controller createNotesModel called');
            if(this.notesModel){return this.notesModel;}

            //instrument dictates how the notes are constructed   (selected sound, destination, etc)
            this.getInstrumentModel();

            //create a note model for each note.
            //keyboard widget uses this to play notes via the instrument.
            for(var note in notes){
                notes[note].playableNote = new NoteModel({note:note, instrument:this.instrumentModel});
            }
            this.notesModel = {
                notes: notes,
                instrument: this.instrumentModel
            };
            return this.notesModel;
        },
        getInstrumentModel:function(){
            core.log('Chordical Controller createSoundsModel called');
            if(this.instrumentModel){return this.instrumentModel;}
            this.instrumentModel = new InstrumentModel();
            return this.instrumentModel;
        },
        homePageAction:function(){
            core.log('home page action called.');
            this.getNotesModel();
            this.chordicalView = new ChordicalView({model:this.notesModel});
            this.chordicalView.render();

            core.ui.transitionPage(this.chordicalView);
        },
        editPageAction:function(){
            alert('edit not implemented yet');
        },
        instrumentPageAction:function(){
            this.getInstrumentModel();
            this.instrumentEditView = new InstrumentEditView({model:this.instrumentModel});
            core.log('selectedSoundOption: ' + this.instrumentModel.attributes.selectedSoundOption);
            this.instrumentEditView.render();
            core.ui.transitionPage(this.instrumentEditView);
        }
    });

    return new Controller();//singleton
});
