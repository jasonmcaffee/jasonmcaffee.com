define([
    'core/core',
    'compiled-templates/resume/resume'
], function(core, resumeTemplate){
    core.log('Resume View module loaded a');

    var View = core.mvc.View.extend({
        id:'resume', // each view needs a unique id for transitions.
        template:resumeTemplate
    });

    return View;
});