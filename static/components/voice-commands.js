AFRAME.registerSystem('voice-command', {
    init: function () {
        console.log("in voice-command system init");
        this.entities = [];
        window.addEventListener('loaded', this.onSceneLoaded.bind(this));
    },
    registerMe: function (comp) {
        this.entities.push(comp);
        console.log("in register, comp: "+comp.data.command);
    },
    unregisterMe: function (comp) {
        var index = this.entities.indexOf(comp);
        this.entities.splice(index, 1);
    },
    onSceneLoaded: function(evt) {
        console.log("in voice-command system onSceneLoaded listener");
    },
    play: function() {
        console.log("in system play, entities: "+this.entities);
    }
});
AFRAME.registerComponent('voice-command', {
    multiple: true,
    schema: {
        command: { type: 'string' },
        type: { type: 'string' },
        targetElement: { type: 'string' },
        targetComponent: { type: 'string' },
        function: { type: 'string' },
        attribute: { type: 'string' },
        value: { type: 'string' },
        keyCode: { type: 'string' }
    },
    init: function () {
        this.system.registerMe(this);
        if (this.data.keyCode) {
            window.addEventListener('keyup', this.onKeyup.bind(this));
        }
    },
    remove: function () {
        this.system.unregisterMe(this);
    },
    play: function() {
        console.log("in voice-command play, command: "+this.data.command+", type: "+this.data.type);
        /*if (this.data.type == 'function') {
            var targetElement = document.getElementById(this.data.targetElement);
            console.log("targetElement: "+targetElement+", components: "+targetElement.components);
            var targetComponent = targetElement.components[this.data.targetComponent];
            console.log("targetComponent: "+targetComponent);
            targetComponent[this.data.function]();
        } */
    },
    executeCommand: function () {
        var targetElement = document.getElementById(this.data.targetElement);
        if (this.data.type == 'attribute') {
            target.setAttribute(this.data.attribute, this.data.value);
        } else if (this.data.type == 'function') {
            var targetComponent = targetElement.components[this.data.targetComponent];
            targetComponent[this.data.function]();
        }
    },
    onKeyup: function (evt) {
        if (evt.keyCode == this.data.keyCode) {
            console.log("in voice command keyup for: "+this.data.command);
            this.executeCommand();
        }
    }
});
AFRAME.registerComponent('annyang-voice-recognition', {
    init: function () {
        console.log("in annyang-voice-recognition init");
    },
    play: function() {
        if (annyang) {
            var voiceCommandSystem = document.querySelector('a-scene').systems['voice-command'];
            var commands = {};
            var commandsMap = {};
            for (var i = 0; i < voiceCommandSystem.entities.length; i++) {
                var voiceCommand = voiceCommandSystem.entities[i];
                commandsMap[voiceCommand.data.command] = voiceCommand;
                // note: function empty here because real work is done in the resultMatch callback below
                commands[voiceCommand.data.command] = function() { };
            }
            annyang.addCommands(commands);

            annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
                console.log("commandText: "+commandText); // sample output: 'hello (there)'
                var voiceCommand = commandsMap[commandText];
                voiceCommand.executeCommand();
            });

            // Start listening. You can call this here, or attach this call to an event, button, etc.
            annyang.start();
        }
    }

});

