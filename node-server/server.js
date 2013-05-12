//module dependencies ========================================================================================================
var express = require('express');
var path = require('path');
var connect = require('connect');
var gzippo = require('gzippo');
var fs = require('fs');

//var wurfl = require('wurfl');

//read in the wurfl file
//wurfl.loadSync();

//where we are serving our static files from
//var public = path.resolve(__dirname + '/../dist');
//var port = 4000;

//create the app server
var app = express.createServer();


console.log('dirname is : ' + __dirname);
//configuration ===============================================================================================================
var config = {
    viewsDirectory : __dirname + '/views/',
    port: 4001,
    publicStaticFiles :  path.resolve(__dirname + '/../dist'),
    uploadDir : path.resolve(__dirname + '/../dist') + '/uploadedFiles/'
};

//silly hack. can't get formidable to get passed the uploadDir option. it calls os.tmpDir when uploadDir is null
var os = require('os');
if(!os.tmpDir){
    console.log('polyfill tmpDir');
    os.tmpDir = function(){
        return config.uploadDir;
    };
}

app.configure(function(){
     // Parses form encoded data so we can get it in json form
    //app.use(express.bodyParser());
    app.use(express.bodyParser({uploadDir: config.uploadDir, keepExtension:true}));//so we can have post & req.body  e.g. req.body.something

    // The methodOverride middleware allows Express apps to behave like RESTful apps, as popularised by Rails; HTTP methods like PUT can be used through hidden inputs
    app.use(express.methodOverride());

    //gzip all static files in public folder (js, css, etc)
    app.use(gzippo.staticGzip(config.publicStaticFiles));

    //gzips the server side template views
    app.use(connect.compress());//gzip functionality

    //show stacktraces to the public
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

    //log incoming requests
    app.use(express.logger({
        'stream' : fs.createWriteStream(__dirname+'/../node-server/logs/node.log',{flags: 'a'})
    }));

});


//server side templating ========================================================================================================
var ejs = require('ejs');//view engine for templates
ejs.open = 'µ';//eliminate conflicts with clientside templating by using our own open and close tags for ejs templates.
ejs.close = 'µ';
app.set('view engine', 'ejs');//we are using ejs for server side templating
app.set('view options', { layout: false }); //i don't need layouts right now
app.register('.html', require('ejs'));//all .html files served up will be considered ejs templates.



//metrics ======================================================================================================================
app.post('/metrics', function(req, res){

});

//webcam ========================================================================================================================
var recentlyUploadedImagePaths = [];//array for temporarily storing image paths so we can display them to the user.
app.recentlyUploadedImagePaths = recentlyUploadedImagePaths;

app.post('/webcam/uploadImage', function(req,res,next){
    console.log('uploadImage called');
    var self = this;
    var uploadDirectory =  config.uploadDir;
    var fileName =  req.header('X-File-Name');
    var fileSize = req.header('X-File-Size');
    var fileType = req.header('X-File-Type');

    if(!fileName){
        console.log('error in uploadImage. fileName was not specified');
        res.send(JSON.stringify({
            success:false,
            errorMessage: 'file name was not specified',
            recentlyUploadedImagePaths: app.recentlyUploadedImagePaths
        }));

        return;//don't continue
    }

    if(fileName === 'image.jpg'){
        fileName = 'image_' + Date.now() + '.jpg';
    }

    var filePath = uploadDirectory + fileName;  //todo: clean params to prevent hacking.

    console.log('upload image called. fileName : ' + fileName + ' fileSize : ' + fileSize + ' fileType : ' + fileType);

    var bytesUploaded = 0;
    var file = fs.createWriteStream(filePath);

    req.on('data', function(chunk) {
        console.log('data from client received ' + chunk.length);


        file.write(chunk);
        bytesUploaded += chunk.length;

        //don't write here. the end will not get written if you do.
        //var responseText = JSON.stringify({progress:true, bytesUploaded: bytesUploaded, totalBytesExpected:fileSize});
        //res.write(responseText);
        //res.send(responseText); //progress the client if needed

    });

    req.on('end', function() {
        console.log('end from client received');
        file.end();

        //where the browser can download the image from
        var newImagePath = '/uploadedFiles/' + fileName;

        //only show 3 images
        app.recentlyUploadedImagePaths.splice(0,0,newImagePath);//to the front!
        console.log('images length: ' + app.recentlyUploadedImagePaths.length);
        if(app.recentlyUploadedImagePaths.length > 3){
            app.recentlyUploadedImagePaths.pop();
            console.log('images length after pop: ' + app.recentlyUploadedImagePaths.length);
        }

        //response data
        res.send(JSON.stringify({
            success:true,
            errorMessage : false,
            recentlyUploadedImagePaths: app.recentlyUploadedImagePaths
        }));
    });

});

app.post('/webcam/uploadImageNonAsync', function(req,res,next){
    console.log('upload imageNonAsync called');
    console.log('files: ' + JSON.stringify(req.files));

    // get the temporary location of the file
    var tmp_path = req.files.userImage.path;//req.files.thumbnail.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = config.uploadDir + req.files.userImage.name;//req.files.thumbnail.name + '.jpg';

    try{
        // move the file from the temporary location to the intended location
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            try{//renaming the file can fail if the user cancels upload
                fs.unlink(tmp_path, function() {
                    if (err) throw err;
                    var newImagePath = '/uploadedFiles/'+req.files.userImage.name;
                    //res.send('File uploaded to: ' + target_path + ' - ' + req.files.userImage.size + ' bytes');
                    recentlyUploadedImagePaths.splice(0,0,newImagePath);//to the front!
                    console.log('images length: ' + recentlyUploadedImagePaths.length);
                    if(recentlyUploadedImagePaths.length > 3){
                        recentlyUploadedImagePaths.pop();
                        console.log('images length after pop: ' + recentlyUploadedImagePaths.length);
                    }
                    //back from whence ye came devil!
                    res.redirect('back');
                });
            }catch(err){
                console.log('error encountered while trying to unlink file');
                res.redirect('back');//todo: temp solution
            }
        }); //end rename
    }catch(err){
        console.log('error encountered while trying to unlink file');
        res.redirect('back');//todo: temp solution
    }

});

//server response functions =====================================================================================================
app.get('/', function(req,res){
    //var userAgent = 'Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; O2 Xda 2s;PPC;240x320; PPC; 240x320)';// req.headers['user-agent'];
    //var deviceInfo = wurfl.get(userAgent);
    console.log('jason mcaffee.com home');

    var viewModel = {
        viewModel:{
            recentlyUploadedImagePaths: app.recentlyUploadedImagePaths
        }
    };
    res.render(config.viewsDirectory + 'test.html', viewModel);
});



// Start server ===================================================================================================================
console.log('Starting jasonmcaffee.com server on port ' + config.port);
app.listen(config.port);


