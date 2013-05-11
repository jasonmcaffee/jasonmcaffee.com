define([
    'core/core',
    'compiled-templates/webcam/webcamPageTemplate',
    'lib/models/asyncFileUploader'
], function(core, webcamPageTemplate, asyncFileUploader){
    core.log('Webcam View module loaded');

    var View = core.mvc.View.extend({
        id:'webcam', // each view needs a unique id for transitions.
        template:webcamPageTemplate,
        selectedFile:null, //when input changes, this will get set, so when form is submitted, we have a reference
        events:{
            'change #captureInput':function(e){
                core.log('captureInput change with file: ' + e.target.files[0]);
                this.selectedFile = e.target.files[0];
            },
            'submit #fileUploadForm':function(e){
                core.log('form submit called..');
                e.preventDefault();

                if(!this.selectedFile){core.log('please select a file'); return;}


                asyncFileUploader.uploadFileAsync(this.selectedFile, e.target.action, this.fileProgress.bind(this), this.fileUploadComplete.bind(this));

            }
        },
        fileUploadComplete:function(){
            core.log('fileUploadComplete callback');
        },
        fileProgress:function(){
            core.log('fileProgress callback');
        }
    });

    return View;
});