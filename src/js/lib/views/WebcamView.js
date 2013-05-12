define([
    'core/core',
    'compiled-templates/webcam/webcamPageTemplate',
    'lib/models/asyncFileUploader',
    'lib/widgets/ProgressBar',
    'compiled-templates/webcam/images'
], function(core, webcamPageTemplate, asyncFileUploader, ProgressBar, imagesTemplate){
    core.log('Webcam View module loaded');

    var View = core.mvc.View.extend({
        id:'webcam', // each view needs a unique id for transitions.
        template:webcamPageTemplate,
        selectedFile:null, //when input changes, this will get set, so when form is submitted, we have a reference
        initialize:function(){
            core.log('init called for webcam view');
            core.mvc.View.prototype.initialize.apply(this, arguments);

            this.progressBarWidget = new ProgressBar({id:'progressBarContainer'});
            this.options.widgets.push({
                selector:'#progressBarContainer',
                widget:this.progressBarWidget
            });
        },
        events:{
            'change #captureInput':function(e){
                core.log('captureInput change with file: ' + e.target.files[0]);
                this.selectedFile = e.target.files[0];
            },
            'submit #fileUploadForm':function(e){
                core.log('form submit called..');
                e.preventDefault();

                if(!this.selectedFile){core.log('please select a file'); return;}


                asyncFileUploader.uploadFileAsync(
                    this.selectedFile,
                    e.target.action,
                    this.progressBarWidget.updateProgressBar.bind(this.progressBarWidget),
                    this.fileUploadComplete.bind(this)
                );
            }
        },
        fileUploadComplete:function(){
            core.log('fileUploadComplete callback');
        }
    });

    return View;
});