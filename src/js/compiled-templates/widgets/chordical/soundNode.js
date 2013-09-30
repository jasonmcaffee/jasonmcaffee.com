define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("soundNode precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['soundNode'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, stack3;
  buffer += "\n            <option value=\"";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" ";
  foundHelper = helpers.selectedNodeType;
  stack1 = foundHelper || depth1.selectedNodeType;
  stack2 = depth0;
  foundHelper = helpers.if_conditional;
  stack3 = foundHelper || depth0.if_conditional;
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</option>\n        ";
  return buffer;}
function program2(depth0,data) {
  
  
  return "selected";}

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div>\n            <label>Amount</label>\n            <input name=\"gain.amount\" type=\"range\" min=\"0\" max=\"1\" step=\"0.1\" value=\"";
  foundHelper = helpers.gain;
  stack1 = foundHelper || depth0.gain;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.amount);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "gain.amount", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n        </div>\n    ";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div>\n        <label>Amount</label>\n        <input name=\"delay.delayTime\" type=\"range\" min=\"0\" max=\"10\" step=\"0.1\" value=\"";
  foundHelper = helpers.delay;
  stack1 = foundHelper || depth0.delay;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.delayTime);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "delay.delayTime", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n    </div>\n    ";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div>\n            <label>Left Right</label>\n            <input name=\"pan.amount\" type=\"range\" min=\"-45\" max=\"45\" step=\"1\" value=\"";
  foundHelper = helpers.pan;
  stack1 = foundHelper || depth0.pan;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.amount);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "pan.amount", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">\n        </div>\n    ";
  return buffer;}

  buffer += "<div class=\"sound-node\">\n    <h4>sound node</h4>\n\n    <label>Node Type</label>\n    <select name=\"selectedNodeType\">\n        ";
  foundHelper = helpers.typeOptions;
  stack1 = foundHelper || depth0.typeOptions;
  stack2 = helpers.each;
  tmp1 = self.programWithDepth(program1, data, depth0);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </select>\n\n    ";
  foundHelper = helpers.selectedNodeType;
  stack1 = foundHelper || depth0.selectedNodeType;
  stack2 = {};
  stack3 = "gain";
  stack2['compare'] = stack3;
  foundHelper = helpers.if_eq;
  stack3 = foundHelper || depth0.if_eq;
  tmp1 = self.program(4, program4, data);
  tmp1.hash = stack2;
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  foundHelper = helpers.selectedNodeType;
  stack1 = foundHelper || depth0.selectedNodeType;
  stack2 = {};
  stack3 = "delay";
  stack2['compare'] = stack3;
  foundHelper = helpers.if_eq;
  stack3 = foundHelper || depth0.if_eq;
  tmp1 = self.program(6, program6, data);
  tmp1.hash = stack2;
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  foundHelper = helpers.selectedNodeType;
  stack1 = foundHelper || depth0.selectedNodeType;
  stack2 = {};
  stack3 = "panner";
  stack2['compare'] = stack3;
  foundHelper = helpers.if_eq;
  stack3 = foundHelper || depth0.if_eq;
  tmp1 = self.program(8, program8, data);
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