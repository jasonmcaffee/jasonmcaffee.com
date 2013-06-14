define([
    'core/core',
    'lib/views/Chordical',
    'jquery'
], function(core, ChordicalView, $){
    core.log('Chordical controller module loaded');

    var Controller = core.mvc.Controller.extend({
        initialize:function(){
            core.log('Chordical Controller constructor called.');
        },
        action:function(routeName, pageName){
            core.log('Chordical Controller action called with routeName:{0} pageName:{1}', routeName, pageName);

            this.chordicalView = new ChordicalView();
            this.chordicalView.render();

            core.ui.transitionPage(this.chordicalView);
        }
    });

    return new Controller();//singleton
});
