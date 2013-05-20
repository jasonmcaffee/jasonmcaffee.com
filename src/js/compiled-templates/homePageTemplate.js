define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("homePageTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['homePageTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<img class=\"clouds-background\" src=\"images/clouds_medium.jpg\" alt=\"clouds and blue sky\"/>\n\n<div class=\"transparent-white-background\">\n    &nbsp;\n</div>\n<div id=\"homePage\">\n    &nbsp;\n</div>\n\n<div class=\"layer-1\">\n    <div class=\"layer-2\">\n        <div class=\"layer-2a\">\n            <h1>Jason McAffee</h1>\n\n            <ul id=\"home-links\">\n                <li>\n                    <a href=\"#resume\">Resume</a>\n                </li>\n                <li>\n                    <a href=\"#threejs\">WebGL Minecraft Demo</a>\n                </li>\n                <li>\n                    <a href=\"http://www.jasonmcaffee.com\">Photography</a>\n                </li>\n                <li>\n                    <a href=\"http://music.jasonmcaffee.com\">Music App</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n\n</div>";}); 
Handlebars.registerPartial("homePageTemplate", templates["homePageTemplate"]); 
return templates["homePageTemplate"]; 
});