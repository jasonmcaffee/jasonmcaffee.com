//use phantomjs, jsdom, and http to scrape victoriassecret.com pages and services.
module.exports = function(){
    var jsdom  = require('jsdom'); //used for simple, non-problematic queries (see vsRequestUsingJsdom notes)
    var request = require('request');//used to include http headers and getting page body (used with jsdom only)
    var phantom = require('phantom');//used for queries jsdom is unable to handle. (a bit slower than jsdom)
    var http = require('http'); //used to make existing vs service requests.   e.g. bras/all-collections/facets
    var fs = require('fs');
    var jquery = fs.readFileSync("../src/js/lib-third-party/jquery.js");//inject our jquery loaded from disk rather than make http call for it (jsdom)

    //constants
    //vs blows up when a user agent header is not sent.
    var chromeUserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.65 Safari/537.31";

    /**
     * Model which uses jsdom or phantomjs to request vs pages, scrape/query using jquery, and return json data representations.
     * Also calls existing vs services using http requests (useful when trying to get around cross origin issues)
     */
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
            if(this.primaryNavigationLinks){callback(this.primaryNavigationLinks); return;} //cache

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
         * Returns an array of collection items gathered from the secondary navigation on bras/all-collections.
         * Filters out "All Collections" and "About Our Collections"
         * @return - [
         *  {
         *      name: "Fabulous by Victoria's Secret",
         *      href: "http://www.victoriassecret.com/bras/fabulous-by-victorias-secret-collection"
         *  },
         *  ...
         * ]
         *
        */
        getCollections: function(callback){
            if(this.collections){callback(this.collections); return;} //cache
            this.collections = [];

            vsRequestUsingPhantomJs("bras/all-collections", function(){
                var $navItems = $('#nav-secondary > ul.menu > li');
                var collectionsResult = [];
                console.log('$navItems length is: ' + $navItems.length);
                $navItems.each(function(i, item){
                    var $item = $(item);
                    var $navSections = $item.find('> h3 > span');
                    $navSections.each(function(x, navSectionTitle){
                        var $navSectionTitle = $(navSectionTitle);
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

        },

        /**
         * Calls the vs webservice at www.victoriassecret.com/bras/all-collections/facet
         * @param callback - function which takes 1 param representing the facets for all collections
         * @return -
         *  {"facets":
         *      {
         *          "Size":{
         *              "30A":{
         *                  "displayValue":"30A",
         *                  "swatchName":null,
         *                  "productCount":1
         *              },
         *              "30B":{
         *                  "displayValue":"30B",
         *                  "swatchName":null,
         *                  "productCount":2
         *              },
         *              ...
         *           }
         */
        getAllCollectionFacets: function(callback){
            if(this.facets){callback(this.facets); return;}
            this.facets = [];
            vsServiceRequest("/bras/all-collections/facet", "GET", function(result, error){
                if(error){ console.log('error in getAllCollectionFacets: ' + error); callback(error); return;}
                this.facets = result;
                callback(this.facets);
            }.bind(this));
        },

        /**
         * Returns an array of products representing all the products found on http://www.victoriassecret.com/bras/all-collections.
         * Uses bras/all-collections/more to retrieve all products at the same time.
         * Filters out any special features (e.g. the ad at the beginning)
         * @param callback
         * @return -
         *  {"products":[
         *      {
         *          "name":" Perfect Shape Bra ",
         *          "priceRange":"$48.50 - $58.50 ",
         *          "link":"/bras/all-collections/perfect-shape-bra-body-by-victoria?ProductID=149560&CatalogueType=OLS",
         *          "imgSrc":"//dm.victoriassecret.com/product/176x235/V378729_FC_BC_CROP1.jpg",
         *          "collectionName":"NEW! Body by Victoria",
         *          "colors":"16 Colors"
         *      },
         *      ...
         *    ]
         *  }
         */
        getAllCollectionProducts: function(callback){
            if(this.collectionProducts){callback(this.collectionProducts); return;}//cache
            this.collectionProducts = [];
            //request all the products using the 'more' functionality.
            vsRequestUsingJsdom("bras/all-collections/more?increment=280&location=0&sortby=REC", function($, window, error){
                if(error){ callback(error); return;}

                //@param rangeText -
                //  "$48.50 - $58.50 & $12.50 - $14.50 or Special 3/$33"
                //  "$48.50 - $58.50"
                //@return [
                // {
                //   lowText: '48.50',
                //   highText: '58.50',
                //   high: 58.5,
                //   low: 48.5,
                //   text: "$48.50 - $58.50",
                //   isSpecial: false
                // },
                // ...
                //]
                function parsePriceRanges(rangeText){
                    var result = [];//e.g. [{low:0, high:0, text:rangeText}];
                    var orSplit = rangeText.split("or");
                    for(var x=0; x < orSplit.length; ++x){
                        var orItem = orSplit[x];
                        var andSplit = orItem.split("&");
                        for(var i=0; i < andSplit.length; ++i){
                            var andItem = andSplit[i];
                            var parsedPriceRange = parsePriceRange(andItem);
                            result.push(parsedPriceRange);
                        }
                    }
                    return result;
                }

                //@param rangeText -
                //  "$48.50 - $58.50"
                //  "Special 3/$33"  <-- would return all nulls except text and isSpecial === true
                //@return {
                //  lowText: '48.50',
                //  low: 48.5,
                //  highText: '58.50',
                //  high: 58.5,
                //  text: '$48.50 - $58.50',
                //  isSpecial: false
                //}
                function parsePriceRange(rangeText){
                    var result = {low:null, high:null, lowText:null, highText:null, isSpecial: false, text:rangeText.trim()};
                    var dashSplit = rangeText.split("-");
                    if(dashSplit.length == 1){
                        //dealing with text like 'Special 3/$33'
                        result.isSpecial = true;
                    }else if(dashSplit.length == 2){
                        //dealing with low - high range.
                        result.lowText = dashSplit[0].replace('$', '').trim();
                        result.highText = dashSplit[1].replace('$', '').trim();
                        result.low = parseFloat(result.lowText);
                        result.high = parseFloat(result.highText);
                    }else{
                        //unknown
                    }
                    return result;
                }

                //@param link - "http://victoriassecret.com/bras/all-collections/push-up-bra-cotton-lingerie?ProductID=139732&CatalogueType=OLS"
                //@result '139732'
                function parseProductId(link){
                    var result = null;
                    var match = link.match(/\?ProductID=(.*?)\&/);
                    if(match && match.length > 1){
                        result = match[1];
                    }
                    return result;
                }

                //iterate over each li product in the body
                $('body > li').each(function(i, product){
                    var $product = $(product);
                    var $productLink = $product.find('> a');

                    //filter out features (e.g. the big ad at the beginning)
                    var $productLink = $product.find('> a');
                    var $linkName = $productLink.attr('name');
                    if($linkName && $linkName.toLowerCase().indexOf(': feature') >= 0) {console.log('-filtered'); return;}

                    var productLink = "http://victoriassecret.com" + $productLink.attr('href');
                    var productImgSrc = $productLink.find('img').attr('data-lazy-asset');
                    var productCollection = $productLink.find('> aside > hgroup > h2').text();
                    var productName = $productLink.find('> aside > hgroup > h3').text();
                    var productPriceRange = '';
                    var productColors = '';
                    $productLink.find('> aside > p').each(function(i, item){
                        if(i == 0){ productPriceRange = $(item).text();}
                        if(i == 1){ productColors = $(item).text();}
                    });

                    var parsedPriceRanges = parsePriceRanges(productPriceRange);
                    var productId = parseProductId(productLink);
                    var productResult={
                        id: productId,
                        name: productName.trim(),
                        priceRanges: parsedPriceRanges,
                        priceRangeText: productPriceRange.trim(),
                        link: productLink,
                        imgSrc: productImgSrc,
                        collectionName: productCollection,
                        colors: productColors
                    };
                    this.collectionProducts.push(productResult);
                    //console.log(productColors);
                }.bind(this));
                callback(this.collectionProducts);
            }.bind(this));
        }

    };

    /**
     * Used to call an existing vs service. (essentially a proxy)
     * @param path - path after vs.com.  e.g. "/bras/all-collections/facet"
     * @param httpMethod - "GET", "POST", etc
     * @param callback - function which takes 1 param representing the json response.
     */
    function vsServiceRequest(path, httpMethod, callback){
        var url = "www.victoriassecret.com";
        //create the request options for the http.request api.
        var requestOptions = {
            hostname: url,
            port: 80,
            path: path,
            method: httpMethod,
            headers:{
                Host:'www.victoriassecret.com',
                Referer:'http://www.victoriassecret.com/bras/all-collections',
                'connection': 'keep-alive',  //'close' or 'keep-alive'
                "User-Agent": chromeUserAgent    //vs blows up if user agent isnt sent.
            }
        };

        //initiate the request
        var req = http.request(requestOptions, function(res) {
            //console.log(res);
            console.log('statusCode: ' + res.statusCode);
            var output = '';
            res.on('data', function (chunk) {
                output += chunk;
            });
            res.on('end', function() {
                console.log('response end. building json');//+ output
                var obj = JSON.parse(output);
                callback(obj);
            });
        });

        req.on('error', function(e) {
            console.log('request error');
            //e.message
            callback(null, e.message);
        });

        req.end();
    }

    /**
     * Requests the given path, executes the evaluateFunction, and calls the callback passing the return value of the evaluate function
     *
     * NOTE!: try using vsRequestViaJsdom first (it is 3x faster). It can be buggy depending on the site, so revert to this when you don't get expected results.
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
    function vsRequestUsingPhantomJs(path, evaluateFunction, callback){
        var uri = "http://www.victoriassecret.com/" + path;
        //http://snippets.aktagon.com/snippets/534-how-to-scrape-web-pages-with-phantomjs-and-jquery
        //http://net.tutsplus.com/tutorials/javascript-ajax/web-scraping-with-node-js/
        phantom.create(function(ph){
            ph.createPage(function(page){
                //allow any logs that are written by the page, or by the evaluateFunction, to be written to the terminal.
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
     *
     * NOTE!: due to jsdom's strict html/xml parsing, sites with invalid html can lead to incorrect query results (e.g. getting 3 elements back instead of 9)
     *      use vsRequestUsingPhantomJs (phantomjs) when this function fails you.
     * @param path - eg. "bras" "bras/all-collections"... use "" for home
     * @param callback - function taking params ($, window, error)
     *
     * TODO: use connection keep-alive
     */
    function vsRequestUsingJsdom(path, callback){
        var uri = "http://www.victoriassecret.com/" + path;

        request({
            uri : uri,
            //vs 403s if you do not have certain headers (probably user agent)
            headers:{
                //"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                //"Cache-Control": "no-cache",
                "User-Agent": chromeUserAgent
            }
        }, function (error, response, body) {
            jsdom.env({
                html: body,
                src: [jquery], //use file read from disk rather than make a http request every time.
                //scripts: ['http://codeorigin.jquery.com/jquery-1.10.2.min.js'], //needed so we can query the dom.
                done: function(err, window){
                    var $ = window.jQuery;
                    console.log(error);
                    //console.log(body);
                    callback($, window, error);
                }
            });
        });
    }

    return vsModel;
};