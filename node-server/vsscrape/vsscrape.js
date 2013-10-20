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
    app.get('/scrape/vs/collections/all/facets', function(req, res){
        var result = {
            facets: {}
        };
        vsModel.getAllCollectionFacets(function(facets){
            result.facets = facets;
            res.json(result);
        });
    });




};