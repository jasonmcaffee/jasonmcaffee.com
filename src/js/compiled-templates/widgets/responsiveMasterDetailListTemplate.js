define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("responsiveMasterDetailListTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['responsiveMasterDetailListTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<ul id=\"masterList\">\n    <li>Item 1</li>\n    <li>Item 2</li>\n    <li>Item 3</li>\n</ul>\n\n<ul id=\"detailList\">\n    <li>Detail 1</li>\n    <li>Detail 2</li>\n    <li>Detail 3</li>\n</ul>";}); 
Handlebars.registerPartial("responsiveMasterDetailListTemplate", templates["responsiveMasterDetailListTemplate"]); 
return templates["responsiveMasterDetailListTemplate"]; 
});