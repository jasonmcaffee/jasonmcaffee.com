define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("cell precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['cell'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"note\" note=\"";
  stack1 = depth0.propertyName;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.propertyName", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.propertyName;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.propertyName", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n";
  return buffer;}

  foundHelper = helpers.editMode;
  stack1 = foundHelper || depth0.editMode;
  stack2 = helpers['if'];
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}); 
Handlebars.registerPartial("cell", templates["cell"]); 
return templates["cell"]; 
});