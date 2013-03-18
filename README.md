#Strapkit
http://strapkit.com

https://twitter.com/#!/strapkit

strapkit@gmail.com

##TODOs

### Base Controller - back button detection, etc.
### Web Fonts
### Scroll Enhancements - position:fixed and overflow-scroll-touch
### modernizr custom tests for gradients, scrolling, etc.

##DONTDOs
### media query js - add css class ala modernizr to indicate screen size "small, medium, large, etc". js config for breakpoints. not needed unless you need js to execute on breakpoints.

##Overview
This project is meant to provide a starting point for rapidly developing a web application targeting modern browsers.

##Features

###UI Framework
When you are building web applications for business UI components are likely to be custom.
Strapkit provides some basic common css resets, layouts (grids), and responsive functionality, to help get you started.
Navigation and transitions are also provided, for Single Page Application development.

If you are building a prototype, or something for personal use, look into bootstrap or zurb foundation.

###Predefined Build Process
Strapkit utilizes node.js and grunt.js to facilitate building optimized code.
Currently all js and css is combined into 1 file, to mitigate http requests, but we will soon provide an Enterprise version of strapkit to allow for logical bundling and downloading of modules/resources.

###Glues Together Popular Libraries
We've done the research and performance testing, and have chosen the best js libraries and frameworks so you can get to producing a top-notch, modern site as quickly as possible.

###Demos
http://strapkit.com is built using strapkit, and is included in the source so that you can examine and learn best practices, as well as gain insight on how to solve common problems.

###Focused on Performance

###Meaningful and Intuitive Project Structure

##Libraries Used
### Server Side
* Node.js - server js runtime
* express.js - mvc framework
* ejs - server side templating
* gzippo - static file gzip compression
* r.js/require.js - amd optimization (build modules into 1 js)
* grunt.js - for running the build of javascript & css source
* sass (3.2) - css preprocessor with extend and mixins.

### Client Side
* Backbone - Model and View definitions, routing.
* Handlebars - Just the runtime, as we precompile templates at build
* Require.js - For asynchronous module definitions.
* Jquery - dom event and manipulation. feel free to replace with zepto, etc.   (use require.js map config to do this)
* Modernizr - feature detection

##Patterns
### Single Page Application (Optional)

### MVC (Optional)

### Client Side Templating & Precompilation


##Installation
Pre-requisites:
* node.js
* npm
* rvm

### install sass
`gem install sass --pre`

### run npm install
from the root directory (contains package.json), run the following command:
`npm install`
This will install the dependencies found in package.json and should result in a folder called node_modules under the root directory

##Building
The build process will combine, minimize/optimize your js and css found in the src directory.

###Build Command
to do a full build, cd into the build directory and run
`grunt`
this will run the default task defined in build/grunt.js, and will place the built files into the dist directory

### Build Steps

#### start sass watch
`grunt sass-watch`

#### optimize js by uglifying it, minimizing it, and combining it into 1 .js file
Command `grunt build-app`

#### compile html templates to handlebars template functions
Command `grunt compile-templates`
`

#### concat css files into 1 .css file (not needed if using sass watch)
Command `grunt build-css`

## Running the Server
Strapkit comes with a node.js server with Express. (node-server directory)
`cd node-server`
`node server.js`

Note: if running on Mac OS, you will need to increase the process limitation for open files by running
`ulimit -n 10000`
https://github.com/joyent/node/issues/2479


##Automated Building
You probably don't want to manually run the build each time you modify a template or preprocessed css file (.styl).
We've included watch tasks which monitor the appropriate source directories, and call the needed build commands.
To get this functionality, you'll need to open a new tab or terminal window and run:
`grunt watch`
Now when you make changes to the src files, you should see the watch console indicate that the building of the app is occurring.

## useful resources
http://www.w3counter.com/globalstats.php



