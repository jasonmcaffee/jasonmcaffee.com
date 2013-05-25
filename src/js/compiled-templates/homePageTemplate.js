define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("homePageTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['homePageTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "\n<!-- navigation --------------------------------------------------------------------------------------------------->\n<div class=\"navigation\">\n    <h1>Jason McAffee</h1>\n\n    <ul class=\"navigation-links\">\n        <li>\n            <a href=\"http://www.jasonmcaffee.com\" class=\"selected\">PHOTOS</a>\n        </li>\n        <li>\n            <a href=\"#resume\">RESUME</a>\n        </li>\n        <li>\n            <a href=\"#threejs\">WebGL LAB</a>\n        </li>\n        <li>\n            <a href=\"http://music.jasonmcaffee.com\">MUSIC</a>\n        </li>\n    </ul>\n</div>\n\n<div id=\"homePage\">\n\n\n\n    <!-- photos ---------------------------------------------->\n    <div class=\"home-section\">\n        <div class=\"home-background home-background-1\">\n            <img src=\"images/photos/home1.jpg\" alt=\"caves\"/>\n        </div>\n\n        <div class=\"home-section-content\">\n            <h1>Stuff</h1>\n\n        </div>\n\n    </div>\n\n    <div class=\"home-section\">\n        <div class=\"home-background home-background-2\">\n            <img src=\"images/photos/home2.jpg\" alt=\"caves\"/>\n        </div>\n\n        <div class=\"home-section-content\">\n            <h1>Stuff</h1>\n\n        </div>\n\n    </div>\n\n</div>\n\n\n";}); 
Handlebars.registerPartial("homePageTemplate", templates["homePageTemplate"]); 
return templates["homePageTemplate"]; 
});