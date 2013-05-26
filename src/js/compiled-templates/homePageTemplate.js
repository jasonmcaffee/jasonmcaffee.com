define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("homePageTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['homePageTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "\n<!-- navigation --------------------------------------------------------------------------------------------------->\n<div class=\"navigation\">\n    <h1>Jason McAffee</h1>\n\n    <ul class=\"navigation-links\">\n        <li>\n            <a href=\"#\" class=\"selected\" scrollTo=\"#photosSection\">PHOTOS</a>\n        </li>\n        <li>\n            <a href=\"#resume\">RESUME</a>\n        </li>\n        <li>\n            <a href=\"#\" scrollTo=\"#labsSection\">LABS</a>\n        </li>\n        <li>\n            <a href=\"#\" scrollTo=\"#musicSection\">MUSIC</a>\n        </li>\n        <li>\n            <a href=\"http://codeceratops.jasonmcaffee.com/\">BLOG</a>\n        </li>\n    </ul>\n</div>\n\n<div id=\"homePage\">\n    <!-- photos ---------------------------------------------->\n    <div id=\"photosSection\" class=\"home-section\">\n        <div class=\"home-background home-background-1\">\n            <img src=\"images/photos/home1.jpg\" alt=\"caves\"/>\n        </div>\n\n        <div class=\"home-section-content\">\n            <h1>Stuff</h1>\n\n            <div class=\"home-section-tile\">\n                <a href=\"http://www.jasonmcaffee.com\">Old Photo Site</a>\n            </div>\n\n        </div>\n\n    </div>\n\n    <div id=\"labsSection\" class=\"home-section\">\n        <div class=\"home-background home-background-2\">\n            <img src=\"images/photos/home2.jpg\" alt=\"blue\"/>\n        </div>\n\n        <div class=\"home-section-content\">\n            <h1>Stuff</h1>\n\n            <div class=\"home-section-tile\">\n                <a href=\"#threejs\">\n                    WebGL LAB\n                    <img src=\"images/thumbnails/webgl-screenshot.jpg\" alt=\"webgl screenshot\"/>\n                </a>\n            </div>\n\n            <div class=\"home-section-tile\">\n                <a href=\"#webcam\">\n                    Webcam\n                    <img src=\"images/thumbnails/webcam-screenshot.jpg\" alt=\"webcam screenshot\"/>\n                </a>\n            </div>\n\n            <div class=\"home-section-tile\">\n                <a href=\"http://jasonmcaffee.com/uiDesignTools/index.html\">\n                    Webcam\n                    <img src=\"images/thumbnails/uidesigntools-screenshot.jpg\" alt=\"ui design tools screenshot\"/>\n                </a>\n            </div>\n\n        </div>\n\n    </div>\n\n    <div id=\"musicSection\" class=\"home-section\">\n        <div class=\"home-background home-background-3\">\n            <img src=\"images/photos/home3.jpg\" alt=\"blue\"/>\n        </div>\n\n        <div class=\"home-section-content\">\n            <h1>Stuff</h1>\n\n            <div class=\"home-section-tile\">\n                <a href=\"http://music.jasonmcaffee.com\">\n                    Music Library\n                    <img src=\"images/thumbnails/music-screenshot.jpg\" alt=\"webgl screenshot\"/>\n                </a>\n            </div>\n\n            <div class=\"home-section-tile\">\n                <a href=\"http://www.jasonmcaffee.com/bobmcaffee\">\n                    Bob McAffee\n                    <img src=\"images/thumbnails/bobmcaffee-screenshot.jpg\" alt=\"bobmcaffee screenshot\"/>\n                </a>\n            </div>\n\n            <div class=\"home-section-tile\">\n                <a href=\"http://www.jasonmcaffee.com/bobmcaffee\">\n                    iTunes - White Noise Album\n                    <img src=\"images/thumbnails/bobmcaffee-screenshot.jpg\" alt=\"bobmcaffee screenshot\"/>\n                </a>\n            </div>\n\n        </div>\n\n    </div>\n\n</div>\n\n\n";}); 
Handlebars.registerPartial("homePageTemplate", templates["homePageTemplate"]); 
return templates["homePageTemplate"]; 
});