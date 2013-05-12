define([
    'core/core',
    'compiled-templates/widgets/progressBarTemplate'
], function(core, progressBarTemplate){
    core.log('ProgressBar widget module loaded');

    var View = core.mvc.View.extend({
        id:'progressBar', // each view needs a unique id for transitions.
        template:progressBarTemplate,
        model:{percentLoaded:0},
        updateProgressBar:function(e){
            core.log('updateProgressBar callback');
            core.log('length computable? : ' + e.lengthComputable);
            core.log('loaded : total --> ' + e.loaded + ' ' + e.total);
            if(e.lengthComputable){
                var loaded = e.loaded;
                var total = e.total;
                this.model.percentLoaded = (loaded/total) * 100;

                //refresh the progress bar
                var newHtml = progressBarTemplate(this.model);
                this.$el.html(newHtml);
            }
        }
    });

    return View;
});