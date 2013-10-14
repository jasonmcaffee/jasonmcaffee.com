define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("chordical precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['chordical'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", foundHelper, self=this;


  buffer += "<link href=\"images/chordical/chordical-favicon.png\" rel=\"shortcut icon\" type=\"image/png\">\n\n<div id=\"chordical-page\">\n    <header>\n        <div class=\"logo\">\n            <img src=\"/images/chordical/logo.png\">\n        </div><!--\n        --><div class=\"menu\"><!--\n        --><div class=\"menu-item-left\">&nbsp;</div>\n            <div class=\"menu-item\"><div class=\"link\"><a href=\"#chordical/edit\"><img src=\"/images/chordical/menu-icon-layout.png\"/></a></div></div><!--\n        --><div class=\"menu-item\"><div class=\"link\"><a href=\"#chordical/instrument\"><img src=\"/images/chordical/menu-icon-instrument.png\"/></a></div></div><!--\n        --><div class=\"menu-item\"><div class=\"link\"><a href=\"#chordical/instrument\"><img src=\"/images/chordical/menu-icon-record.png\"/></a></div></div><!--\n        --><div class=\"menu-item\"><div class=\"link\"><a href=\"#chordical/instrument\"><img src=\"/images/chordical/menu-icon-tools.png\"/></a></div></div>\n        </div>\n    </header>\n\n\n\n    ";
  buffer += "\n    <div id=\"keyboardContainer\">\n    </div>\n\n\n</div>";
  return buffer;}); 
Handlebars.registerPartial("chordical", templates["chordical"]); 
return templates["chordical"]; 
});