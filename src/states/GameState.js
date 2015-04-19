/*global Ukulele */
/*global Config */

Ukulele.Game = function (game) { 'use strict'; };

Ukulele.Game.prototype.create = function () {
    'use strict';

    this.mainFont = "mainFont";
    this.game.world.setBounds(0, 0, Config.MAP_WIDTH, Config.MAP_HEIGHT);
    
    this.drawSun();
    
    this.setupUkeGuy();
    
    
    //this.displayTitle();
    
    this.gameStart = this.game.time.now;
    this.over = false;
};

Ukulele.Game.prototype.update = function () {
    'use strict';
};

Ukulele.Game.prototype.drawSun = function () {
    'use strict';
    
    var sunGfx = this.game.add.graphics(0, 0);
    sunGfx.beginFill(0xFFAA00, 1);
    sunGfx.drawCircle(100, 100, 100);
};


Ukulele.Game.prototype.setupUkeGuy = function () {
    'use strict';
    this.ukeGuy = this.game.add.sprite(200, 400, 'ukeGuy');
    this.ukeGuy.scale.x = 0.25;
    this.ukeGuy.scale.y = 0.25;
};

Ukulele.Game.prototype.isTheEnd = function () {
    'use strict';
    var that = this,
        gameTime;
    
    this.over = true;
    this.gameOverLabel = this.game.add.bitmapText(0, 0, this.mainFont, "Game Over", 50);
    this.gameOverLabel.tint = 0xFF1111;
    
    
    this.gameOverLabel.updateTransform();
    this.gameOverLabel.x = Config.MAP_WIDTH / 2 - this.gameOverLabel.width / 2;
    this.gameOverLabel.y = Config.MAP_HEIGHT / 2;

    gameTime = this.game.time.now - this.gameStart;

    setTimeout(function () {
        that.game.state.start('Boot', true, false);
    }, 3000);
};

Ukulele.Game.prototype.displayTitle = function () {
    'use strict';
    this.title = this.game.add.bitmapText(0, 0, this.mainFont,  '% Ukulele %', 62);
    this.title.x = Config.MAP_WIDTH / 2 - this.title.width / 2;
    this.title.y = Config.MAP_HEIGHT / 12;

    this.titleLong = this.game.add.bitmapText(0, 0, this.mainFont,  'An Uconventional Weapon', 62);
    this.titleLong.x = Config.MAP_WIDTH / 2 - this.titleLong.width / 2;
    this.titleLong.y = Config.MAP_HEIGHT / 12 + 65;

    this.titleFeniX = this.game.add.bitmapText(0, 0, this.mainFont,  'by FeniX', 26);
    this.titleFeniX.x = Config.MAP_WIDTH / 2 - this.titleFeniX.width / 2;
    this.titleFeniX.y = Config.MAP_HEIGHT / 12 + 150;
    this.titleFeniX.tint = 0x00FF00;
    
    this.titleLD = this.game.add.bitmapText(0, 0, this.mainFont,  'Ludum Dare 32', 24);
    this.titleLD.x = Config.MAP_WIDTH / 2 - this.titleLD.width / 2;
    this.titleLD.y = Config.MAP_HEIGHT / 12 + 185;

    this.titleDino = this.game.add.bitmapText(0, 0, this.mainFont,  '+', 62);
    this.titleDino.x = Config.MAP_WIDTH / 2 - this.titleDino.width / 2;
    this.titleDino.y = Config.MAP_HEIGHT / 12 + 215;
};
