define([
    'core/core',
    'lib/views/ImagesTest1'
], function(core, ImagesTest1){
    core.log('images controller module loaded');

    var imagePageViewModel = {
        baseImageUrl : '/images/imageTestDemo/',
        images : [
        {title:'Image Set 1', imageSet:[
            {title:'original 33KB', src:'image1/original.jpg'},
            {title:'quality 60 25KB', src:'image1/quality_60.jpg'},
            {title:'quality 60 bicubic sharper 25KB', src:'image1/quality_60_bicubic_sharper.jpg'},
            {title:'high progressive 60 25KB', src:'image1/high_progressive_60.jpg'},
            {title:'quality 50 bicubic sharper 20KB', src:'image1/quality_50_bicubic_sharper.jpg'},
            {title:'medium non progressive 30 16KB', src:'image1/medium_non-progressive_30.jpg'},
            {title:'medium progressive 30 16KB', src:'image1/medium_progressive_30.jpg'}
//            ,
//            {title:'', src:'original.jpg'},
//            {title:'', src:'original.jpg'}
        ]},
        {title:'Image Set 2', imageSet:[
            {title:'original 135KB', src:'image2/original.jpg'},
            {title:'progressive 60 115KB', src:'image2/high_progressive_60.jpg'},
            {title:'quality 60 bicubic sharpen 127KB', src:'image2/quality_60_bicubic_sharpen.jpg'},
            {title:'quality 50 bicubic sharpen 90KB', src:'image2/quality_50_bicubic_sharpen.jpg'},
            {title:'medium non progressive 30 61', src:'image2/medium_non-progressive-30.jpg'},
            {title:'medium progressive 30 53', src:'image2/medium_progressive_30.jpg'},
            {title:'save as progressive: 3, quality 6 152KB', src:'image2/saveas_progressive3_quality6.jpg'}
        ]},
        {title:'Image Set 3', imageSet:[
            {title:'original 205KB', src:'image3/original.jpg'},
            {title:'quality 60 119KB', src:'image3/quality_60.jpg'},
            {title:'quality 60 progressive 119KB', src:'image3/quality_60_progressive.jpg'},
            {title:'quality 60 bicubic sharper 119KB', src:'image3/quality_60_bicubic_sharper.jpg'},
            {title:'quality 50 86KB', src:'image3/quality_50.jpg'},
            {title:'quality 50 bicubic sharper 86KB', src:'image3/quality_50_bicubic_sharper.jpg'},
            //{title:'quality 60 blur .5', src:'image3/quality_60_blur0.5.jpg'},
            {title:'original 205KB', src:'image3/original.jpg'}
        ]},
            {title:'Image Set 4', imageSet:[
                {title:'original 16KB', src:'image4/original.jpg'},
                {title:'quality 60 20KB', src:'image4/quality_60.jpg'},
                {title:'quality 60 bicubic sharper 20KB', src:'image4/quality_60_bicubic_sharper.jpg'},
                {title:'progressive 60 20KB', src:'image4/progressive_60.jpg'},
                {title:'original 16KB', src:'image4/original.jpg'},
                {title:'quality 50 16KB', src:'image4/quality_50.jpg'},
                {title:'quality 50 bicubic sharper 16KB', src:'image4/quality_50_bicubic_sharper.jpg'},
                {title:'quality 50 progressive 16KB', src:'image4/quality_50_progressive.jpg'},
                {title:'original', src:'image4/original.jpg'},
                {title:'quality 40 bicubic sharper 16KB', src:'image4/quality_40_bicubic_sharper.jpg'},
                {title:'quality 35 bicubic sharper 16KB', src:'image4/quality_35_bicubic_sharper.jpg'},
                {title:'quality 30 bicubic sharper 12KB', src:'image4/quality_30_bicubic_sharper.jpg'},
                {title:'quality 40 dpi 66 sharper 12KB', src:'image4/quality_40_dpi_66_sharper.jpg'}
            ]}
    ]};

    var Controller = core.mvc.Controller.extend({
        action:function(controllerName, actionName){
            core.log('images action');

            var imageSetIndex = parseInt(actionName,10) - 1;
            if(imageSetIndex < 0 || imageSetIndex >= imagePageViewModel.images.length){
                alert('no images to display with param: '+ actionName);
                return;
            }

            var images = imagePageViewModel.images[imageSetIndex];
            this.view = new ImagesTest1({model:new core.mvc.Model({
                baseImageUrl: imagePageViewModel.baseImageUrl,
                title: images.title,
                imageSet: images.imageSet,
                navigation: this.buildNavigationLinks(imagePageViewModel)
            })});
            this.view.render();

            core.ui.transitionPage(this.view);
        },
        buildNavigationLinks:function(imageModel){
            var navigation = {links:[]};
            for(var i=0; i<imageModel.images.length; ++i){
                var link = '#images/' + (i + 1);
                var text = '' + (i + 1);
                navigation.links.push({src:link, text:text});
            }
            return navigation;
        }
    });

    return new Controller();//singleton
});