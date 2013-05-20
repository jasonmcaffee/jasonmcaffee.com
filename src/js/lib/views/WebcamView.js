define([
    'core/core',
    'compiled-templates/webcam/webcamPageTemplate',
    'lib/models/asyncFileUploader',
    'lib/widgets/ProgressBar',
    'compiled-templates/webcam/images',
    'jquery'
], function(core, webcamPageTemplate, asyncFileUploader, ProgressBar, imagesTemplate, $){
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

            this.options.templates.push({
                selector:'#recentlyUploadedImagesContainer',
                template:imagesTemplate
            });

            //alert('page refresh');
        },
        events:{
            'click #captureInputFacade':function(e){
                e.stopImmediatePropagation();
                e.preventDefault();

                setTimeout(function(){
                    //there's a bug here on ios with fastbutton. next click that occurs triggers another prompt to select file or take picture.
                    //any native prompts should be inside of a setTimeout
                    //alert('triggering click for captureInput');
                    this.$el.find('#captureInput').click();//.trigger('click');
                }.bind(this), 1);

            },
            'change #captureInput':function(e){
               //alert('captureInput change with file: ' + e.target.files[0]);
                this.selectedFile = e.target.files[0];
                if(typeof FileReader != "undefined"){
                    core.log('filereader supported');
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        //settimeout fixes flash of entire page issue in ios
                        setTimeout(function(){
                            this.$el.find('#imagePreview').attr('src', e.target.result);

                        }.bind(this), 100);

                    }.bind(this);

                    reader.readAsDataURL(this.selectedFile);

                }else{
                    alert('sorry, but your browser doesnt support previewing the image before upload');
                }
            },
            'submit #fileUploadForm':function(e){
                core.log('form submit called..');
                //setTimeout(function(){alert('submit called')}, 1);
                e.preventDefault();

                if(!this.selectedFile){
                    setTimeout(function(){
                        alert('please select a file');
                    }, 1);
                    return;
                }
                this.progressBarWidget.setProgressBar('0%');
                //upload the selected file
                asyncFileUploader.uploadFileAsync(
                    this.selectedFile,
                    e.target.action,
                    this.progressBarWidget.updateProgressBar.bind(this.progressBarWidget),
                    this.fileUploadComplete.bind(this),
                    this.fileUploadError.bind(this)
                );
            }
        },
        fileUploadComplete:function(responseText){
            core.log('upload complete: ' + responseText);
            var responseData = JSON.parse(responseText);
            core.log('fileUploadComplete callback: ' + responseText);
            this.model.recentlyUploadedImages = responseData.recentlyUploadedImagePaths;

            this.$el.find('#recentlyUploadedImagesContainer').html(imagesTemplate(this.model));
        },
        fileUploadError:function(e){
            alert('error uploading file: ' + e);
        }
    });

    return View;
});