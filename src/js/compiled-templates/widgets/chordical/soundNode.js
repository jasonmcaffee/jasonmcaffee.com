define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("soundNode precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['soundNode'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <option value=\"";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</option>\n        ";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n        gain\n    ";}

  buffer += "<div class=\"sound-node\">\n    <h4>sound node</h4>\n\n    <label>Node Type</label>\n    <select name=\"nodeType\">\n        ";
  foundHelper = helpers.typeOptions;
  stack1 = foundHelper || depth0.typeOptions;
  stack2 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </select>\n\n    ";
  foundHelper = helpers.type;
  stack1 = foundHelper || depth0.type;
  stack2 = {};
  stack3 = "gain";
  stack2['compare'] = stack3;
  foundHelper = helpers.if_eq;
  stack3 = foundHelper || depth0.if_eq;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = stack2;
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;}); 
Handlebars.registerPartial("soundNode", templates["soundNode"]); 
return templates["soundNode"]; 
});