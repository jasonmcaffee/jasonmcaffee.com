define([
    'core/core'
], function(core){
    core.log('AsyncFileUploader module loaded.');
    var AsyncFileUploader = core.mvc.Model.extend({

        //asynchronously upload a file
        uploadFileAsync : function(selectedFile, urlToUploadTo, onProgressCallback, onLoadedCallback, onErrorCallback){
            var xhr = new XMLHttpRequest();//sends the data
            //var formData = new FormData();

            xhr.upload.addEventListener("progress", function (e) {
                core.log('addEvent progress called.');
                handleProgress(e);
            }, false);

            xhr.onprogress = handleProgress;
            function handleProgress(e){
                core.log('progress -----');
                core.log('length computable? : ' + e.lengthComputable);
                core.log('loaded : total --> ' + e.loaded + ' ' + e.total);
                //alert('progress');
                if(onProgressCallback){ onProgressCallback(e);}
            }
            xhr.onreadystatechange = function(data){
                if(xhr.readyState == 4){
                    core.log('upload complete : ' + data.success);
                }
                if(xhr.readyState == 3){
                    //alert('processing');
                }
            };

            xhr.onerror = onErrorCallback;

            xhr.addEventListener("load", function (data) {
                core.log('load complete : ' + this.responseText);
                //var responseData = JSON.parse(this.responseText);
                if(onLoadedCallback) { onLoadedCallback(this.responseText);}

            }, false);

            urlToUploadTo = urlToUploadTo + "?cache="+(Math.random()*1000000);
            xhr.open('POST', urlToUploadTo, true);
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("X-File-Name", selectedFile.name);
            xhr.setRequestHeader("X-File-Size", selectedFile.fileSize);
            xhr.setRequestHeader("X-File-Type", selectedFile.type);

            //formData.append('userImage', this.selectedFile);

            //xhr.send(formData);
            xhr.send(selectedFile);
        }
    });

    var asyncFileUploader = new AsyncFileUploader();
    return asyncFileUploader;//singleton
});