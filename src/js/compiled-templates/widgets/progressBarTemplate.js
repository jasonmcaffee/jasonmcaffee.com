define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("progressBarTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['progressBarTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<div id=\"progressBarBackground\" class=\"progress-bar-background\">\n    <div id=\"progressBar\" class=\"progress-bar\" style=\"width: ";
  foundHelper = helpers.percentageLoadedString;
  stack1 = foundHelper || depth0.percentageLoadedString;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "percentageLoadedString", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">&nbsp;</div>\n\n</div>\n<div id=\"progressText\" class=\"progress-text\">";
  foundHelper = helpers.percentageLoadedString;
  stack1 = foundHelper || depth0.percentageLoadedString;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "percentageLoadedString", { hash: {} }); }
  buffer += escapeExpression(stack1) + " </div>";
  return buffer;}); 
Handlebars.registerPartial("progressBarTemplate", templates["progressBarTemplate"]); 
return templates["progressBarTemplate"]; 
});