define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("demosHomePageTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['demosHomePageTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"demos-page\">\n    <h2>Demos</h2>\n\n    <ul id=\"demoLinksList\">\n        <li>\n            <a href=\"#demos/buttonsDemo\">Buttons Demo</a>\n        </li>\n        <li>\n            <a href=\"#demos/responsiveDemo\">Responsive Demo</a>\n        </li>\n        <li>\n            <a href=\"#demos/responsiveFlexBoxDemo\">Responsive Flex Box Demo</a>\n        </li>\n    </ul>\n\n</div>";}); 
Handlebars.registerPartial("demosHomePageTemplate", templates["demosHomePageTemplate"]); 
return templates["demosHomePageTemplate"]; 
});