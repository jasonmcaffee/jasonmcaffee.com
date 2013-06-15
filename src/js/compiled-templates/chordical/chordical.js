define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("chordical precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['chordical'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"chordical-page\">\n    <h1>Chordical </h1>\n\n    <div class=\"menu\">\n        <div class=\"link\"><a href=\"#chordical/edit\">edit</a></div><!--\n        --><div class=\"link\"><a href=\"#chordical/sounds\">sounds</a></div>\n    </div>\n\n\n\n    <div id=\"keyboardContainer\">\n\n    </div>\n</div>";}); 
Handlebars.registerPartial("chordical", templates["chordical"]); 
return templates["chordical"]; 
});