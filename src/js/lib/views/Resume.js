define([
    'core/core',
    'compiled-templates/resume/resume'
], function(core, resumeTemplate){
    core.log('Resume View module loaded');

    var View = core.mvc.View.extend({
        el:'#pages',
        template:resumeTemplate
    });

    return View;
});