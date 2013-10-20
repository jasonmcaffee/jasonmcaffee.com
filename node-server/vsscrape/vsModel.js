module.exports = function(){
    var jsdom  = require('jsdom');
    var fs     = require('fs');
    var request = require('request');
    var phantom = require('phantom');
    // var jquery = fs.readFileSync("../src/js/lib-third-party/jquery.js").toString();

    var vsModel = {

        /**
         * Returns an array of primary navigation links, which are created by going to the home page and
         * parsing each anchor's href under #nav-primary > ul > li
         * @return -  [
         *          "http://www.victoriassecret.com/bras",
         *          "http://www.victoriassecret.com/panties",
         *          "http://www.victoriassecret.com/sleepwear"
         *      ]
        */
        getPrimaryNavigationLinks: function(callback){
            //cache
            if(this.primaryNavigationLinks){callback(this.primaryNavigationLinks); return;}

            this.primaryNavigationLinks = [];
            vsRequestUsingJsdom("", function ($, window, error) {
                $('#nav-primary > ul > li a').each(function(i, item){
                    var link = $(item).attr('href');
                    this.primaryNavigationLinks.push(link);
                }.bind(this));

                callback(this.primaryNavigationLinks);
            }.bind(this));
        },

        /**
         * Returns an array of collection items gathered from the secondary navigation on bras/all-collections
         * @return - [
         *  {
         *      name: "Fabulous by Victoria's Secret",
         *      href: "http://www.victoriassecret.com/bras/fabulous-by-victorias-secret-collection"
         *  }
         * ]
         *
        */
        getCollections: function(callback){
            if(this.collections){callback(this.collections); return;}
            this.collections = [];

            vsRequest("bras/all-collections", function(){
                var $navItems = $('#nav-secondary > ul.menu > li');
                var collectionsResult = [];
                console.log('$navItems length is: ' + $navItems.length);
                $navItems.each(function(i, item){
                    var $item = $(item);
                    var $navSections = $item.find('> h3 > span');
                    $navSections.each(function(x, navSectionTitle){
                        var $navSectionTitle = $(navSectionTitle)
                        //console.log($navSectionTitle.text());
                        if($navSectionTitle.text().toLowerCase().indexOf("shop by collection") >= 0){
                            var $collections = $item.find('> ul > li a');
                            $collections.each(function(y, collection){
                                var $collection = $(collection);
                                var collectionName = $collection.text();
                                if(collectionName.toLowerCase().indexOf("all collections") < 0 &&
                                    collectionName.toLowerCase().indexOf("about our collections") < 0){
                                    //console.log(collectionName);
                                    var collectionResult = {
                                        name: collectionName,
                                        href: "http://www.victoriassecret.com" + $collection.attr('href')
                                    };
                                    collectionsResult.push(collectionResult);
                                }
                            });
                        }
                    });
                });
                return collectionsResult;
            }, function(collectionsResult){
                console.log('collectionsResult length: ' + collectionsResult ? collectionsResult.length : null);
                this.collections = collectionsResult;
                callback(this.collections);
            }.bind(this));

        }

    };

    /**
     * Requests the given path, executes the evaluateFunction, and calls the callback passing the return value of the evaluate function
     * @param path - "bras/all-collections"
     * @param evaluateFunction - the function to be executed
     *  function(){
     *      return window.document.title;
     *  }
     * @param callback - the function which will be executed, being passed the return value of the evaluateFunction
     *  function(title){
     *     console.log('window title is: ' + title);
     *  }
    */
    function vsRequest(path, evaluateFunction, callback){
        var uri = "http://www.victoriassecret.com/" + path;
        //var uri = "http://www.google.com"; //http://www.whatsmyuseragent.com/
        //http://snippets.aktagon.com/snippets/534-how-to-scrape-web-pages-with-phantomjs-and-jquery
        //http://net.tutsplus.com/tutorials/javascript-ajax/web-scraping-with-node-js/
        phantom.create(function(ph){
            ph.createPage(function(page){
//                page.setHeaders({
//                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//                    "Cache-Control": "no-cache",
//                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.65 Safari/537.31"
//                });
                page.set("onConsoleMessage", function(message){
                    console.log(message);
                });
                page.open(uri, function(status){
                    if (status === 'success') {
//                        page.injectJs('jquery-2.0.3.min.js', function(){
//                            console.log('jquery is : ' + $);
//                        });  '
                        console.log('trying to evaluate');
                        page.evaluate(evaluateFunction, function(evaluateResult){
                            callback(evaluateResult);
                            ph.exit();
                        });
                    }else{
                        console.log('error trying to open uri: ' + uri + '\n status:' + status);
                        callback(null, null, 'status: ' + status);
                        ph.exit();
                    }
                });
            });
        });
    }
    /**
     * uses jsdom and executes callback once the requested path's body has been loaded and jQuery is ready to use.
     * @param path - eg. "bras" "bras/all-collections"... use "" for home
     * @param callback - function taking params ($, window, error)
     *
     * TODO: use connection keep-alive
     */
    function vsRequestUsingJsdom(path, callback){
        var uri = "http://www.victoriassecret.com/" + path;

        request({
            uri : uri,
            headers:{
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Cache-Control": "no-cache",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.65 Safari/537.31"
            }
        }, function (error, response, body) {
            jsdom.env({
                html: body,
                scripts: ['http://codeorigin.jquery.com/jquery-1.10.2.min.js'],
                done: function(err, window){
                    var $ = window.jQuery;
                    console.log(error);
                    //console.log(body);
                    //console.log("there have been", window.$("a").length, "nodejs releases!");
                    callback($, window, error);
                }
            });
        });
    }

    return vsModel;
};