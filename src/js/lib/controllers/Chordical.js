define([
    'core/core',
    'lib/views/Chordical',
    'lib/views/chordical/Sounds',
    'lib/models/chordical/Note',
    'lib/models/chordical/notes',
    'lib/models/chordical/Sound'
], function(core, ChordicalView, SoundsView, NoteModel, notes, SoundModel){
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
                case "sounds":this.soundsPageAction(); break;
                default:this.homePageAction();
            }

        },
        getNotesModel:function(){
            core.log('Chordical Controller createNotesModel called');
            if(this.notesModel){return this.notesModel;}

            //sound dictates how the notes are constructed
            this.getSoundsModel();

            //create a note model for each note
            for(var note in notes){
                notes[note].playableNote = new NoteModel({note:note, sound:this.soundModel});
            }
            this.notesModel = {
                notes: notes
            };
            return this.notesModel;
        },
        getSoundsModel:function(){
            core.log('Chordical Controller createSoundsModel called');
            if(this.soundModel){return this.soundModel;}
            this.soundModel = new SoundModel();
            return this.soundModel;
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
        soundsPageAction:function(){
            this.getSoundsModel();
            this.soundsView = new SoundsView({model:this.soundModel});
            core.log('selectedSoundOption: ' + this.soundModel.attributes.selectedSoundOption);
            this.soundsView.render();
            core.ui.transitionPage(this.soundsView);
        }
    });

    return new Controller();//singleton
});
