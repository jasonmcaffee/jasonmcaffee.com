/**
 *
 */
define([], function(){

    /**
     * Allows you to pass in a message in the format 'the date is {0} and the time is {1}', where {0} and {1} will be replaced
     * with the values of subsequent parameters.
     * e.g. log('the date is {0} and the time is {1}', new Date(), new Time());
     * todo: allow for object literals to be passed in for different log types when needed.
     * @param message
     */
    function log(message){
        if(console && console.log){
            var formattedMessage = message;
            for (var i = 0; i < arguments.length; i++) {
                var regexp = new RegExp('\\{'+i+'\\}', 'gi');
                formattedMessage = formattedMessage.replace(regexp, arguments[i+1]);
            }

            console.log(formattedMessage);
        }
    }

    return log;
});