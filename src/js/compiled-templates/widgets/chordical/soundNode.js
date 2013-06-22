define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("soundNode precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['soundNode'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div class=\"sound-node\">\n    sound node\n</div>";}); 
Handlebars.registerPartial("soundNode", templates["soundNode"]); 
return templates["soundNode"]; 
});