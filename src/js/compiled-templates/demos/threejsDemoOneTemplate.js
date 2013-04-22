define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("threejsDemoOneTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['threejsDemoOneTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"demoOnePage\">\n    <div id=\"controls\">\n        <div id=\"moveForward\">Forward</div>\n        <div id=\"moveBackward\">Backward</div>\n        <div id=\"moveLeft\">Left</div>\n        <div id=\"moveRight\">Right</div>\n        <div id=\"moveUp\">Up</div>\n        <div id=\"moveDown\">Down</div>\n    </div>\n    <div id=\"scene\">\n\n    </div>\n</div>";}); 
Handlebars.registerPartial("threejsDemoOneTemplate", templates["threejsDemoOneTemplate"]); 
return templates["threejsDemoOneTemplate"]; 
});