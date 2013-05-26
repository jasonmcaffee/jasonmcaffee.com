define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("homePageTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['homePageTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "\n<!-- navigation --------------------------------------------------------------------------------------------------->\n<div class=\"navigation\">\n    <h1>Jason McAffee</h1>\n\n    <ul class=\"navigation-links\">\n        <li>\n            <a href=\"#\" class=\"selected\" scrollTo=\"#photosSection\">PHOTOS</a>\n        </li>\n        <li>\n            <a href=\"#resume\">RESUME</a>\n        </li>\n        <li>\n            <a href=\"#\" scrollTo=\"#labsSection\">LABS</a>\n        </li>\n        <li>\n            <a href=\"http://music.jasonmcaffee.com\">MUSIC</a>\n        </li>\n    </ul>\n</div>\n\n<div id=\"homePage\">\n    <!-- photos ---------------------------------------------->\n    <div id=\"photosSection\" class=\"home-section\">\n        <div class=\"home-background home-background-1\">\n            <img src=\"images/photos/home1.jpg\" alt=\"caves\"/>\n        </div>\n\n        <div class=\"home-section-content\">\n            <h1>Stuff</h1>\n\n            <div class=\"home-section-tile\">\n                <a href=\"http://www.jasonmcaffee.com\">Old Photo Site</a>\n            </div>\n\n        </div>\n\n    </div>\n\n    <div id=\"labsSection\" class=\"home-section\">\n        <div class=\"home-background home-background-2\">\n            <img src=\"images/photos/home2.jpg\" alt=\"blue\"/>\n        </div>\n\n        <div class=\"home-section-content\">\n            <h1>Stuff</h1>\n\n            <div class=\"home-section-tile\">\n                <a href=\"#threejs\">WebGL LAB</a>\n            </div>\n\n        </div>\n\n    </div>\n\n</div>\n\n\n";}); 
Handlebars.registerPartial("homePageTemplate", templates["homePageTemplate"]); 
return templates["homePageTemplate"]; 
});