module.exports = function(app){
    //http://liamkaufman.com/blog/2012/03/08/scraping-web-pages-with-jquery-nodejs-and-jsdom/
    var jsdom  = require('jsdom');
    var fs     = require('fs');
    var request = require('request');
   // var jquery = fs.readFileSync("../src/js/lib-third-party/jquery.js").toString();
    var vsModel = require('./vsModel')();

    /**
     * Allow any site to cross site script our services.
     * i.e. any domain can call these services without the browser's security blocking the request.
     */
    app.get('/scrape/*',function(req,res,next){
        res.header('Access-Control-Allow-Origin' , '*');
        next(); // http://expressjs.com/guide.html#passing-route control
    });

    /**
     * Returns a json object with primary navigation links, which are created by going to the home page and
     * parsing each anchor's href under #nav-primary > ul > li
     * @url - http://labs.jasonmcaffee.com/scrape/vs/navigation/primary/list
     * @return - {
     *      primaryNavigationLinks: [
     *          "http://www.victoriassecret.com/bras",
     *          "http://www.victoriassecret.com/panties",
     *          "http://www.victoriassecret.com/sleepwear",
     *          ...
     *      ]
     * }
     */
    app.get('/scrape/vs/navigation/primary/list', function(req, res){
        var result = {
            primaryNavigationLinks : []
        };
        vsModel.getPrimaryNavigationLinks(function(primaryNavigationLinks){
            result.primaryNavigationLinks = primaryNavigationLinks;
            res.json(result);
        });
    });

    /**
     * Returns an array of all collections
     * @url - http://labs.jasonmcaffee.com/scrape/vs/collections/list
     * @return - {
     *  "collections":[
     *      {
     *          "href":"http://www.victoriassecret.com/bras/very-sexy",
     *          "name":" Very Sexy "
     *      }, ...
     *  ]
     * }
     */
    app.get('/scrape/vs/collections/list', function(req, res){
        var result = {
            collections : []
        };
        vsModel.getCollections(function(collections){
            result.collections = collections;
            res.json(result);
        });
    });

    /**
     * Returns all collection facets.
     * @url - http://labs.jasonmcaffee.com/scrape/vs/collections/all/facets
     * @return -
     *  {"facets":{"Size":{"30A":{"displayValue":"30A","swatchName":null,"productCount":1},"30B":{"displayValue":"30B","swatchName":null,"productCount":2},...}
     */
    app.get('/scrape/vs/collections/all/facets/list', function(req, res){
        vsModel.getAllCollectionFacets(function(facets){
            result.facets = facets;
            res.json({
                facets: facets
            });
        });
    });

    /**
     * Returns an array of products representing all the products found on http://www.victoriassecret.com/bras/all-collections.
     * Filters out any special features (e.g. the ad at the beginning)
     * @param callback
     * @return -
     *  {"products":[
     *      {
     *          "name":"Perfect Shape Bra",
     *          "priceRanges":[
     *            {
     *              lowText: '48.50',
     *              highText: '58.50',
     *              high: 58.5,
     *              low: 48.5,
     *              text: "$48.50 - $58.50",
     *              isSpecial: false
     *            },
     *            ...
     *          ],
     *          "priceRangeText":"$48.50 - $58.50",
     *          "link":"/bras/all-collections/perfect-shape-bra-body-by-victoria?ProductID=149560&CatalogueType=OLS",
     *          "imgSrc":"//dm.victoriassecret.com/product/176x235/V378729_FC_BC_CROP1.jpg",
     *          "collectionName":"NEW! Body by Victoria",
     *          "colors":"16 Colors"
     *      },
     *      ...
     *    ]
     *  }
     */
    app.get('/scrape/vs/collections/all/products/list', function(req, res){
        vsModel.getAllCollectionProducts(function(products){
            res.json({
                products: products
            });
        });
    });

    /**
     * Searches realtime (no caching) using the search2.victoriassecret.com page to return an array of found products
     * matching the query
     * @param query - url encoded search query. e.g. "push%20up%20bra"
     * @param callback - callback which takes as a parameter the return value (array of products)
     * @return
     * [
     *       {
     *         "href": "http://www.victoriassecret.com/bras/our-very-sexy-push-up/push-up-bra-very-sexy?ProductID=148147&CatalogueType=OLS",
     *         "imgSrc": "http://dm.victoriassecret.com/product/220x294/V337174_333.jpg",
     *         "name": "Push-Up Bra",
     *         "priceRangeText": "$48 - $65",
     *         "priceRanges": [
     *           {
     *             "low": 48,
     *             "high": 65,
     *             "lowText": "48",
     *             "highText": "65",
     *             "isSpecial": false,
     *             "text": "$48 - $65"
     *           }
     *         ],
     *         "colors": "More Colors",
     *         "collectionName": "TODO"
     *       },
     *       ...
     * ]
     */
    var queryCache = {};
    app.get('/scrape/vs/product/search/:query', function(req, res){
        var query = req.params.query || 'PANTIES';
        query = query.toLowerCase();
        console.log('query is: ' + query);
        if(queryCache[query]){
            res.json({
                products: queryCache[query]
            })
        }else{
            vsModel.searchProducts(query, (function(q){
                return function(products){
                    res.json({
                        products: products
                    });
                    queryCache[q] = products;
                }
            })(query));
        }
    });


};