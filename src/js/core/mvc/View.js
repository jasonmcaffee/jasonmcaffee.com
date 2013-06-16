define([
    'backbone',
    'core/util/log',
    'jquery',
    'underscore'
], function(Backbone, log, $, _){
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
            if(this.bindViewToModel){
                this._bindViewToModel();
            }
        },
        /**
         * Override base delegateEvents so that we can add modelEvents binding.
         * @param events
         */
        delegateEvents:function (events) {
            //core.log('baseView.delegateEvents called');
            Backbone.View.prototype.delegateEvents.apply(this, arguments); //default functionality
            this.delegateOrUndelegateModelEvents(this.modelEvents, this.model, true); //custom functionality
        },
        /**
         * Override base undelegateEvents so that we can remove modelEvents binding.
         */
        undelegateEvents:function () {
            // core.log('baseView.undelegateEvents called.');
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
                    var wrappedFunction = shouldDelegate? makeWrapper(method): null; //if off we dont want to wrap the function as it needs to be null so context will work (line

                    model[onOrOff](key, wrappedFunction, this.id); //passing this as the parameter makes it so it removes all callbacks since wrappedFunction will never be the same.
                }
            }
        },
        render : function(){
            log('Core View render called.');

            this.$el.html(this.template(this.getModelAsJSON()));

            _.each(this.options.widgets, function(widgetMap){
                this.$el.find(widgetMap.selector).append(widgetMap.widget.render().el);  //can't use el.innerHTML cause you'll lose events.
            }, this);

            _.each(this.options.templates, function(templateMap){
                this.$el.find(templateMap.selector).append(templateMap.template(this.getModelAsJSON()));
            }, this);

            if(this.postRender){
                this.postRender();
            }
            return this;
        },
        //any changes in the view will update the view's model.
        //note: not sure if this will work in all situations yet. WIP
        _bindViewToModel:function(){
            log('Core View bindViewToModel called.');
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
            this.$el.on('change', 'input, select', function(e){
                if(!self.model){return;}
                var $this = $(this);
                var inputName = $this.attr('name') || $this.attr('id');
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
            });

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