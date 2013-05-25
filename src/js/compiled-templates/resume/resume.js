define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("resume precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['resume'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p>";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n            ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <div class=\"employment-section-item\">\n            ";
  buffer += "\n            <ul>\n                <li>";
  foundHelper = helpers.title;
  stack1 = foundHelper || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</li><!--\n                --><li>";
  foundHelper = helpers.employer;
  stack1 = foundHelper || depth0.employer;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "employer", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</li><!--\n                --><li>";
  foundHelper = helpers.date;
  stack1 = foundHelper || depth0.date;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "date", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</li>\n            </ul>\n\n            ";
  foundHelper = helpers.summary;
  stack1 = foundHelper || depth0.summary;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.paragraphs);
  stack2 = helpers.each;
  tmp1 = self.program(4, program4, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n            ";
  buffer += "\n            <dl>\n                <!--\n                ";
  foundHelper = helpers.primarySkills;
  stack1 = foundHelper || depth0.primarySkills;
  stack2 = helpers.each;
  tmp1 = self.program(6, program6, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                -->\n            </dl>\n\n            ";
  buffer += "\n            <dl>\n                ";
  foundHelper = helpers.toolsAndLibs;
  stack1 = foundHelper || depth0.toolsAndLibs;
  stack2 = helpers.each;
  tmp1 = self.program(8, program8, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </dl>\n\n        </div>\n        ";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p>\n                ";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n            </p>\n            ";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    --><dt>";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</dt><!--\n                ";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <dt>";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</dt>\n                ";
  return buffer;}

function program10(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <div>\n            <h3>";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h3>\n            ";
  foundHelper = helpers.summary;
  stack1 = foundHelper || depth0.summary;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.paragraphs);
  stack2 = helpers.each;
  tmp1 = self.program(11, program11, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        ";
  return buffer;}
function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <p>";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n            ";
  return buffer;}

function program13(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <div>\n            <h3>";
  foundHelper = helpers.name;
  stack1 = foundHelper || depth0.name;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h3>\n            ";
  foundHelper = helpers.summary;
  stack1 = foundHelper || depth0.summary;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.links);
  stack2 = helpers.each;
  tmp1 = self.program(14, program14, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  foundHelper = helpers.summary;
  stack1 = foundHelper || depth0.summary;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.paragraphs);
  stack2 = helpers.each;
  tmp1 = self.program(16, program16, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        ";
  return buffer;}
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <a href=\"";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a>\n            ";
  return buffer;}

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p>";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</p>\n            ";
  return buffer;}

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div>";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n            ";
  return buffer;}

  buffer += "<div id=\"resume-page\" class=\"scroll-page\">\n    <!--<a href=\"#blogs\">blogs</a>-->\n    <div class=\"header\">\n\n        ";
  buffer += "\n        <div>\n            <img src=\"images/face-with-blue-dot.png\">\n        </div>\n\n        ";
  buffer += "\n        <div>\n            <h1>Jason McAffee </h1>\n            <ul>\n                <li>jasonlmcaffee@gmail.com</li><!--\n                --><li>614 915 8198</li>\n            </ul>\n        </div>\n    </div>\n\n    <div class=\"download-and-contact\">\n        <ul>\n            <li>\n                <a href=\"downloads/jason_mcaffee_resume.doc\" class=\"icon-download-alt\"></a>\n            </li><!--\n         --><li>\n                <a href=\"http://www.linkedin.com/pub/jason-mcaffee/66/503/854\" class=\"icon-linkedin-sign\">\n                    ";
  buffer += "\n                </a>\n            </li><!--\n         --><li>\n                <a href=\"http://www.github.com/jasonmcaffee\" class=\"icon-github-alt\"></a>\n            </li><!--\n        --><li>\n                <a href=\"mailto:jasonlmcaffee@gmail.com\" class=\"icon-envelope-alt\"></a>\n            </li><!--\n        --><li>\n                <a href=\"tel:+1-614-915-8198\" class=\"icon-phone\"></a>\n            </li>\n        </ul>\n    </div>\n\n    ";
  buffer += "\n    <div class=\"summary-section\">\n        <h2>Summary</h2>\n        <hr/>\n        <div>\n            ";
  foundHelper = helpers.summary;
  stack1 = foundHelper || depth0.summary;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.paragraphs);
  stack2 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n    ";
  buffer += "\n    <div class=\"employment-section\">\n        <h2>Employment</h2>\n        <hr/>\n\n        ";
  foundHelper = helpers.employment;
  stack1 = foundHelper || depth0.employment;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.items);
  stack2 = helpers.each;
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n    ";
  buffer += "\n    <div class=\"work-projects-section\">\n        <h2>Work Projects</h2>\n        <hr/>\n\n        ";
  buffer += "\n        ";
  foundHelper = helpers.workProjects;
  stack1 = foundHelper || depth0.workProjects;
  stack2 = helpers.each;
  tmp1 = self.program(10, program10, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n    ";
  buffer += "\n    <div class=\"personal-projects-section\">\n        <h2>Personal Projects</h2>\n        <hr/>\n\n        ";
  buffer += "\n        ";
  foundHelper = helpers.personalProjects;
  stack1 = foundHelper || depth0.personalProjects;
  stack2 = helpers.each;
  tmp1 = self.program(13, program13, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n    ";
  buffer += "\n    <div class=\"education-section\">\n        <h2>Education</h2>\n        <hr/>\n        <div>\n            <div>";
  foundHelper = helpers.education;
  stack1 = foundHelper || depth0.education;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.degree);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "education.degree", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n            <div>\n                <div>";
  foundHelper = helpers.education;
  stack1 = foundHelper || depth0.education;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.gpa);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "education.gpa", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n                <div>";
  foundHelper = helpers.education;
  stack1 = foundHelper || depth0.education;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.school);
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "education.school", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</div>\n            </div>\n        </div>\n    </div>\n\n    ";
  buffer += "\n    <div class=\"certifications-section\">\n        <h2>Certifications</h2>\n        <hr/>\n        <div>\n            ";
  foundHelper = helpers.certifications;
  stack1 = foundHelper || depth0.certifications;
  stack2 = helpers.each;
  tmp1 = self.program(18, program18, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n</div>";
  return buffer;}); 
Handlebars.registerPartial("resume", templates["resume"]); 
return templates["resume"]; 
});