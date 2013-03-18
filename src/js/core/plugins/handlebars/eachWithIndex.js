define([
    'core/util/log',
    'handlebars'
], function(log, Handlebars){
    log('eachWithIndex core plugin module loaded.');

    /**
     * adds ability to use {{#each_with_index items}}
     * @type {Object}
     */
    var plugin = {

        /**
         * in order for the plugin to register the handlebars helper, you must call init.
         * (don't assume how and when this is executed so we get greater flexibility).
         */
        init : function(){
            log('eachWithIndex plugin init called.');
            //https://gist.github.com/1048968
            Handlebars.registerHelper("each_with_index", function(array, fn) {
                var buffer = "";
                for (var i = 0, j = array.length; i < j; i++) {
                    var item = array[i];

                    // stick an index property onto the item, starting with 1, may make configurable later
                    item.index = i;

                    // show the inside of the block
                    buffer += fn(item);
                }

                // return the finished buffer
                return buffer;

            });
        }
    };

    return plugin;

});
