define([
    'core/core',
    'compiled-templates/demos/threejsDemoOneTemplate',
    'jquery'
], function(core, threejsDemoOneTemplate, $){

    /**
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

        var v = new three.Vector3( (x/width)*2-1, -(y/height)*2+1, 0.5);
        projector.unprojectVector(v, camera);

        var ray = new three.Raycaster(camera.position, v.sub(camera.position).normalize());

        var intersects = ray.intersectObjects(sceneObjects);
        return intersects[0] ? intersects[0].object : undefined;
    }

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

            this.isKeyCurrentlyPressed = false;//let users hold down key to continue moving at rate faster than keydown is fired.

            this.isUpPressed = false;
            this.isDownPressed = false;
            this.isLeftPressed = false;
            this.isRightPressed = false;
            this.isForwardPressed = false;
            this.isBackwardPressed = false;

            this.target = null; //for looking around
            this.lookSpeed = 0.05;
            this.viewHalfX = 0;
            this.viewHalfY = 0;
            this.mouseY = 1;
            this.clock = null; //threejs clock for delta in look speed
            this.lookVertical = true;
            this.lon = 0;
            this.lat = 0;

            $(window).on('keydown', function(e){
                core.log('keydown window {0} {1}', e.which, e.keyCode);

                //don't fire if already pressed.
//                if(this.isKeyCurrentlyPressed){
//                    return;
//                }

                this.isKeyCurrentlyPressed = true;
                switch(e.which){
                    case 87 : //w
                        //if(this.isForwardPressed){return;}
                        this.isForwardPressed = true;
                        //this.moveForward();
                        break;
                    case 65 : //a
                        //if(this.isLeftPressed){return;}
                        this.isLeftPressed = true;
                        //this.moveLeft();
                        break;

                    case 68: //d
                        //if(this.isRightPressed){return;}
                        this.isRightPressed = true;
                        //this.moveRight();
                        break;
                    case 83: //s
                        //if(this.isBackwardPressed){return;}
                        this.isBackwardPressed = true;
                        //this.moveBackward();
                        break;
                    case 32: //space
                        //if(this.isUpPressed){return;}
                        this.isUpPressed = true;
                        //this.moveUp();
                        break;
                    case 16: //shift (dont use tab lose focus)
                        //if(this.isDownPressed){return;}
                        this.isDownPressed = true;
                        //this.moveDown();
                        break;

                }
            }.bind(this));

            $(window).on('keyup', function(e){
                core.log('keyup window {0} {1}', e.which, e.keyCode);
                //this.isKeyCurrentlyPressed = false;

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
            'click #scene': function(e){
                //this.camera.position.x += 20;
                var clickedObject = getClickedObject(THREE, e, this.projector, this.camera,this.sceneWidth, this.sceneHeight, this.scene.children);
                if(clickedObject){
                    clickedObject.scale.x -= .1;
                }
            },
            'click #controls #moveForward': 'moveForward',
            'click #controls #moveBackward': 'moveBackward',
            'click #controls #moveLeft' : 'moveLeft',
            'click #controls #moveRight' : 'moveRight',
            'click #controls #moveUp' : 'moveUp',
            'click #controls #moveDown' :'moveDown',
            'mouseUp #controls':function(){
                this.isUpPressed = false;
                this.isDownPressed = false;
                this.isLeftPressed = false;
                this.isRightPressed = false;
                this.isForwardPressed = false;
                this.isBackwardPressed = false;
            },
            'mousemove #scene' : function(e){
                //core.log('mousemove x:{0} y:{1}', e.clientX, e.clientY);

                this.mouseX = e.pageX - this.viewHalfX;
                this.mouseY = e.pageY - this.viewHalfY;
//                var x = e.pageX;
//                var y = e.pageY;
//
//                var v = new three.Vector3( (x/this.sceneWidth)*2-1, -(y/this.sceneHeight)*2+1, 0.5);
//                this.projector.unprojectVector(v, this.camera);
//                var direction = v.sub(this.camera.position).normalize();
//
//                var ray = new three.Ray(this.camera.position, direction);
//                var distance =  this.camera.position.z / direction.z;
//
//                var position = this.camera.position.clone().add(direction.multiplyScalar(distance));
//
//                this.camera.lookAt(position);

            }

        },
        /**
         * moves every n milliseconds while this.isKeyCurrentlyPressed == true.
         *
         * @param moveFunc - function that updates camera.position. 'this' will be this view instance. e.g. this.camera.position.z += 30; should return true if you wish to keep the interval, false if you want to stop.
         */
        move:function(moveFunc){
            var func = moveFunc.bind(this);
            var interval = setInterval(function(){
                if(!func()){
                    clearInterval(interval);
                }
            }.bind(this), 30);
        },

        moveForward: function(){
            this.move(function(){
                //core.log('updating position forward');
                this.camera.position.z -= this.movementAmount;
                return this.isForwardPressed;
            });

        },
        moveBackward: function(){
            this.move(function(){
                this.camera.position.z += this.movementAmount;
                return this.isBackwardPressed;
            });
        },
        moveRight: function(){

            this.move(function(){
                this.camera.position.x += this.movementAmount;
                return this.isRightPressed;
            });
        },
        moveLeft: function(){


            this.move(function(){
                //this.camera.position.x -= this.movementAmount;
                this.camera.translateX( - this.movementAmount);
                return this.isLeftPressed;
            });

        },
        moveUp: function(){

            this.move(function(){
                this.camera.position.y += this.movementAmount;
                return this.isUpPressed;
            });
        },
        moveDown: function(){

            this.move(function(){
                this.camera.position.y -= this.movementAmount;
                return this.isDownPressed;
            });
        },

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

            for(var x = 0, negX =0; x<=100; x += this.blockSize, negX = x * -1){
                this.scene.add(createZLine(x, 0));
                this.scene.add(createZLine(negX, 0));

                //lines drawn along the z axis along x, but y increased
//                for(var y= 10, negY=0; y<=20; y+= this.blockSize, negY = y * -1){
//                    //lines drawn along the z axis (front to back) along x.
//                    this.scene.add(createLine(x, y));
//                    this.scene.add(createLine(negX, y));
//                }

                this.scene.add(createXLine(0, x));
                this.scene.add(createXLine(0, negX));


            }

        },
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
            }else{
                core.log('x is NAN!');
            }
        },
        updateCameraPosition:function(delta){
            if(this.isBackwardPressed){
                //this.camera.position.z += this.movementAmount;
                this.camera.translateZ(this.movementAmount);
            }
            if(this.isForwardPressed){
                this.camera.translateZ(- this.movementAmount);

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
        },
        render:function(){
            core.log('threejs rendering');
            //first give the el the template html
            this.$el.html(threejsDemoOneTemplate());

            //todo: bind polyfill
            var self = this;
            //nested require so threejs isn't prepackaged with the site.
            require(['three'], function(three){
                core.log('three has loaded.');

                three = THREE; //todo: fix shim export  it's because the require is compiled at the bottom?
                this.three = three;

                this.$scene = this.$el.find('#scene');
                this.sceneWidth = this.$scene.width();
                this.sceneHeight =this.$scene.height();
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

               this.camera.position.set( 0, 10, 100 );
//                camera.lookAt( scene.position );

                var geometry = new three.CubeGeometry( this.blockSize, this.blockSize, this.blockSize );
                var material = new three.MeshLambertMaterial( { color: 0x91D164 } );
                var mesh = new three.Mesh( geometry, material );
                mesh.position.set(0, 0, 0);
                this.scene.add( mesh );
                //this.sceneObjects.push(mesh);

                var light = new three.PointLight( 0xF4F799 );
                light.position.set( 10, 100, 10 );
                this.scene.add( light );

                this.drawFloorLines();

                //for looking around
                this.clock = new three.Clock();
                this.target = new three.Vector3(0,0,0);

                this.camera.lookAt({x:0, y:0, z:0});

                function animate(t){
//                    camera.position.x = Math.sin(t/1000) * 20;
//                    camera.position.y = 150;
//                    camera.position.z = Math.cos(t/1000) * 20;

                    //this.camera.lookAt(this.scene.position);
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