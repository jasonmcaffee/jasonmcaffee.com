define([
    'backbone',
    'core/util/log',
    'jquery',
    'underscore'
], function(Backbone, log, $, _){

    /**
     * This extended view has some powerful features:
     * - widget/subview support
     * - model binding - changes to the dom automatically update the model when bindViewToModel is true.
     *  - if widgets have bindViewToModel, parent view model is not updated
     * - modelEvents - config for registering model.on('event') callbacks. similar to events config.
     * - models can be backbone models or plain object literals
     * - sub templates - you can have an array of templates with selectors which corresponding elements will be updated with the template result.
     *
     * todo: subwidget model binding is triggering change twice. an update event isn't sent on the second trigger (since value is the same) but still needs to be fixed only to occur once.
     * @type {*}
     */
    var View = Backbone.View.extend({
        template: null, //you should define a template function
        bindViewToModel:false, //set to true if you want all input changes to update bb model.
//        attributes:{
//            'class':'page'
//        },
        initialize:function(options){
            log('core.mvc.View initialize called');
            this.options = options || {};
            this.options.widgets = this.options.widgets || [];
            this.options.templates = this.options.templates || [];
            if(!this.isWidget){
                this.$el.addClass('page');
            }
            //do this in delegateEvents instead.
//            if(this.bindViewToModel){
//                this._bindViewToModel();
//            }
        },
        /**
         * Call remove on widgets when parent view's remove is called.
         */
        remove: function(){
            log('core.mvc.View remove called');
            _.each(this.options.widgets, function(widgetMap){
                widgetMap.widget.remove();
            }, this);
            Backbone.View.prototype.remove.apply(this, arguments);
        },
        /**
         * Override base delegateEvents so that we can add modelEvents binding.
         * @param events
         */
        delegateEvents:function (events) {
            //core.log('baseView.delegateEvents called');
            if(this.bindViewToModel){
                this._bindViewToModel();
            }
            Backbone.View.prototype.delegateEvents.apply(this, arguments); //default functionality
            this.delegateOrUndelegateModelEvents(this.modelEvents, this.model, true); //custom functionality
        },
        /**
         * Override base undelegateEvents so that we can remove modelEvents binding.
         */
        undelegateEvents:function () {
            // core.log('baseView.undelegateEvents called.');
            if(this.bindViewToModel){
                this._unbindViewToModel();
            }
            Backbone.View.prototype.undelegateEvents.apply(this, arguments); //default functionality
            this.delegateOrUndelegateModelEvents(this.modelEvents, this.model, false);//custom functionality.
        },
        /**
         * expects a object literal in the format
         * modelEvents = {
         *    'change' : function(){},
         *    'change:prop1': function(){},
         *    'change:prop2': 'prop2changeHandler'
         * }
         * will iterate over each key in modelEvents, find either the function assigned, or function on the view,
         * and bind(or unbind) it to the model.
         *
         * @param modelEvents - hashmap of model event names and associated handler
         * @param model - the backbone model we are assigning events to
         * @param shouldDelegate - if true, model.on('event') will be used. if false, model.off('event') will be used.
         */
        delegateOrUndelegateModelEvents:function (modelEvents, model, shouldDelegate) {
            log('baseView.delegateModelEvents called for: ' + this.id);
            if (!modelEvents) {
                return;
            }
            if (!model) {
                log('no model to bind to');
                return;
            }
            if(!model.on){
                log('view is not using a backbone model');
                return;
            }
            //backbone model trigger uses apply 'this', which means we don't get access to
            //the view from the callback.
            //creating a wrapper which will make the view the 'this'
            var view = this;

            function makeWrapper(originalFunction) {
                return function () {
                    originalFunction.apply(view, arguments);
                };
            }

            for (var key in modelEvents) {
                if (modelEvents.hasOwnProperty(key)) {
                    var method = modelEvents[key];
                    if (!_.isFunction(method)) {
                        method = this[modelEvents[key]];
                    }
                    if (!method) {
                        throw new Error('Method "' + modelEvents[key] + '" does not exist');
                    }

                    var onOrOff = shouldDelegate ? 'on' : 'off';
                    log('calling model.' + onOrOff + ' for key: ' + key);

                    //try to bind the function to the view so we can call view functions
                    var wrappedFunction = shouldDelegate? makeWrapper(method): null; //if off we dont want to wrap the function as it needs to be null so context will work and events will be removed(avoid double registration when navigating back and forth between pages)

                    model[onOrOff](key, wrappedFunction, this.id); //passing this as the parameter makes it so it removes all callbacks since wrappedFunction will never be the same.
                }
            }
        },

        /**
         * renders the view by iterating over widgets and templates, rendering each and appending to the dom.
         * todo: it is inefficient to generate html, append to dom, search dom, and then modify dom
         * instead, render widget via template, and attach widget instance to selector. call setElement on widget.
         * @return {*}
         */
        render : function(){
            log('Core View render called.');

            this.$el.html(this.template(this.getModelAsJSON()));

            _.each(this.options.widgets, function(widgetMap){
                this.$el.find(widgetMap.selector).append(widgetMap.widget.render().el);  //can't use el.innerHTML cause you'll lose events.
                widgetMap.widget.delegateEvents(); //ensure widget events get fired
            }, this);

            _.each(this.options.templates, function(templateMap){
                this.$el.find(templateMap.selector).append(templateMap.template(this.getModelAsJSON()));
            }, this);

            if(this.postRender){
                this.postRender();
            }

            return this;
        },

        /**
         * finds all widgets with matching selector. empties selector html and appends each matching widget html to it.
         * @param selector
         */
        reRenderWidgetsWithSelector:function(selector){
            var $widgetContainer = this.$el.find(selector);
            $widgetContainer.html('');
            _.each(this.options.widgets, function(widgetMap){
                $widgetContainer.append(widgetMap.widget.render().el);  //can't use el.innerHTML cause you'll lose events.
                widgetMap.widget.delegateEvents(); //ensure widget events get fired
            }, this);
        },

        /**
         * When a change occurs and model binding is enabled, this callback will be registered.
         * Needs to be in a separately named function so we can call off during delegateEvents/undelegateEvents
         * @param e
         * @private
         */
        _handleDomEventForModelBinding : function(e){
            var self = this;
            //helper function which calls 'set' on backbone model or uses normal access updating (obj[name] = newVal)
            function setValueUsingSetOrThroughAccessor(objToUpdate, name, newVal, lastBackboneObject, lastBackboneObjectPropertyName, lastPathToBackboneObjectSubProperty){
                if(objToUpdate && objToUpdate.set){
                    log('_bindViewToModel using set to update property named:{0} with value:{1}', name, newVal);
                    var newObject = {};
                    newObject[name] = newVal;
                    objToUpdate.set(newObject);
                }else if(objToUpdate){
                    log('_bindViewToModel using set to update property named:{0} with value:{1}', name, newVal);
                    objToUpdate[name] = newVal;
                    if(lastBackboneObject){
                        lastBackboneObject.trigger('subPropertyChange:'+lastBackboneObjectPropertyName + '.'+ lastPathToBackboneObjectSubProperty, newVal);//should be able to model.get(lastBackbonePropertyName)[lastPath]  (note: lastPath is an array)
                    }
                }else{
                    log('_bindViewToModel cant update a null object');
                }
            }
            function ensureSubObjectExists(obj, propName){
                var subProp = obj.get ? obj.get(propName) : obj[propName];
                if(!subProp){
                    setValueUsingSetOrThroughAccessor(obj, propName, {});
                }
            }

            log('change occurred which was registered by bindViewToModel.');
            if(!this.model){return;}
            var $this = $(e.currentTarget);
            var inputName = $this.attr('name') || $this.attr('id');

            if(!inputName || inputName == ''){log('a {0} element was changed but it does not have an id or name attribute. binding cannot occur'); return;}

            //do not update parent view if widgets have bindViewToModel set to true.
            for(var x=0; x <  this.options.widgets.length; ++x){
                var widgetMap = this.options.widgets[x];
                if(widgetMap.widget.bindViewToModel){
                    log('-- view has a widget which binds changes to its model. checking to see if parent view model or widget model should be updated');
                    var shouldSelectByName = inputName === $this.attr('name');
                    var inputSelector = shouldSelectByName ? '[name="'+inputName+'"]' : '#'+inputName;
                    inputSelector = e.currentTarget.nodeName + inputSelector;
                    log('-- input selector is: ' + inputSelector);
                    var widgetHasElement =  widgetMap.widget.$el.find(inputSelector);
                    widgetHasElement = widgetHasElement.length > 0;
                    if(widgetHasElement){
                        log('-- a subview/widget is binding to model and has the changed element. not updating this parents model');
                        return;
                    }
                }
            }

            var newVal = $this.val(),
                lastBackboneObject, //when nested objects aren't bb models, we'll need the last bb object so we can call set on it and trigger change.
                lastBackboneObjectPropertyName, //so we can do this: lastBackboneObject.set({lastBbpropname:val});
                lastPathToBackboneObjectSubProperty; //"obj.sub1.sub2" if sub1 isn't backbone object result on last iteration should be "sub1.sub2"
            //lastPathArrayToBackboneObjectSubProperty;
            //allow sub object update
            if(inputName.indexOf('.') > 0){
                var names = inputName.split('.');
                var propToUpdate = self.model;

                for(var i=0; i<names.length;++i){
                    var lastIteration = i == names.length -1;
                    var name = names[i];

                    if(lastIteration){
                        setValueUsingSetOrThroughAccessor(propToUpdate, name, newVal, lastBackboneObject, lastBackboneObjectPropertyName, lastPathToBackboneObjectSubProperty);
                    }else{

                        ensureSubObjectExists(propToUpdate, name);
                        if(propToUpdate.get){
                            lastBackboneObject = propToUpdate;
                            lastBackboneObjectPropertyName = name;
                            lastPathToBackboneObjectSubProperty = names.slice(i + 1).join('.');
                            //lastPathToBackboneObjectSubProperty = lastPathArrayToBackboneObjectSubProperty.join('.');
                            propToUpdate = propToUpdate.get(name);
                        }else{
                            propToUpdate = propToUpdate[name];
                        }
                    }
                }
            }else{
                setValueUsingSetOrThroughAccessor(self.model, inputName, newVal);
            }
        },

        /**
         * inputs & selects must have either an id or name which will be what is used to update the model.
         * e.g. <select name='test'> will update this.model.test
         * @private
         */
        _bindViewToModel:function(){
            log('Core View bindViewToModel called.');
            var self = this;
            this.$el.on('change', 'input, select', this._handleDomEventForModelBinding.bind(this));
        },

        _unbindViewToModel:function(){
            log('Core View unbindViewToModel called.');
            this.$el.off('change', 'input, select', this._handleDomEventForModelBinding.bind(this));
        },

        postRender:null,//optional
        getModelAsJSON:function(){
            if(this.model){
                if(this.model.toJSON){
                    return this.model.toJSON();
                }else{
                    return this.model;
                }
            }else{
                return null;
            }
        }
    });

    return View;
});
//
//if(propToUpdate.hasOwnProperty('get')){
//    if(lastIteration){
//        setValueUsingSetOrThroughAccessor(propToUpdate, name, newVal);
//    }else{
//        propToUpdate = propToUpdate.get(name);
//    }
//}else{
//    if(lastIteration){
//        setValueUsingSetOrThroughAccessor(propToUpdate, name, newVal);
//    }else{
//        propToUpdate = propToUpdate[name];
//    }
//}