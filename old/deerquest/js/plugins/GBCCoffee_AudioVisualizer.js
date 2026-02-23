/*:
 * @url https://coffeenahc.itch.io/
 * @target MZ
 * @author coffeenahc
 * @plugindesc (v.1.0) Audio visualizer plugin (Final Fantasy XVI inspired).
 * 
 * @help
 * ======================================================================================
 * 
 * VERSION HISTORY: 
 * - 1.0: Initial release
 * 
 * ======================================================================================
 * 
 * TERMS OF USAGE (As of 10/10/2023):
 * - This is a paid plugin. If you acquired it for free, you are not allowed to
 * use it in any of your games. Purchase the plugin from the url specified in the
 * plugin description (https://coffeenahc.itch.io/) if you don't own it.
 * 
 * - You are allowed to make changes to the plugin. Just don't claim that you made
 * the plugin yourself.  
 * 
 * - You are not allowed to redistribute this plugin or resell it as your own, 
 * regardless if you've made changes or not.
 * 
 * - Commercial or Non-commercial use. No attributions required.
 * 
 * - I am open for commissions should you wish to upgrade the plugin or change parts of it 
 * according to your preference. Contact me at the above link, visit my fiverr page 
 * (https://www.fiverr.com/coffee_chan), or dm on discord (Username: coffeenahc).
 * 
 * ======================================================================================
 * 
 * NOTES:
 * 
 * Make sure you define a switch to toggle audio visualization on/off. By default, this 
 * switch will be set to ON. 
 * 
 * - If audio visualization from the options is set to OFF, then the audio visualization will 
 * be OFF regardless if the switch is ON.
 * 
 * - If audio visualization from the options is set to ON, and switch is OFF, then audio
 * visualization will be OFF. 
 * 
 * @param switch
 * @text Visualizer Switch
 * @type switch
 * @desc When this switch is off, visualizer will also be off regardless if it's enabled from the options.
 * 
 * @param showInMap
 * @text Show in map?
 * @type boolean
 * @default true
 * @desc Show audio visualizer in map?
 * 
 * @param showInBattle
 * @text Show in battle?
 * @type boolean
 * @default true
 * @desc Show audio visualizer in battle?
 * 
 * @param bgmSettings
 * @text BGM Settings
 * 
 * @param bgmBarRate
 * @text BGM Bar Rate
 * @desc From 0 to 1 only. A length of 1 = 100% bar length.
 * @type text
 * @default 1
 * @parent bgmSettings
 * 
 * @param bgmColor1
 * @text BGM Color 1
 * @type text
 * @default rgba(90, 0, 0, 0.5)
 * @parent bgmSettings
 * 
 * @param bgmColor2
 * @text BGM Color 2
 * @type text
 * @default rgba(255, 0, 0, 0.5)
 * @parent bgmSettings
 * 
 * @param bgmEnabled
 * @text Enabled?
 * @type boolean
 * @default true
 * @parent bgmSettings
 * @desc Enable visualization for this audio type?
 * 
 * @param bgsSettings
 * @text BGS Settings
 * 
 * @param bgsBarRate
 * @text BGS Bar Rate
 * @desc From 0 to 1 only. A length of 1 = 100% bar length.
 * @type text
 * @default 1
 * @parent bgsSettings
 * 
 * @param bgsColor1
 * @text BGS Color 1
 * @type text
 * @default rgba(40, 143, 54, 0.5)
 * @parent bgsSettings
 * 
 * @param bgsColor2
 * @text BGS Color 2
 * @type text
 * @default rgba(0, 255, 34, 0.5)
 * @parent bgsSettings
 * 
 * @param bgsEnabled
 * @text Enabled?
 * @type boolean
 * @default true
 * @parent bgsSettings
 * @desc Enable visualization for this audio type?
 * 
 * @param meSettings
 * @text ME Settings
 * 
 * @param meBarRate
 * @text ME Bar Rate
 * @desc From 0 to 1 only. A length of 1 = 100% bar length.
 * @type text
 * @default 1
 * @parent meSettings
 * 
 * @param meColor1
 * @text ME Color 1
 * @type text
 * @default rgba(161, 122, 144, 0.5)
 * @parent meSettings
 * 
 * @param meColor2
 * @text ME Color 2
 * @type text
 * @default rgba(252, 186, 3, 0.5)
 * @parent meSettings
 * 
 * @param meEnabled
 * @text Enabled?
 * @type boolean
 * @default true
 * @parent meSettings
 * @desc Enable visualization for this audio type?
 * 
 * @param seSettings
 * @text SE Settings
 * 
 * @param seBarRate
 * @text SE Bar Rate
 * @desc From 0 to 1 only. A length of 1 = 100% bar length.
 * @type text
 * @default 1
 * @parent seSettings
 * 
 * @param seColor1
 * @text SE Color 1
 * @type text
 * @default rgba(29, 67, 130, 0.5)
 * @parent seSettings
 * 
 * @param seColor2
 * @text SE Color 2
 * @type text
 * @default rgba(0, 98, 255, 0.5)
 * @parent seSettings
 * 
 * @param seLimit
 * @text SE Limit
 * @type text
 * @default 2
 * @desc Limit no. of concurrent se visualizations. The lower, the better the performance.
 * @parent seSettings
 * 
 * @param seEnabled
 * @text Enabled?
 * @type boolean
 * @default true
 * @parent seSettings
 * @desc Enable visualization for this audio type?
 */

