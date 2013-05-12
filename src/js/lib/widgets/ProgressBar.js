define([
    'core/core',
    'compiled-templates/widgets/progressBarTemplate'
], function(core, progressBarTemplate){
    core.log('ProgressBar widget module loaded');

    var View = core.mvc.View.extend({
        id:'progressBar', // each view needs a unique id for transitions.
        template:progressBarTemplate,
        model:{percentageLoadedString:'0%'},
        isWidget:true,
        updateProgressBar:function(e){
            core.log('updateProgressBar callback');
            core.log('length computable? : ' + e.lengthComputable);
            core.log('loaded : total --> ' + e.loaded + ' ' + e.total);
            if(e.lengthComputable){
                var loaded = e.loaded;
                var total = e.total;
                this.model.percentageLoadedString = (loaded/total) * 100;
                if(Number(1) && Number(1).toFixed){
                    this.model.percentageLoadedString = Number(this.model.percentageLoadedString).toFixed(0);
                }
                this.model.percentageLoadedString += '%';
                core.log('percentageLoadedString: ' +this.model.percentageLoadedString);

                //refresh the progress bar
                var newHtml = progressBarTemplate(this.model);
                this.$el.html(newHtml);
            }
        },
        setProgressBar:function(percentString){
            this.model.percentageLoadedString = percentString;
            var newHtml = progressBarTemplate(this.model);
            this.$el.html(newHtml);
        }
    });

    return View;
});