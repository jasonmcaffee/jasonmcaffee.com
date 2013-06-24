define([
    'core/core'
], function (core) {
    core.log('SoundNode Model module loaded.');

    var SoundNodeModel = core.mvc.Model.extend({
        initialize:function (attributes, options) {
            core.log('SoundNode Model initialize called');
        },
        getWebAudio:function(){
            this.context = core.audio.audioContext;
            if(this.webAudioNode){return this.webAudioNode;}

            switch(this.get('selectedNodeType')){
                case 'gain' : this.webAudioNode = this._createGainNode(); break;
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
        defaults:{
            typeOptions : ['filter', 'gain'],
            selectedNodeType: 'gain',
            destination: null, //overwrite this when chaining.
            //when the node is 'gain', these properties will be set by modelbinding, and should be used when playing notes.
            gain:{
                amount:.7
            }
        }
    });

    return SoundNodeModel;
});