var GBCCoffee = GBCCoffee || {};
GBCCoffee.AudioVisualizer = {
    switch: parseInt(PluginManager.parameters("GBCCoffee_AudioVisualizer")["switch"]),
    showInMap: eval(PluginManager.parameters("GBCCoffee_AudioVisualizer")["showInMap"]),
    showInBattle: eval(PluginManager.parameters("GBCCoffee_AudioVisualizer")["showInBattle"]),
    bgmBarRate: parseFloat(PluginManager.parameters("GBCCoffee_AudioVisualizer")["bgmBarRate"]),
    bgmColor1: PluginManager.parameters("GBCCoffee_AudioVisualizer")["bgmColor1"],
    bgmColor2: PluginManager.parameters("GBCCoffee_AudioVisualizer")["bgmColor2"],
    bgmEnabled: eval(PluginManager.parameters("GBCCoffee_AudioVisualizer")["bgmEnabled"]),
    bgsBarRate: parseFloat(PluginManager.parameters("GBCCoffee_AudioVisualizer")["bgsBarRate"]),
    bgsColor1: PluginManager.parameters("GBCCoffee_AudioVisualizer")["bgsColor1"],
    bgsColor2: PluginManager.parameters("GBCCoffee_AudioVisualizer")["bgsColor2"],
    bgsEnabled: eval(PluginManager.parameters("GBCCoffee_AudioVisualizer")["bgsEnabled"]),
    meBarRate: parseFloat(PluginManager.parameters("GBCCoffee_AudioVisualizer")["meBarRate"]),
    meColor1: PluginManager.parameters("GBCCoffee_AudioVisualizer")["meColor1"],
    meColor2: PluginManager.parameters("GBCCoffee_AudioVisualizer")["meColor2"],
    meEnabled: eval(PluginManager.parameters("GBCCoffee_AudioVisualizer")["meEnabled"]),
    seBarRate: parseFloat(PluginManager.parameters("GBCCoffee_AudioVisualizer")["seBarRate"]),
    seColor1: PluginManager.parameters("GBCCoffee_AudioVisualizer")["seColor1"],
    seColor2: PluginManager.parameters("GBCCoffee_AudioVisualizer")["seColor2"],
    seLimit: parseInt(PluginManager.parameters("GBCCoffee_AudioVisualizer")["seLimit"]),
    seEnabled: eval(PluginManager.parameters("GBCCoffee_AudioVisualizer")["seEnabled"]),
};

let gbccoffee_audiovisualizer_graphics_createallelements = Graphics._createAllElements;
Graphics._createAllElements = function() {
    gbccoffee_audiovisualizer_graphics_createallelements.call(this);
    this._createAudioCanvas();
};

let gbccoffee_audiovisualizer_graphics_updateallelements = Graphics._updateAllElements;
Graphics._updateAllElements = function() {
    gbccoffee_audiovisualizer_graphics_updateallelements.call(this);
    this._updateAudioCanvas();
};

Graphics._createAudioCanvas = function() {
    this._audioCanvas = document.createElement("canvas");
    this._audioCanvas.id = "audioCanvas";
    this._updateAudioCanvas();
};

Graphics._updateAudioCanvas = function() {
    this._audioCanvas.width = this._width;
    this._audioCanvas.height = this._height;
};

let gbccoffee_audiovisualizer_webaudio_startplaying = WebAudio.prototype._startPlaying;
WebAudio.prototype._startPlaying = function(offset) {
    this._createAnalyserNode();
    gbccoffee_audiovisualizer_webaudio_startplaying.call(this, offset);
};

WebAudio.prototype._createAnalyserNode = function() {
    this._analyser = WebAudio._context.createAnalyser();
    this._analyser.fftSize = 2048;
    this._bufferLength = this._analyser.frequencyBinCount;
    this._dataAray = new Uint8Array(this._bufferLength);
};

