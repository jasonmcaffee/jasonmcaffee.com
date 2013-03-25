define([
    'core/core',
    'compiled-templates/blogs/blogHome'
], function(core, blogHomeTemplate){
    core.log('Blog View module loaded a');

    var View = core.mvc.View.extend({
        id:'blog', // each view needs a unique id for transitions.
        template:blogHomeTemplate
    });

    return View;
});