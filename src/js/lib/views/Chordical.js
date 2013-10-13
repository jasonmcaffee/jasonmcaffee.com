define([
    'core/core',
    'modernizer',
    'compiled-templates/chordical/chordical',
    'lib/widgets/chordical/keyboard'
], function(core, modernizr, chordicalTemplate, KeyboardWidget){
    core.log('Chordical View module loaded');

    var View = core.mvc.View.extend({
        id:'chordical', // each view needs a unique id for transitions.
        template:chordicalTemplate,
        title: 'Chordical',
        faviconUrl: 'images/chordical/chordical-favicon2.png',
        initialize:function(options){
            core.log('Chordical View initialize called.');
            if(!modernizr.webaudio){ setTimeout(function(){alert('web audio is not supported on your browser.');}, 2000); }

            this.options = this.options || {};
            this.options.widgets=[
                {selector:'#keyboardContainer', widget: new KeyboardWidget({model:this.model})}
            ];

            core.mvc.View.prototype.initialize.apply(this, [this.options]);
        }
    });

    return View;
});