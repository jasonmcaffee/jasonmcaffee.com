
define([
    'core/util/log',
    'backbone'
], function(log, Backbone){
    log('ResponsiveDemoView module loaded.');

    var ResponsiveDemoModel = Backbone.Model.extend({
        defaults:{

            masterListItems:[
                {
                    itemText: 'Personal Checking',
                    availableBalance: '13,034.21',
                    presentBalance: '13,211.99',
                    accountMask:'...4325',
                    links:[
                        {linkText:'Activity', linkHref:'#/demos/responsiveDemo'},
                        {linkText:'Statements', linkHref:'#/demos/responsiveDemo'},
                        {linkText:'Pay Bills', linkHref:'#/demos/responsiveDemo'}
                    ],
                    detailListItems:[
                        {itemText:'Get Go', itemText2:'123.45', itemText3:'06/17/12'},
                        {itemText:'Chipotle', itemText2:'9.63', itemText3:'06/17/12' },
                        {itemText:'Time Warner Cable', itemText2:'65.00', itemText3:'06/16/12'},
                        {itemText:"Tom's Diner", itemText2:'94.72', itemText3:'06/16/12'}
                    ]
                },
                {
                    itemText: 'Chase Saphire',
                    detailListItems:[
                        {itemText:'Walgreens', itemText2:'24.75', itemText3:'12/07/13'},
                        {itemText:'YMCA', itemText2:'54.79', itemText3:'12/07/13' },
                        {itemText:'Acura Columbus', itemText2:'243.72', itemText3:'12/07/13'},
                        {itemText:'Restoration Hardware', itemText2:'2,446.04', itemText3:'12/06/13'}
                    ]
                },
                {
                    itemText: 'Chase Freedom',
                    detailListItems:[
                        {itemText:"Cindy's Bakery", itemText2:'12.34', itemText3:'11/12/16'},
                        {itemText:'American Airlines', itemText2:'633.94', itemText3:'11/12/16' },
                        {itemText:"Paco's Tacos", itemText2:'6.56', itemText3:'11/12/16'},
                        {itemText:'Hampton Inn', itemText2:'378.98', itemText3:'11/12/15'}
                    ]
                }
            ],

            //when a user clicks a master list item, this should be set.
            selectedMasterListItem : undefined
        },

        initialize:function(){
            this.attributes.selectedMasterListItem = this.attributes.masterListItems[0];
        }
    });


    return ResponsiveDemoModel;
});