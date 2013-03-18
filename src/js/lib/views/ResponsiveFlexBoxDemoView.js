define([
    'core/util/log',
    'backbone',
    'jquery',
    'compiled-templates/demos/responsiveFlexBoxDemoPageTemplate'//,
    // 'lib/widgets/ResponsiveMasterDetailList'
], function(log, Backbone, $, responsiveDemoPageTemplate){
    log('ResponsiveFlexBoxDemoView module loaded.');

    var ResponsiveFlexBoxDemoView = Backbone.View.extend({
        el:'#pages',
        events:{
            "click #masterList2 li" : "masterListItemClick"
        },
        initialize : function(){
            log('ResponsiveFlexBoxDemoView.initialize called.' + this.model);
            var self = this;

            //listen for model updates so we can refresh parts of the view
            this.model.on('change:selectedMasterListItem', function(model, selectedMasterListItem){
                log('model changed! selectedMasterListItem : {0} , 2nd: {1}', selectedMasterListItem.itemText, model.get('selectedMasterListItem').itemText);
                //for now just re render entire view. todo: just refresh the details list
                self.render();
            });

        },
        render: function(){
            log('ResponsiveFlexBoxDemoView.render called.');
            var self = this;
            $(function(){
                //render the template function to the dom
                self.$el.html(responsiveDemoPageTemplate(self.model.toJSON())); //

                //wire up ResponsiveMasterDetailListWidget
            });
        },
        masterListItemClick : function(e){
            var $listItem = $(e.target);
            var index = $listItem.attr('data-index');

            //update the current selected master list item
            //this will trigger the details list to be re-rendered.
            var selectedMasterItem = this.model.get('masterListItems')[index];
            this.model.set({selectedMasterListItem: selectedMasterItem});

            log('selectedMasterItem.detailListItems.length : ' + selectedMasterItem.detailListItems.length);
            log('masterListItemClick : text: {0} index:{1}', $listItem.html(), index);
        }
    });

    return ResponsiveFlexBoxDemoView;
});