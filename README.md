# Public Demo

Demos are available publicly at:

[http://aframe-voice-commands.appspot.com](http://aframe-voice-commands.appspot.com)
 
## Image gallery demo

Say "show menu" to bring up menu

Say "cubes", "city", or "lake" to show any of the 3 images

Say "hide menu" to hide menu

This scene is based on the Image Gallery aframe.io demo:  [https://github.com/aframevr/360-image-gallery-boilerplate](https://github.com/aframevr/360-image-gallery-boilerplate)

## Teleporter demo

Say "teleport" to activate raycaster

Say "go" to teleport to location of marker (with raycaster activated)

Say "cancel" to deactivate raycaster

This scene is based on the Hello Metaverse aframe.io demo: [https://aframe.io/examples/showcase/hello-metaverse/](https://aframe.io/examples/showcase/hello-metaverse/)

# Overview

This node.js app demonstrates a voice command framework for use in aframe.

The voice command can set an attribute of a target element, or can also execute a function on a target Component.

## Usage

### Example: setting an attribute on target element

voice-command="command: city; type: attribute; targetElement: #image-360; attribute: src; value: #city;"

### Example: executing a function on target Component

voice-command="command: go; type: function; targetElement: #cursor; targetComponent: teleporter; function: teleport; keyCode: 13"


# Running locally

Node.js and npm are required to run this app.

First execute:  npm install

Then execute: npm start

The application will then be running on http://localhost:8080
