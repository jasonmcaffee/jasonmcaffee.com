module.exports = function(grunt){
     var log = grunt.log.write;
    var config = grunt.config('css');

      //  sass --watch src/css-preprocess:src/css/compiled-css
    grunt.registerTask('sass-watch', function(){
        log('sass-watch now running');
        var spawn =  require('child_process').spawn;

        var sassWatch = spawn('sass', ['--watch', config.preprocessSourceDir+':'+config.preprocessOutputDir]);

        var taskDone = this.async();

        sassWatch.stdout.on('data', function(data){
            log('sass-watch stdout : ' + data);
        });

        sassWatch.stderr.on('data', function(data){
            log('sass-watch stderror : ' + data);
        });

        sassWatch.on('exit', function(code){
            log('sass-watch exit : ' + code);
            taskDone(true);
        });


    });

};

