module.exports = function(app){
    //http://liamkaufman.com/blog/2012/03/08/scraping-web-pages-with-jquery-nodejs-and-jsdom/
    var jsdom  = require('jsdom');
    var fs     = require('fs');
    var request = require('request');
   // var jquery = fs.readFileSync("../src/js/lib-third-party/jquery.js").toString();

    app.get('/vsscrape/navigation/primary', function(req, res){
        var result = {
            primaryNavigationLinks : []
        };

        vsRequest("", function ($, window, error) {
            $('#nav-primary > ul > li a').each(function(i, item){
                var link = $(item).attr('href');
                result.primaryNavigationLinks.push(link);
            });

            res.json(result);
        });
    });

    function vsRequest(path, callback){
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
                scripts: ['http://code.jquery.com/jquery-1.6.min.js'],
                done: function(err, window){
                    var $ = window.jQuery;
                    console.log(body);
                    console.log("there have been", window.$("a").length, "nodejs releases!");
                    callback($, window, error);
                }
            });
        });
    }
};