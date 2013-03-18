define([
    'core/util/log',
    'lib/views/ButtonsDemoView',
    'lib/views/ResponsiveDemoView',
    'lib/views/DemosHomeView',
    'lib/models/ResponsiveDemoModel',
    'lib/views/ResponsiveFlexBoxDemoView'
], function(log, ButtonsDemoView, ResponsiveDemoView, DemosHomeView, ResponsiveDemoModel, ResponsiveFlexBoxDemoView){

    function DemosController(){
        log('DemosController constructor called.');

        //models
        this.responsiveDemoModel = undefined;
        this.responsiveFlexBoxDemoModel = undefined;
        //views
        this.buttonsDemoView = new ButtonsDemoView();
        this.responsiveDemoView = undefined;
        this.responsiveFlexBoxDemoView = undefined;
        this.demosHomeView = new DemosHomeView();

    }

    DemosController.prototype.showButtonsDemoPage = function(){
        log('DemosController.showButtonsDemoPage');
        this.buttonsDemoView.render();
    };

    DemosController.prototype.showResponsiveDemoPage = function(){
        log('DemosController.showResponsiveDemoPage');
        this.getResponsiveDemoView().render();

    };

    DemosController.prototype.showResponsiveFlexBoxDemoPage = function(){
        log('DemosController.showResponsiveFlexBoxDemoPage');
        this.getResponsiveFlexBoxDemoView().render();

    };

    DemosController.prototype.showDemosHomePage = function(){
        log('DemosController.showDemosHomePage');
        this.demosHomeView.render();
    };

    /**
     * Only call after dom is ready. (backbone views won't work in some browsers if created before dom ready)
     * @return {*}
     */
    DemosController.prototype.getResponsiveDemoView = function(){
        if(!this.responsiveDemoView){
            this.responsiveDemoModel = new ResponsiveDemoModel();
            this.responsiveDemoView = new ResponsiveDemoView({model:this.responsiveDemoModel});
        }

        return this.responsiveDemoView;
    };

    /**
     * Only call after dom is ready. (backbone views won't work in some browsers if created before dom ready)
     * @return {*}
     */
    DemosController.prototype.getResponsiveFlexBoxDemoView = function(){
        if(!this.responsiveFlexBoxDemoView){
            this.responsiveFlexBoxDemoModel = new ResponsiveDemoModel();
            this.responsiveFlexBoxDemoView = new ResponsiveFlexBoxDemoView({model:this.responsiveFlexBoxDemoModel});
        }

        return this.responsiveFlexBoxDemoView;
    };






    return DemosController;
});