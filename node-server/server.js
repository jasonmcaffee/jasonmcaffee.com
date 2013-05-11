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


//configuration ===============================================================================================================
var config = {
    viewsDirectory : __dirname + '/views/',
    port: 4001,
    publicStaticFiles :  path.resolve(__dirname + '/../dist')
};
app.configure(function(){


     // Parses form encoded data so we can get it in json form
    app.use(express.bodyParser());

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

//server response functions =====================================================================================================
app.get('/', function(req,res){
    //var userAgent = 'Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; O2 Xda 2s;PPC;240x320; PPC; 240x320)';// req.headers['user-agent'];
    //var deviceInfo = wurfl.get(userAgent);
    console.log('strapkit home');

    var viewModel = {
        viewModel:{

        }
    };
    res.render(config.viewsDirectory + 'test.html', viewModel);
});



// Start server ===================================================================================================================
console.log('Starting modern-browser server on port ' + config.port);
app.listen(config.port);


