define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("instrumentEdit precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['instrumentEdit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <option value=\"";
  stack1 = depth0.propertyName;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.propertyName", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.propertyName;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.propertyName", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</option>\n            ";
  return buffer;}

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, stack3;
  buffer += "\n                <option value=\"";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" ";
  foundHelper = helpers.selectedSound;
  stack1 = foundHelper || depth1.selectedSound;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.selectedSubType);
  stack2 = depth0;
  foundHelper = helpers.if_conditional;
  stack3 = foundHelper || depth0.if_conditional;
  tmp1 = self.program(4, program4, data);
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
  buffer += escapeExpression(stack1) + "</option>\n            ";
  return buffer;}
function program4(depth0,data) {
  
  
  return "selected";}

  buffer += "<div id=\"sounds-page\">\n    <h1>Sounds </h1>\n\n    <!-- sampler -->\n    <div id=\"sampleKeyboardContainer\">\n    </div>\n\n    <form action=\"/instrument\" id=\"soundsForm\">\n\n        <select name=\"selectedSound\">\n            ";
  foundHelper = helpers.soundOptions;
  stack1 = foundHelper || depth0.soundOptions;
  foundHelper = helpers.each_property;
  stack2 = foundHelper || depth0.each_property;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </select>\n\n        <select name=\"selectedSound.selectedSubType\">\n            ";
  foundHelper = helpers.selectedSound;
  stack1 = foundHelper || depth0.selectedSound;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.subTypes);
  stack2 = helpers.each;
  tmp1 = self.programWithDepth(program3, data, depth0);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </select>\n\n        <div class=\"add-node-section\">\n            <h3>Add Node</h3>\n            <button id=\"addNodeButton\">Add Node</button>\n        </div>\n\n        <button id=\"logSoundNodesNativeConnection\">Log Native Connection</button>\n\n        <div id=\"soundNodesContainer\" class=\"sound-nodes-section\">\n        </div>\n\n    </form>\n</div>\n\n";
  buffer += "\n";
  buffer += "\n<!--<div id=\"soundNodeContainer";
  stack1 = depth0.uiId;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.uiId", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">sound node.</div>-->\n";
  return buffer;}); 
Handlebars.registerPartial("instrumentEdit", templates["instrumentEdit"]); 
return templates["instrumentEdit"]; 
});