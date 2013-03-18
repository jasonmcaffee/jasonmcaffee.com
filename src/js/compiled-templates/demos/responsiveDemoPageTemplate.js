define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("responsiveDemoPageTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['responsiveDemoPageTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n            <li>\n                <label class=\"master-item-text\" data-index=\"";
  foundHelper = helpers.index;
  stack1 = foundHelper || depth0.index;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "index", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.itemText;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.itemText", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</label>\n\n                <dl id=\"accountDetailLinks\">\n                    ";
  foundHelper = helpers.links;
  stack1 = foundHelper || depth0.links;
  stack2 = helpers.each;
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </dl>\n            </li>\n        ";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <dt>\n                            <a href=\"";
  stack1 = depth0.linkHref;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.linkHref", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.linkText;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.linkText", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n                        </dt>\n                    ";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li>\n                <dl>\n                    <dt>";
  stack1 = depth0.itemText;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.itemText", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</dt>\n                    <dt>";
  stack1 = depth0.itemText2;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.itemText2", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</dt>\n                    <dt>";
  stack1 = depth0.itemText3;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.itemText3", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</dt>\n                </dl>\n\n            </li>\n            ";
  return buffer;}

  buffer += "<div id=\"responsive-page\">\n\n    <h1>Master Detail List</h1>\n\n    <h2>Inline Block Grid</h2>\n    ";
  buffer += "\n    <div id=\"masterDetailListsGrid\">\n        <ul id=\"masterList\">\n        ";
  foundHelper = helpers.masterListItems;
  stack1 = foundHelper || depth0.masterListItems;
  foundHelper = helpers.each_with_index;
  stack2 = foundHelper || depth0.each_with_index;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n\n        <ul id=\"detailList\">\n            ";
  foundHelper = helpers.selectedMasterListItem;
  stack1 = foundHelper || depth0.selectedMasterListItem;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.detailListItems);
  stack2 = helpers.each;
  tmp1 = self.program(4, program4, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    </div>\n\n\n\n</div>";
  return buffer;}); 
Handlebars.registerPartial("responsiveDemoPageTemplate", templates["responsiveDemoPageTemplate"]); 
return templates["responsiveDemoPageTemplate"]; 
});