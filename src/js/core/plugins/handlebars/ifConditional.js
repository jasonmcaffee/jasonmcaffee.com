define([
    'core/util/log',
    'handlebars'
], function (log, Handlebars) {
    log('ifConditional core plugin module loaded.');

    /**
     * adds ability to use {{#if_conditional ...}}
     * @type {Object}
     */
    var plugin = {

        /**
         * in order for the plugin to register the handlebars helper, you must call init.
         * (don't assume how and when this is executed so we get greater flexibility).
         */
        init:function () {
            log('ifConditional plugin init called.');
            Handlebars.registerHelper("if_conditional", function (v1,v2,options) {
                log('if_conditional checking if v1: {0} == v2: {1}', v1, v2);
                if(v1 === v2) {
                    return options.fn(this);
                }
                return options.inverse(this);

            });

            /**
             * If Equals
             * if_eq this compare=that
             */
            Handlebars.registerHelper('if_eq', function(context, options) {
                if (context == options.hash.compare)
                    return options.fn(this);
                return options.inverse(this);
            });
        }
    };

    return plugin;

});
