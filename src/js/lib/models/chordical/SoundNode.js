define([
    'core/core'
], function (core) {
    core.log('SoundNode Model module loaded.');

    var SoundNodeModel = core.mvc.Model.extend({
        initialize:function (attributes, options) {
            core.log('SoundNode Model initialize called');

            this.on('change:selectedNodeType', function(){
                core.log('soundNodeModel selectedNodeType change fired. recreating web audio instance');
                this.webAudioNode = null;
                this.getWebAudio();
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
        },
        getWebAudio:function(){
            this.context = core.audio.audioContext;
            if(this.webAudioNode){return this.webAudioNode;}

            switch(this.get('selectedNodeType')){
                case 'gain' : this.webAudioNode = this._createGainNode(); break;
                case 'panner' : this.webAudioNode = this._createPannerNode(); break;
            }
            return this.webAudioNode;
        },
        _createGainNode:function(){
            core.log('SoundNode Model createGainNode called');
            var gainNode = this.context.createGainNode();
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
        connect:function(destination){
            this.set('destination', destination);
            this.getWebAudio().connect(destination);
        },
        disconnect:function(){
            this.getWebAudio().disconnect(0);
        },
        defaults:{
            typeOptions : ['filter', 'gain', 'panner'],
            selectedNodeType: 'gain',
            destination: null, //overwrite this when chaining.
            //when the node is 'gain', these properties will be set by modelbinding, and should be used when playing notes.
            gain:{
                amount:.7
            },
            pan:{
                amount:0 //-45 left, 45 right
            }
        }
    });

    return SoundNodeModel;
});