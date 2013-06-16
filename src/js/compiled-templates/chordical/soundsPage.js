define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("soundsPage precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['soundsPage'] = template(function (Handlebars,depth0,helpers,partials,data) {
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

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <option value=\"";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</option>\n            ";
  return buffer;}

  buffer += "<div id=\"sounds-page\">\n    Sounds\n\n    <form action=\"/sounds\" id=\"soundsForm\">\n\n        <select name=\"selectedSound\">\n            ";
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
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </select>\n\n    </form>\n</div>";
  return buffer;}); 
Handlebars.registerPartial("soundsPage", templates["soundsPage"]); 
return templates["soundsPage"]; 
});