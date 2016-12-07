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
        target: { type: 'string' },
        attribute: { type: 'string' },
        value: { type: 'string' },
    },
    init: function () {
        this.system.registerMe(this);
    },
    remove: function () {
        this.system.unregisterMe(this);
    },
    play: function() {
        console.log("in component play, data: "+this.data.command);

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
                var target = document.getElementById(voiceCommand.data.target);
                target.setAttribute(voiceCommand.data.attribute, voiceCommand.data.value);
            });

            // Start listening. You can call this here, or attach this call to an event, button, etc.
            annyang.start();
        }
    }

});

