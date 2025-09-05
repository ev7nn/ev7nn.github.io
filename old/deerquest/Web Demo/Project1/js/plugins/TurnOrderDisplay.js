//=============================================================================
// RPG Maker MZ - Turn Order Display
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Display turn order in battle.
 * @author KhaoTom
 *
 * @help TurnOrderDisplay.js
 *
 * This plugin adds display of turn order.
 */



(() => {
    function Window_TurnOrder() {
        this.initialize(...arguments)
    };

    Window_TurnOrder.prototype = Object.create(Window_Base.prototype);
    Window_TurnOrder.prototype.constructor = Window_TurnOrder;

    Window_TurnOrder.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.frameVisible = false;
        this.padding = 4;
        this.createContents();
    };

    Window_TurnOrder.prototype.update = function() {
        this.contents.clear();
        var battlers = BattleManager.allBattleMembers()
        battlers.sort((a,b) => (a.tpbChargeTime() > b.tpbChargeTime()) ? 1 : -1)
        var r = 16;
        var d = 32;
        var iw = this.innerWidth - d;
        var y = this.innerHeight / 2 - r;
        for (const battler of battlers) {
            if (battler.isAlive())
            {
                var x = (1 - battler.tpbChargeTime()) * iw;
                if (battler.isActor()) {
                    this.drawFace(battler.faceName(), battler.faceIndex(), x, y, d, d)
                }
                else
                {
                    this.drawEnemy(battler.battlerName(), x, y, d, d)
                }
            }
        }
    };

    Window_TurnOrder.prototype.drawFace = function(
        faceName, faceIndex, dx, dy, dw, dh
    ) {
        const bitmap = ImageManager.loadFace(faceName);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sx = (faceIndex % 4) * pw;
        const sy = Math.floor(faceIndex / 4) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);
    };

    Window_TurnOrder.prototype.drawEnemy = function(
        battlerName, dx, dy, dw, dh
    ) {
        const bitmap = ImageManager.loadEnemy(battlerName);
        const pw = bitmap.width;
        const ph = bitmap.height;
        this.contents.blt(bitmap, 0, 0, pw, ph, dx, dy, dw, dh);
    };

    Scene_Battle.prototype.createAllWindows = function() {
        this.createLogWindow();
        this.createStatusWindow();
        this.createPartyCommandWindow();
        this.createActorCommandWindow();
        this.createHelpWindow();
        this.createSkillWindow();
        this.createItemWindow();
        this.createActorWindow();
        this.createEnemyWindow();
        this.createTurnOrderWindow();
        Scene_Message.prototype.createAllWindows.call(this);
    };

    Scene_Battle.prototype.logWindowRect = function() {
        const wx = 0;
        const wy = 48;
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(10, false);
        return new Rectangle(wx, wy, ww, wh);
    };
    
    Scene_Battle.prototype.turnOrderWindowRect = function() {
        return new Rectangle(0, 0, Graphics.boxWidth, 48)
    };
 
    Scene_Battle.prototype.createTurnOrderWindow = function() {
        const rect = this.turnOrderWindowRect();
        const turnorderWindow = new Window_TurnOrder(rect);
        this.addWindow(turnorderWindow);
        this._turnOrderWindow = turnorderWindow;
    };

    Scene_Battle.prototype.helpAreaTop = function() {
        return 48;
    };
})();