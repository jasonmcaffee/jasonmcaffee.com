define([
    'core/core',
    'compiled-templates/demos/imagesTest1',
    'jquery'
], function(core, imagesTest1Template, $){
    core.log('ImagesTest view module loaded');

    var View = core.mvc.View.extend({
        id:'imagesTest', // each view needs a unique id for transitions.
        template:imagesTest1Template,
        events:{
            'click .image-set-item':function(e){
                core.log('toggling visibility for image');
                var $this = $(e.currentTarget);
                var $imgToToggle = $this.find('img');
                $imgToToggle.toggle();
            }
        }
    });
    return View;
});