let gbccoffee_audiovisualizer_webaudio_createsourcenode = WebAudio.prototype._createSourceNode;
WebAudio.prototype._createSourceNode = function(index) {
    gbccoffee_audiovisualizer_webaudio_createsourcenode.call(this, index);
    const sourceNode = this._sourceNodes[index];
    sourceNode.connect(this._analyser);
};

WebAudio.prototype._updateAnalyser = function() {
    if (!this._analyser) return;
    this._analyser.getByteFrequencyData(this._dataAray);
};

let gbccoffee_audiovisualizer_gameswitches_initialize = Game_Switches.prototype.initialize;
Game_Switches.prototype.initialize = function() {
    gbccoffee_audiovisualizer_gameswitches_initialize.call(this);
    this._data[GBCCoffee.AudioVisualizer.switch] = true;
};

if (GBCCoffee.AudioVisualizer.showInMap || GBCCoffee.AudioVisualizer.showInBattle) {
    ConfigManager.visualizeAudio = true;
    let gbccoffee_audiovisualizer_configmanager_makedata = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = gbccoffee_audiovisualizer_configmanager_makedata.call(this);
        config.visualizeAudio = this.visualizeAudio;
        return config;
    };

    let gbccoffee_audiovisualizer_configmanager_applydata = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        gbccoffee_audiovisualizer_configmanager_applydata.call(this, config);
        this.visualizeAudio = this.readFlag(config, "visualizeAudio", true);
    };

    let gbccoffee_audiovisualizer_windowoptions_addgeneraloptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        gbccoffee_audiovisualizer_windowoptions_addgeneraloptions.call(this);
        this.addCommand("Audio Visualizer", "visualizeAudio");
    };
}

if (GBCCoffee.AudioVisualizer.showInBattle) {
    let gbccoffee_audiovisualizer_scenebattle_createspriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        gbccoffee_audiovisualizer_scenebattle_createspriteset.call(this);
        this._audioVisualizerSprite = new Sprite_AudioVisualizer();
        this.addChild(this._audioVisualizerSprite);
    };

    let gbccoffee_audiovisualizer_scenebattle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        this.removeChild(this._audioVisualizerSprite);
        gbccoffee_audiovisualizer_scenebattle_terminate.call(this);
    };
}

function Sprite_AudioVisualizer() {
    this.initialize(...arguments);
};

Sprite_AudioVisualizer.prototype = Object.create(Sprite.prototype);
Sprite_AudioVisualizer.prototype.constructor = Sprite_AudioVisualizer;

Sprite_AudioVisualizer.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._texture = PIXI.Texture.from(Graphics._audioCanvas);
};

Sprite_AudioVisualizer.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (!Graphics._audioCanvas) Graphics._createAudioCanvas();
    this.visible = this.isEnabled();
    if (this._texture && this.isEnabled()) {
        this.updateAudioCanvas();
        this._texture.update();
    }
};

Sprite_AudioVisualizer.prototype.isEnabled = function() {
    return ConfigManager.visualizeAudio && $gameSwitches.value(GBCCoffee.AudioVisualizer.switch);
};

Sprite_AudioVisualizer.prototype.updateAudioCanvas = function() {   
    const canvas = Graphics._audioCanvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawBgmVisualization(canvas, ctx);
};

Sprite_AudioVisualizer.prototype.drawBgmVisualization = function(canvas, ctx) {
    if (!GBCCoffee.AudioVisualizer.bgmEnabled) return;
    const bgmBuffer = AudioManager._bgmBuffer;
    if (!bgmBuffer) return;
    bgmBuffer._updateAnalyser();

    const dataArray = bgmBuffer._dataAray;
    if (!dataArray) return;

    const barHeight = 1;
    let barWidth;
    let barY = 5;

    const pan = bgmBuffer._pan || 0;
    const leftFactor = 1 - (pan + 1) / 2;
    const rightFactor = 1 - leftFactor;

    for (let i = 0; i < dataArray.length; i++) {
        barWidth = (65* dataArray[i] * (bgmBuffer._gainNode ? bgmBuffer._gainNode.gain.value : 10) * GBCCoffee.AudioVisualizer.bgmBarRate)-700;

        const leftBarWidth = barWidth * leftFactor;
        const gradientL = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradientL.addColorStop(0, GBCCoffee.AudioVisualizer.bgmColor1);
        gradientL.addColorStop(1, GBCCoffee.AudioVisualizer.bgmColor2);
        ctx.fillStyle = gradientL;
        ctx.fillRect(barY, canvas.height, 5, -leftBarWidth);


        barY += 5;
    }
};
