//todo: (lower priority) - make all requirejs optimizer calls which minify js (optimize:true) run in a separate worker process if possible
module.exports = function(grunt) {

    console.log(process.cwd());
    //pretend like we are working in the parent directory.
    process.chdir('..');
    var rootDirectory = process.cwd();

    //config for various build tasks and helpers.
    var config = {
        cssSource : rootDirectory + '/src/css',
        jsSource : rootDirectory + '/src/js',
        distPublic : rootDirectory + '/dist',
        templatesSourceDir :  rootDirectory + '/src/templates',
        templatesDistDir : rootDirectory + '/src/js/compiled-templates'
    };
    config.cssDistDir = config.distPublic + '/css';
    config.jsDistDir = config.distPublic + '/js';
    config.cssDistFile = config.cssDistDir + '/app.css';


    // Project configuration.
    grunt.initConfig({
        general:{
            cssSource : config.cssSource
        },
        templates:{
            templatesSourceDir: config.templatesSourceDir,
            templatesDistDir: config.templatesDistDir
        },
        //css preprocessor
        css : {
            preprocessSourceDir : rootDirectory + '/src/css-preprocess',
            preprocessOutputDir : rootDirectory + '/dist/css',
            cssDistDir: config.cssDistDir,
            cssDistFile: config.cssDistFile,
            cssSource: config.cssSource

        },
        //stylus file watcher - compile to css then concat css to dist
        watch:{
            templateWatch:{
                files: [config.templatesSourceDir + '/**/*.html'],
                tasks:[ 'compile-templates', 'build-app-cmd']
            },
            jsWatch:{
                files: [config.jsSource + "/**/*.js"],
                tasks:['build-app-cmd']
            }
        }
    });


//============================================================================================================== Build Tasks
    /**
     * Requirejs has a weird bug when run more than once in the same process.  the define call will be at the top of the
     * generated file on the first run, but on subsequent runs it will end up on the bottom, causing script errors in the browser.
     * To circumvent this bug, we have to call the build-app-cmd so that require js build will always run in a new process.
     */
    grunt.registerTask('build-app-cmd', function(){
        console.log('build-app-cmd called');
        var spawn =  require('child_process').spawn;

        process.chdir('build');
        console.log('cur-dir : ' + process.cwd());
        //var commandLineToBeExecuted  = "sass --watch src/css-preprocess:src/css/compiled-css";
        //var spawnBuildApp = spawn('sass', ['--watch', 'src/css-preprocess:src/css/compiled-css']);
        var spawnBuildApp = spawn('grunt', ['build-app']);

        var taskDone = this.async();

        spawnBuildApp.stdout.on('data', function(data){
            console.log('stdout : ' + data);
        });

        spawnBuildApp.stderr.on('data', function(data){
            console.log('stderror : ' + data);
        });

        spawnBuildApp.on('exit', function(code){
            console.log('spawn build-app exit : ' + code);
            taskDone(true);
        });

        process.chdir('..');

    });

    /**
     * Uses require to build app-built.js into the dist/js folder.
     */
    grunt.registerTask('build-app', function(){
        console.log('build-app task has been called.' + process.cwd());

        var requirejs = require('requirejs');

        var config = {
            baseUrl: 'src/js',
            out: 'dist/js/app-built.js',
            optimize: 'none',
            name:'app',
            paths: {
                'jquery': 'lib-third-party/jquery',
                //'zepto' : 'lib-third-party/zepto',
                'underscore' : 'lib-third-party/underscore',
                'backbone' : 'lib-third-party/backbone',
                'requireLib' : 'lib-third-party/require',  //allow app-built to be bundled with requirejs
                'handlebars' : 'lib-third-party/handlebars.runtime', //we don't need all of Handlebars, since we are precompiling templates
                'modernizer' : 'lib-third-party/modernizer'
            },

            include:[
              'requireLib'
            ],
            //config for wrapping non-amd compliant code
            shim:{
                handlebars:{
                    exports : 'Handlebars'
                },
                underscore :{
                    exports : '_'
                },
                'backbone': {
                    deps: ['underscore', 'jquery'],
                    exports: 'Backbone'
                },
                'jquery':{
                    exports: '$'
                },
                'modernizer':{
                    exports: 'Modernizr'
                }
            }
        };

        var taskDone = this.async();//grunt async task management

        var requirejs = require('requirejs');
        requirejs.optimize(config, function (buildResponse) {
            console.log('build-app done');
            taskDone(true);
        });

    });


    var oldLog = console.log;
    console.log = function(message){
        var currentTime = new Date();
        var hours = currentTime.getHours() ;
        var minutes = currentTime.getMinutes() ;
        var seconds = currentTime.getSeconds();
        var milliseconds = currentTime.getMilliseconds();

        if (minutes < 10)
            minutes = "0" + minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var time = hours + ":" + minutes + ":" + seconds + ":" + milliseconds + " -> ";
        message = time + message;
        oldLog.apply(console, arguments);
    };







//============================================================================================================== Helpers

    //major build tasks
    grunt.registerTask("compile-templates-and-build-app", "compile-templates build-app");
    grunt.registerTask("build2", "build-app-cmd build-app-cmd");
    grunt.registerTask("build", "compile-templates-and-build-app");
    grunt.registerTask("dist", "build");
    grunt.registerTask("default", "dist");

    //load our tasks from the tasks folder
    grunt.loadTasks('build/tasks');

};

