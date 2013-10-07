#Jason McAffee's website
http://www.jasonmcaffee.com

https://twitter.com/#!/jasonmcaffee

jasonlmcaffee@gmail.com

#Chordical

##Setup:
git clone https://github.com/jasonmcaffee/jasonmcaffee.com.git

npm install

grunt build-app    //for js

grunt watch //watch for js or template changes

grunt sass-watch //watch for scss changes

##Code:

https://github.com/jasonmcaffee/jasonmcaffee.com/blob/master/src/js/lib/controllers/Chordical.js

Creates Widgets (keyboard) and renders:
https://github.com/jasonmcaffee/jasonmcaffee.com/blob/master/src/js/lib/views/Chordical.js

When you click 'instrument' on the main page, you are shown a view where you can add 'Sound Nodes' like panner, gain, etc.
https://github.com/jasonmcaffee/jasonmcaffee.com/blob/master/src/js/lib/views/chordical/InstrumentEdit.js

Keyboard widget handles touch, mouse down, and pc keyboard events by asking the Instrument to play a note
https://github.com/jasonmcaffee/jasonmcaffee.com/blob/master/src/js/lib/widgets/chordical/Keyboard.js

Sound Node represents connections (panner, gain, etc)
https://github.com/jasonmcaffee/jasonmcaffee.com/blob/master/src/js/lib/widgets/chordical/SoundNode.js

Instrument Model plays a Note (aka playableNote). Right now it connects all sound nodes with each play (keep forgetting why I have to do this, but it may be a perf hit)
https://github.com/jasonmcaffee/jasonmcaffee.com/blob/master/src/js/lib/models/chordical/Instrument.js

Note Model play is primarily called by Instrument, and uses the web audio api to play an oscillator, etc.
https://github.com/jasonmcaffee/jasonmcaffee.com/blob/master/src/js/lib/models/chordical/Note.js

Sound Node model creates web audio panner, gain, etc:
https://github.com/jasonmcaffee/jasonmcaffee.com/blob/master/src/js/lib/models/chordical/SoundNode.js

notes model is a singleton which calculates the frequencies for each note, with properties for octave, note name, etc.
Each Note (uppercase) has a corresponding note:
https://github.com/jasonmcaffee/jasonmcaffee.com/blob/master/src/js/lib/models/chordical/notes.js



