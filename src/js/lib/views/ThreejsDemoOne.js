define([
    'core/core',
    'compiled-templates/demos/threejsDemoOneTemplate',
    'jquery'
], function(core, threejsDemoOneTemplate, $){
    var three = null;//once threejs is loaded

    /**
     * Primarily used to determine if a block was clicked, so that we can add another block to it.
     * Casts a ray in the direction the cursor is pointing.
     * Returns the first hit object.
     * @param three
     * @param clickEvent
     * @param projector
     * @param camera
     * @param width
     * @param height
     * @param sceneObjects
     * @return {*}
     */
    function getClickedObject(three, clickEvent, projector, camera, width, height, sceneObjects){
        var x = clickEvent.clientX;
        var y = clickEvent.clientY;

        //https://github.com/mrdoob/three.js/issues/397 change z from 0.5 to 1
        var v = new three.Vector3( (x/width)*2-1, -(y/height)*2+1, 1);
        projector.unprojectVector(v, camera);

        var direction = v.sub(camera.position).normalize();
        core.log('direction is x:{0} y:{1} z:{2}', direction.x, direction.y, direction.z);
        var ray = new three.Raycaster(camera.position, direction);

        var intersects = ray.intersectObjects(sceneObjects);
        return intersects[0]; //need more than just the object to determine which face //? intersects[0].object : undefined;
    }


    //primary view for the threejs demo.
    //all logic for how the scene is created and interacted with can be found here.
    var View = core.mvc.View.extend({
        id:'threejsdemoOne',
        template: threejsDemoOneTemplate,
        initialize:function(){
            this.three = null;//threejs reference
            this.camera = null;
            //this.sceneObjects = [];//array of all mesh objects part of the scene
            this.scene = null;
            this.renderer = null;
            this.projector = null;//needed for getting clicked object.
            this.$scene = null;
            this.sceneWidth = 800;
            this.sceneHeight = 650;

            this.blockSize = 5;
            this.movementAmount = 1;

            this.isUpPressed = false;
            this.isDownPressed = false;
            this.isLeftPressed = false;
            this.isRightPressed = false;
            this.isForwardPressed = false;
            this.isBackwardPressed = false;

            this.target = null; //for looking around
            this.lookSpeed = 0.1;
            this.viewHalfX = 0;
            this.viewHalfY = 0;
            this.mouseY = 1;
            this.clock = null; //threejs clock for delta in look speed
            this.lookVertical = true;
            this.lon = 0;
            this.lat = 0;

            this.playerGeometry = null; //for hit detection.
            this.playerHeight = this.blockSize * 2;
            this.playerWidth = this.blockSize;
            this.playerDepth = this.blockSize;

            $(window).on('keydown', function(e){
                core.log('keydown window {0} {1}', e.which, e.keyCode);
                switch(e.which){
                    case 87 : //w
                        this.isForwardPressed = true;
                        break;
                    case 65 : //a
                        this.isLeftPressed = true;
                        break;
                    case 68: //d
                        this.isRightPressed = true;
                        break;
                    case 83: //s
                        this.isBackwardPressed = true;
                        break;
                    case 32: //space
                        this.isUpPressed = true;
                        break;
                    case 16: //shift (dont use tab lose focus)
                        this.isDownPressed = true;
                        break;

                }
            }.bind(this));

            $(window).on('keyup', function(e){
                core.log('keyup window {0} {1}', e.which, e.keyCode);
                switch(e.which){
                    case 87 : //w
                        this.isForwardPressed = false;
                        break;
                    case 65 : //a
                        this.isLeftPressed = false;
                        break;
                    case 68: //d
                        this.isRightPressed = false;
                        break;
                    case 83: //s
                        this.isBackwardPressed = false;
                        break;
                    case 32: //space
                        this.isUpPressed = false;
                        break;
                    case 16: //shift (dont use tab lose focus)
                        this.isDownPressed = false;
                        break;

                }
            }.bind(this));


        },
        events:{

            //when the scene is clicked, we determine if an existing block was clicked, and if so,
            //add a new block to the scene, appending it to the face of the existing block that was clicked.
            'click #scene': function(e){
                //this.camera.position.x += 20;
                var clickedIntersect = getClickedObject(THREE, e, this.projector, this.camera,this.sceneWidth, this.sceneHeight, this.scene.children);
                var clickedObject = clickedIntersect ? clickedIntersect.object : null;

                var newBlockPosition = {x:0, y:0, z:0};
                if(clickedObject){
                    //clickedObject.scale.x -= .1;
                    core.log('face index is ' + clickedIntersect.faceIndex);
                    if(clickedIntersect.faceIndex == 2){
                        //top
                        newBlockPosition.x = clickedObject.position.x;
                        newBlockPosition.y = clickedObject.position.y + this.blockSize;
                        newBlockPosition.z = clickedObject.position.z;
                    }else if(clickedIntersect.faceIndex == 4){
                        //back
                        newBlockPosition.x = clickedObject.position.x;
                        newBlockPosition.y = clickedObject.position.y;
                        newBlockPosition.z = clickedObject.position.z + this.blockSize;
                    }else if(clickedIntersect.faceIndex == 5){
                        //front
                        newBlockPosition.x = clickedObject.position.x;
                        newBlockPosition.y = clickedObject.position.y;
                        newBlockPosition.z = clickedObject.position.z - this.blockSize;
                    }else if(clickedIntersect.faceIndex == 1){
                        //left
                        newBlockPosition.x = clickedObject.position.x - this.blockSize;
                        newBlockPosition.y = clickedObject.position.y;
                        newBlockPosition.z = clickedObject.position.z;
                    }else if(clickedIntersect.faceIndex == 0){
                        //right
                        newBlockPosition.x = clickedObject.position.x  + this.blockSize;
                        newBlockPosition.y = clickedObject.position.y;
                        newBlockPosition.z = clickedObject.position.z;
                    } else if(clickedIntersect.faceIndex == 3){
                        //bottom
                        newBlockPosition.x = clickedObject.position.x;
                        newBlockPosition.y = clickedObject.position.y - this.blockSize;
                        newBlockPosition.z = clickedObject.position.z;
                    }

                    this.createBlock(newBlockPosition);
                }
            },

            //currently not used. intended to allow controlling movement on touch device.
            'mouseUp #controls':function(){
                this.isUpPressed = false;
                this.isDownPressed = false;
                this.isLeftPressed = false;
                this.isRightPressed = false;
                this.isForwardPressed = false;
                this.isBackwardPressed = false;
            },

            //when the mouse moves, we update mouseX and mouseY so that they can be used in looking
            //around the scene
            'mousemove #scene' : function(e){
                this.mouseX = e.pageX - this.viewHalfX;
                this.mouseY = e.pageY - this.viewHalfY;
            }

        },

        //creates points of light on the scene to demo lighting and shading effects.
        createLight:function(){
            var light = new three.PointLight( 0xF4F799 );
            light.position.set( 10, 100, 10 );
            this.scene.add( light );

            light = new three.PointLight( 0xF4F799 );
            light.position.set( 100, 10, 10 );
            this.scene.add(light);

            light = new three.PointLight( 0xF4F799 );
            light.position.set( -100, 10, 10 );
            this.scene.add(light);

            light = new three.PointLight( 0xF4F799 );
            light.position.set( 10, -100, 10 );
            this.scene.add(light);

            light = new three.PointLight( 0xF4F799 );
            light.position.set( 10, -100, -10 );
            this.scene.add(light);

            light = new three.PointLight( 0xF4F799 );
            light.position.set( 10, 100, -10 );
            this.scene.add(light);

            light = new three.PointLight( 0xF4F799 );
            light.position.set( 10, -100, 100 );
            this.scene.add(light);

            light = new three.PointLight( 0xF4F799 );
            light.position.set( 10, 100, 100 );
            this.scene.add(light);

        },

        //creates a new block and places it at the specified position.
        //primarily called when a user clicks on another block.
        createBlock:function(position){
            var geometry = new three.CubeGeometry( this.blockSize, this.blockSize, this.blockSize );
            var material = new three.MeshLambertMaterial( { color: 0x91D164 } );

            var mesh = new three.Mesh( geometry, material );
            mesh.position.set(position.x, position.y, position.z);

            mesh.dynamic = true;//allow the colors of a face to be changed after a collision.

            this.scene.add( mesh );
        },

        //draws lines to outline the floor of the scene.
        drawFloorLines:function(){
            var THREE = this.three;
            //lines
            var material = new THREE.LineBasicMaterial({
                color: 0xB5D4F2
            });

            var lineSize = 10000;
            var negativeLineSize = lineSize * -1;

            function createZLine(x, y){
                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(x, y, lineSize));
                geometry.vertices.push(new THREE.Vector3(x, y, negativeLineSize));
                var line = new THREE.Line(geometry, material);
                return line;
            }

            function createXLine(y, z){
                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(lineSize, y, z));
                geometry.vertices.push(new THREE.Vector3(negativeLineSize, y, z));
                var line = new THREE.Line(geometry, material);
                return line;
            }

            for(var x = 0, negX =0; x<=300; x += this.blockSize, negX = x * -1){
                this.scene.add(createZLine(x, 0));
                this.scene.add(createZLine(negX, 0));

                this.scene.add(createXLine(0, x));
                this.scene.add(createXLine(0, negX));
            }
        },

        //when the user moves the mouse, we create the illusion of looking around the 3d space.
        //takes into account the speed the mouse is moving (lookSpeed) and translates the 2d movement of the
        //mouse into 3d movement of the camera and playerCube.
        updateLookPosition:function(delta){
            //look
            var actualLookSpeed = delta * this.lookSpeed;
            var verticalLookRatio = 1;
            if(isNaN(this.lon)){
                this.lon = 0;
            }
            this.lon += this.mouseX * actualLookSpeed;
            if( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

            this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
            this.phi = THREE.Math.degToRad( 90 - this.lat );

            this.theta = THREE.Math.degToRad( this.lon );
            var targetPosition = this.target,
                position = this.camera.position;

            targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
            targetPosition.y = position.y + 100 * Math.cos( this.phi );
            targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

            if(!isNaN(targetPosition.x)){

                this.camera.lookAt( targetPosition );

                //update the player cube rotation
                this.playerCube.rotation.x = this.camera.rotation.x;
                this.playerCube.rotation.y = this.camera.rotation.y;
                this.playerCube.rotation.z = this.camera.rotation.z;
                //this.playerCube.
            }else{
                core.log('x is NAN!');
            }
        },

        //moves the camera position if w,s,a,d keys are in a pressed state.
        //currently supports collision detection for forward movement (work in progress);
        updateCameraPosition:function(delta){
            if(this.isBackwardPressed){
                //this.camera.position.z += this.movementAmount;
                this.camera.translateZ(this.movementAmount);
            }
            //collision detection: cast a ray in the direction the user is moving and see if we collide with 
            //any objects in the scene. if we do, stop movement, and change the color of the object we hit.
            if(this.isForwardPressed){

                var originPoint = this.playerCube.position.clone();
                var forwardMovementFailed = false;
                //check to see if you hit something first.
                for (var vertexIndex = 0; vertexIndex < this.playerGeometry.vertices.length; vertexIndex++)
                {
                    var localVertex = this.playerGeometry.vertices[vertexIndex].clone();
                    var globalVertex = localVertex.applyMatrix4( this.playerCube.matrix );

                    var intendedOriginPoint = originPoint.clone();
                   // intendedOriginPoint.
                    var directionVector = globalVertex.sub( originPoint);//this.playerCube.position ); //maybe - 1 the z so we know we'll hit if we move.

                    //change the origin point a bit so the player can leave

                    var ray = new three.Raycaster( originPoint, directionVector.clone().normalize() );
                    var collisionResults = ray.intersectObjects( this.scene.children );

                    var directionVectorLength = directionVector.length();

                    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVectorLength ){
                        //core.log('collisionResult.distance: {0}  directionVectorLength: {1}', collisionResults[0].distance ,  directionVectorLength);
                        //core.log('directionVector x:{0} y:{1} z:{2}', directionVector.x, directionVector.y, directionVector.z);
                        core.log('camera.rotation x: {0} y:{1} z:{2}', this.camera.rotation.x, this.camera.rotation.y, this.camera.rotation.z);
                        core.log('no move for you! vertexIndex: ' + vertexIndex);
                        forwardMovementFailed = true;

                        //change the color of the object we collided with
                        var collision = collisionResults[0];
                        var objectCollidedWith = collision.object;
                        objectCollidedWith.material.color.setHex(Math.random() * 0xffffff);//0x1F89F2
                        //objectCollidedWith.dynamic = true;
                        objectCollidedWith.geometry.__dirtyColors = true;

                        break;
                    }
                }
                if(!forwardMovementFailed){
                    this.camera.translateZ(- this.movementAmount);
                }
            }
            if(this.isUpPressed){
                this.camera.translateY(this.movementAmount);
            }
            if(this.isDownPressed){
                this.camera.translateY(- this.movementAmount);
            }
            if(this.isLeftPressed){
                this.camera.translateX(- this.movementAmount);
            }
            if(this.isRightPressed){
                this.camera.translateX(this.movementAmount);
            }

            //update playerCube position to match camera
            this.playerCube.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z );
        },

        //initial render of the page.  does a nested require so that the threejs lib is not included until
        //this page is viewed.
        //creates the primary threejs objects (renderer, scence, camera, projector), 
        //as well as custom objects (floor lines, lights, player cube, and a block cube)
        //draws each frame using requestAnimation frame.
        render:function(){
            core.log('threejs rendering');
            //first give the el the template html
            this.$el.html(threejsDemoOneTemplate());

            //todo: bind polyfill
            var self = this;
            //nested require so threejs isn't prepackaged with the site.
            require(['three'], function(three3){
                core.log('three has loaded.');

                three = THREE; //todo: fix shim export  it's because the require is compiled at the bottom?
                this.three = three;

                this.$scene = this.$el.find('#scene');
                this.sceneWidth = this.$scene.width() -10; //window.innerWidth;
                this.sceneHeight = this.$scene.height()-10; //window.innerHeight;//
                this.viewHalfX = this.sceneWidth /2;
                this.viewHalfY = this.sceneHeight /2;

                core.log('screen width: {0}  screen height: {1}', this.sceneWidth, this.sceneHeight);

                this.renderer = new  three.WebGLRenderer();     //three.CanvasRenderer();

                this.renderer.setSize( this.sceneWidth, this.sceneHeight);

                this.$scene.append(this.renderer.domElement);

                this.scene = new three.Scene();

                this.projector = new three.Projector();

                this.camera = new three.PerspectiveCamera(
                    35,             // Field of view
                    this.sceneWidth / this.sceneHeight,      // Aspect ratio
                    0.1,            // Near plane
                    10000           // Far plane
                );

               this.camera.position.set( this.playerWidth /2, this.playerHeight / 2, 100 );

                this.playerGeometry = new three.CubeGeometry(this.playerWidth, this.playerHeight, this.playerDepth);
                this.playerMaterial = new three.MeshBasicMaterial({color:0xFC0015, wireframe:true});   //
                this.playerCube = new three.Mesh(this.playerGeometry, this.playerMaterial);
                this.playerCube.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z );

                this.scene.add(this.playerCube);

                //starting point block
                this.createBlock({x:0, y:this.blockSize/2, z:0});
                //various lights throughout the scene
                this.createLight();
                //simulate a floor using lines
                this.drawFloorLines();

                //for looking around
                this.clock = new three.Clock();
                this.target = new three.Vector3(0,0,0);

                this.camera.lookAt({x:0, y:0, z:0});

                //request animation frame callback.  
                //any time the browser thinks it's a good time to draw things, this will be called.
                //This allows us to draw things at ~60 frames per second.
                //its important to note that user interactions dont render anything, they simply update
                //state.  This function (and the functions it calls) are the only things that render.
                function animate(t){
                    var delta = this.clock.getDelta();
                    this.updateLookPosition(delta);
                    this.updateCameraPosition(delta);
                    this.renderer.render(this.scene, this.camera);

                    core.ui.requestAnimationFrame(animate.bind(this));
                }
                animate.bind(this)(new Date().getTime());

            }.bind(this));
        }
    });

    return View;
});