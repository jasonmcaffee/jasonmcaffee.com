define(["handlebars", "core/util/log"], function(Handlebars, log){ 
log("imagesTest2 precompiled template function module loaded."); 
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {}; 
templates['imagesTest2'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<div id=\"imageTest2\">\n    <h2>Images Test 2 </h2>\n\n    <img src=\"/images/imageTestDemo/image2/original.jpg\"/>\n    <img src=\"/images/imageTestDemo/image2/high_progressive_60.jpg\"/>\n    <img src=\"/images/imageTestDemo/image2/medium_non-progressive-30.jpg\"/>\n    <img src=\"/images/imageTestDemo/image2/medium_progressive_30.jpg\"/>\n    <img src=\"/images/imageTestDemo/image2/saveas_progressive3_quality6.jpg\"/>\n\n</div>";}); 
Handlebars.registerPartial("imagesTest2", templates["imagesTest2"]); 
return templates["imagesTest2"]; 
});