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

### Adding to aframe scene

To integrate aframe-voice-commands to an aframe scene, the following must be added:

* The `annyang` voice recognition script and the voice-commands.js script
```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.5.0/annyang.min.js"></script>
    <script src="/components/voice-commands.js"></script>
```

* An entity with the `annyang-voice-recognition` component
```html
    <a-entity id="annyang" annyang-voice-recognition></a-entity>
```

* One or more entities with the `voice-command` component
```html
<a-entity id="menu"
              voice-command__show="command: show menu; type: attribute; attribute: visible; value: true;"
              voice-command__hide="command: hide menu; type: attribute; attribute: visible; value: false;">
              ...
              ...
</a-entity>
```
Note that multiple instances of the `voice-command` component are allowed on the same entity as shown above.

### Schema

schema:
```javascript
 {
        command: { type: 'string' },
        type: { type: 'string' },
        targetElement: { type: 'selector' },
        targetComponent: { type: 'string' },
        function: { type: 'string' },
        attribute: { type: 'string' },
        value: { type: 'string' },
        keyCode: { type: 'string' }
    }
 ```
   

| Name  | Description |
| ------------- | ------------- |
| **command**   | the text of the voice command  |
| **type**  | "attribute" to change an attribute or "function" to execute a function  |
| **targetElement**  | the component to execute the function on. |
| **targetComponent**  | the element that contains the attribute to change or contains the component to execute the function on.   This is optional since by default the target will be entity that the component belongs to.  |
| **function**  | the name of the function.  For now the function must take no parameters.  |
| **attribute**  |the attribute to change  |
| **value**  | "the value to change the attribute to  |
| **keyCode**  | n optional numeric ASCII code to use as a shortcut (useful for development when quiet is a necessity)  |
        

### Example: setting an attribute on target element

```xml
<a-entity voice-command="command: city; type: attribute; targetElement: #image-360; attribute: src; value: #city;"></a-entity>
```
### Example: executing a function on target Component

```xml
<a-entity voice-command="command: go; type: function; targetElement: #cursor; targetComponent: teleporter; function: teleport; keyCode: 13"></a-entity>
```

# Running locally

Node.js and npm are required to run the demo on a local server.

First execute:  `npm install`

Then execute: `npm start`

The application will then be running on http://localhost:8080
