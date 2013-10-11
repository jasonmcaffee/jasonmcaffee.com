define([
    'core/core'
], function (core) {
    core.log('SoundNode Model module loaded.');

    //https://developer.tizen.org/documentation/articles/advanced-web-audio-api-usage
    //http://www.w3.org/TR/webaudio/#WaveTable-section

    var SoundNodeModel = core.mvc.Model.extend({
        initialize:function (attributes, options) {
            core.log('SoundNode Model initialize called');

            //Note: wonky - this must occur before before the other change:selectedNodeType listener in instrument is fired.(so connect has the right new web audio)
            this.on('change:selectedNodeType', function(){
                core.log('soundNodeModel selectedNodeType change fired. recreating web audio instance');
                this.webAudioNode = null;
                this.getWebAudio();
                //also have to setDestinations

            });
            this.on('subPropertyChange:gain.amount', function(){
                core.log('soundNode gain changed!!!!');
                this.getWebAudio().gain.value = parseFloat(this.get('gain').amount);
            });

            //http://stackoverflow.com/questions/14378305/how-to-create-very-basic-left-right-equal-power-panning-with-createpanner
            this.on('subPropertyChange:pan.amount', function(){
                core.log('soundNode pan changed!!!');
                var x = Math.sin(this.get('pan').amount * (Math.PI / 180));
                this.getWebAudio().setPosition(x, 0, 0);
            });
            this.on('subPropertyChange:delay.delayTime', function(){
                core.log('soundNode delayTime changed');
                this.getWebAudio().delayTime.value = this.get('delay').delayTime;
            });
        },
        getWebAudio:function(){
            this.context = core.audio.audioContext;
            if(this.webAudioNode){return this.webAudioNode;}

            switch(this.get('selectedNodeType')){
                case 'gain' : this.webAudioNode = this._createGainNode(); break;
                case 'panner' : this.webAudioNode = this._createPannerNode(); break;
                case 'delay' : this.webAudioNode = this._createDelayNode(); break;
            }
            return this.webAudioNode;
        },
        _createGainNode:function(){
            core.log('SoundNode Model createGainNode called');
            var gainNode = core.audio.createGain();//this.context.createGainNode();  <android is slow with createGainNode. deprecated api.
            gainNode.gain.value = parseFloat(this.get('gain').amount);
            gainNode.connect(this.get('destination') || this.context.destination);
            return gainNode;
        },
        _createPannerNode:function(){
            core.log('SoundNode Model createPannerNode called');
            var pannerNode = this.context.createPanner();
            var x = Math.sin(this.get('pan').amount * (Math.PI / 180));
            pannerNode.setPosition(x, 0, 0);
            pannerNode.connect(this.get('destination') || this.context.destination);
            return pannerNode;
        },
        _createDelayNode:function(){
            core.log('SoundNode Model createDelayNode called');
            var delayNode = this.context.createDelayNode();
            delayNode.delayTime.value = this.get('delay').delayTime;
            delayNode.connect(this.get('destination') || this.context.destination);
            return delayNode;
        },
        connect:function(destination){
            this.disconnect();
            this.set('destination', destination);
            this.getWebAudio().connect(destination);
        },
        disconnect:function(){
            this.getWebAudio().disconnect(0);
        },
        defaults:{
            typeOptions : ['filter', 'gain', 'panner', 'delay'],
            selectedNodeType: 'gain',
            destination: null, //overwrite this when chaining.
            //when the node is 'gain', these properties will be set by modelbinding, and should be used when playing notes.
            gain:{
                amount:.7
            },
            pan:{
                amount:0 //-45 left, 45 right
            },
            delay:{
                delayTime:.5
            }
        }
    });

    return SoundNodeModel;
});