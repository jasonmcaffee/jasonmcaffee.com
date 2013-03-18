define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("homePageTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['homePageTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div class=\"home-page\">\n\n   <h1>Strapkit</h1>\n    <p>\n        Strapkit is:\n        <ul>\n            <li>Build</li>\n            <li>Structure</li>\n            <li>Javascript API Framework - Backbone, Require, Handlebars, Modernizr</li>\n            <li>CSS API Framework</li>\n        </ul>\n\n    </p>\n\n</div>";}); 
Handlebars.registerPartial("homePageTemplate", templates["homePageTemplate"]); 
return templates["homePageTemplate"]; 
});