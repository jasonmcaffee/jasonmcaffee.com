define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("responsiveFlexBoxDemoPageTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['responsiveFlexBoxDemoPageTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li data-index=\"";
  foundHelper = helpers.index;
  stack1 = foundHelper || depth0.index;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "index", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.itemText;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.itemText", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</li>\n            ";
  return buffer;}

function program3(depth0,data) {
  
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

  buffer += "<div id=\"responsive-page-flex-box\">\n    <h2>Flex Box Grid</h2>\n    ";
  buffer += "\n    <div id=\"masterDetailListsGrid2\">\n        <ul id=\"masterList2\">\n            ";
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
  buffer += "\n        </ul>\n\n        <ul id=\"detailList2\">\n            ";
  foundHelper = helpers.selectedMasterListItem;
  stack1 = foundHelper || depth0.selectedMasterListItem;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.detailListItems);
  stack2 = helpers.each;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    </div>\n</div>";
  return buffer;}); 
Handlebars.registerPartial("responsiveFlexBoxDemoPageTemplate", templates["responsiveFlexBoxDemoPageTemplate"]); 
return templates["responsiveFlexBoxDemoPageTemplate"]; 
});