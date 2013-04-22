define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("imagesTest1 precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['imagesTest1'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <a href=\"";
  stack1 = depth0.src;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.src", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.text;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.text", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n        ";
  return buffer;}

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"image-set-item\">\n            <h3>";
  foundHelper = helpers.title;
  stack1 = foundHelper || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h3>\n            <img alt=\"";
  foundHelper = helpers.title;
  stack1 = foundHelper || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\" src=\"";
  foundHelper = helpers.baseImageUrl;
  stack1 = foundHelper || depth1.baseImageUrl;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "...baseImageUrl", { hash: {} }); }
  buffer += escapeExpression(stack1);
  foundHelper = helpers.src;
  stack1 = foundHelper || depth0.src;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "src", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"/>\n        </div>\n    ";
  return buffer;}

  buffer += "<div id=\"imageTestPage\">\n    <h2>";
  foundHelper = helpers.title;
  stack1 = foundHelper || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h2>\n\n    <div id=\"navigation\">\n        ";
  foundHelper = helpers.navigation;
  stack1 = foundHelper || depth0.navigation;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.links);
  stack2 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n    ";
  foundHelper = helpers.imageSet;
  stack1 = foundHelper || depth0.imageSet;
  stack2 = helpers.each;
  tmp1 = self.programWithDepth(program3, data, depth0);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</div>";
  return buffer;}); 
Handlebars.registerPartial("imagesTest1", templates["imagesTest1"]); 
return templates["imagesTest1"]; 
});