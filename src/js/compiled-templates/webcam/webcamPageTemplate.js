define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("webcamPageTemplate precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['webcamPageTemplate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, foundHelper, self=this;


  buffer += "<div id=\"webcamPage\">\n\n    <div class=\"container-fluid main-containing-column\">\n        <!-- header -->\n        <div class=\"header\">\n\n            <div class=\"header-top-white\">\n                <!-- banner-->\n                <div class=\"header-blue-banner\"></div>\n            </div>\n\n            <!-- logo -->\n            <img alt=\"aptjs logo\" class=\"aptjs-logo\" src=\"images/jasonMcAffeeLabsLogo.png\">\n\n        </div>\n\n\n        <!-- main content below header -->\n        <div class=\"main-content-below-header\">\n\n            <hr class=\"fancy-horizontal-rule\"/>\n\n            <!-- pages ===================================================================-->\n\n            <!-- report page -->\n            <div id=\"mainPage\" class=\"page\">\n                <h1>Take a Picture and Upload It</h1>\n\n\n                <form id=\"fileUploadForm\" action=\"webcam/uploadImage\" method=\"post\" enctype=\"multipart/form-data\">\n                    <input name=\"userImage\" type=\"file\" accept=\"image/*;capture=camera\" capture=\"camera\" id=\"captureInput\" class=\"camera-input\">\n\n                    <button type=\"submit\" class=\"btn btn-primary\">submit</button>\n\n                    <br>\n                    <!-- progress bar -->\n                    <div id=\"progressBarContainer\" class=\"progress-bar-container\"></div>\n                </form>\n\n                <div id=\"recentlyUploadedImagesContainer\" class=\"recently-uploaded-images-container\">\n                    ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.images, 'images', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n            </div>\n\n            <hr class=\"fancy-horizontal-rule\"/>\n        </div>\n\n    </div>\n</div>";
  return buffer;}); 
Handlebars.registerPartial("webcamPageTemplate", templates["webcamPageTemplate"]); 
return templates["webcamPageTemplate"]; 
});