module.exports = function(app){
    //http://liamkaufman.com/blog/2012/03/08/scraping-web-pages-with-jquery-nodejs-and-jsdom/
    var jsdom  = require('jsdom');
    var fs     = require('fs');
    var request = require('request');
   // var jquery = fs.readFileSync("../src/js/lib-third-party/jquery.js").toString();
    var vsModel = require('./vsModel')();
    /**
     * Returns a json object with primary navigation links, which are created by going to the home page and
     * parsing each anchor's href under #nav-primary > ul > li
     * @return - {
     *      primaryNavigationLinks: [
     *          "http://www.victoriassecret.com/bras",
     *          "http://www.victoriassecret.com/panties",
     *          "http://www.victoriassecret.com/sleepwear"
     *      ]
     * }
     */
    app.get('/vsscrape/navigation/primary', function(req, res){
        var result = {
            primaryNavigationLinks : []
        };
        vsModel.getPrimaryNavigationLinks(function(primaryNavigationLinks){
            result.primaryNavigationLinks = primaryNavigationLinks;
            res.json(result);
        });
    });

    app.get('/vsscrape/collections/list', function(req, res){
        var result = {
            collections : []
        };
        vsModel.getCollections(function(collections){
            result.collections = collections;
            res.json(result);
        });
    });




};