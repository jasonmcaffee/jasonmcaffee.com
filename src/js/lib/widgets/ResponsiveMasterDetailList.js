define([
    'core/util/log',
    'backbone',
    'jquery',
    'compiled-templates/widgets/responsiveMasterDetailListTemplate' //this is for dependency management only. will not be used directly by this module.
], function(log, Backbone, $, responsiveMasterDetailListTemplate){

    var ResponsiveMasterDetailList = Backbone.View.extend({
        el:'', //must be specified by view using this widget.
        initialize : function(){
            log('ResponsiveMasterDetailList.initialize called.');

        },
        render: function(){
            //we shouldnt need render, as the template will be called
        },
        showDetail: function(){

        }
    });

    return ResponsiveMasterDetailList;
});