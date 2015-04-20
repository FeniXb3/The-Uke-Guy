/*global Ukulele */
/*global Config */
/*global SadGuy */
/*global console */
/*jslint plusplus: true */
/*global Phaser */

Ukulele.Game = function (game) { 'use strict'; };

Ukulele.Game.prototype.create = function () {
    'use strict';

    this.mainFont = "mainFont";
    this.game.world.setBounds(0, 0, Config.MAP_WIDTH, Config.MAP_HEIGHT);
    
    this.drawSky();
    this.drawGround();
    this.drawSun();
    
    this.setupUkeGuy();
    this.setupSadGuys();
    this.setupSounds();
    this.setupControls();
    
    
    //this.displayTitle();
    
    this.gameStart = this.game.time.now;
    this.over = false;
};

Ukulele.Game.prototype.update = function () {
    'use strict';
    this.checkCollisions();
};

Ukulele.Game.prototype.checkCollisions = function () {
    'use strict';
    this.game.physics.arcade.overlap(this.sadGuy, this.ukeGuy, this.collideGuys, null, this);
};


Ukulele.Game.prototype.collideGuys = function (sadGuy, ukeGuy) {
    'use strict';
    sadGuy.metUkeGuy = true;
    
    this.isTheEnd();
    //if (sadGuy.isSad) {
    //}
};


Ukulele.Game.prototype.drawSky = function () {
    'use strict';
    
    var sky = this.game.add.graphics(0, 0);
    sky.beginFill(0x3311FF, 1);
    sky.drawRect(0, 0, Config.MAP_WIDTH, Config.MAP_HEIGHT / 3 * 2);
};
Ukulele.Game.prototype.drawGround = function () {
    'use strict';
    
    var ground = this.game.add.graphics(0, 0);
    ground.beginFill(0xf4a460, 1);
    ground.drawRect(0, Config.MAP_HEIGHT / 3 * 2, Config.MAP_WIDTH, Config.MAP_HEIGHT / 3);
};
Ukulele.Game.prototype.drawSun = function () {
    'use strict';
    
    var sunGfx = this.game.add.graphics(0, 0);
    sunGfx.beginFill(0xFFAA00, 1);
    sunGfx.drawCircle(100, 100, 100);
};


Ukulele.Game.prototype.setupUkeGuy = function () {
    'use strict';
    this.ukeGuy = this.game.add.sprite(100, Config.MAP_HEIGHT / 3 * 2, 'ukeGuy');
    this.game.physics.enable(this.ukeGuy, Phaser.Physics.ARCADE);
    this.ukeGuy.anchor.y = 0.75;
    this.ukeGuy.anchor.x = 0.5;
    this.ukeGuy.angle = 35;
};

Ukulele.Game.prototype.setupSadGuys = function () {
    'use strict';
    this.sadGuy = new SadGuy(this.game, Config.MAP_WIDTH, Config.MAP_HEIGHT / 3 * 2, 'sadGuy');
    
};


Ukulele.Game.prototype.setupSounds = function () {
    'use strict';
    var i = 1,
        max = 5;
    this.sounds = {};
    
    this.sounds.DRUM = this.game.add.audio('drum');
    this.sounds.G = this.game.add.audio('g');
    this.sounds.G.frets = [];
    for (i = 1; i <= max; i++) {
        this.sounds.G.frets.push(this.game.add.audio('g' + i));
    }
    this.sounds.C = this.game.add.audio('c');
    this.sounds.C.frets = [];
    for (i = 1; i <= max; i++) {
        this.sounds.C.frets.push(this.game.add.audio('c' + i));
    }
    this.sounds.E = this.game.add.audio('e');
    this.sounds.E.frets = [];
    for (i = 1; i <= max; i++) {
        this.sounds.E.frets.push(this.game.add.audio('e' + i));
    }
    this.sounds.A = this.game.add.audio('a');
    this.sounds.A.frets = [];
    for (i = 1; i <= max; i++) {
        this.sounds.A.frets.push(this.game.add.audio('a' + i));
    }
};

Ukulele.Game.prototype.setupControls = function () {
    'use strict';
    var i = 1,
        max = 5;
    
    this.drumKey = this.game.input.keyboard.addKey(Config.Controls.DRUM);
    this.drumKey.onDown.add(this.handleDrumKeyDown, this);

    this.gKey = this.game.input.keyboard.addKey(Config.Controls.G.Key);
    for (i = 1; i <= max; i++) {
        this.game.input.keyboard.addKey(Config.Controls.G.Frets[i]);
    }
    this.gKey.onDown.add(this.handleGKeyDown, this);
    
    this.cKey = this.game.input.keyboard.addKey(Config.Controls.C.Key);
    for (i = 1; i <= max; i++) {
        console.log(Config.Controls.C.Frets[i]);
        this.game.input.keyboard.addKey(Config.Controls.C.Frets[i]);
    }
    this.cKey.onDown.add(this.handleCKeyDown, this);
    
    this.eKey = this.game.input.keyboard.addKey(Config.Controls.E.Key);
    for (i = 1; i <= max; i++) {
        this.game.input.keyboard.addKey(Config.Controls.E.Frets[i]);
    }
    this.eKey.onDown.add(this.handleEKeyDown, this);
    
    this.aKey = this.game.input.keyboard.addKey(Config.Controls.A.Key);
    for (i = 1; i <= max; i++) {
        this.game.input.keyboard.addKey(Config.Controls.A.Frets[i]);
    }
    this.aKey.onDown.add(this.handleAKeyDown, this);
};

Ukulele.Game.prototype.handleDrumKeyDown = function (key) {
    'use strict';
    this.sounds.DRUM.play();
    this.checkNote('DRUM');
};

Ukulele.Game.prototype.handleGKeyDown = function (key) {
    'use strict';
    this.playAndCheck(Config.Controls.G, this.sounds.G, 'G');
};

Ukulele.Game.prototype.handleCKeyDown = function (key) {
    'use strict';
    
    this.playAndCheck(Config.Controls.C, this.sounds.C, 'C');
};

Ukulele.Game.prototype.handleEKeyDown = function (key) {
    'use strict';
    this.playAndCheck(Config.Controls.E, this.sounds.E, 'E');
};

Ukulele.Game.prototype.handleAKeyDown = function (key) {
    'use strict';
    this.playAndCheck(Config.Controls.A, this.sounds.A, 'A');
};

Ukulele.Game.prototype.playAndCheck = function (control, sound, note) {
    'use strict';
    var i = 1,
        max = 5;
    
    for (i = max; i > 0; i--) {
        if (this.game.input.keyboard._keys[control.Frets[i]].isDown) {
            break;
        }
    }
    
    if (i > 0) {
        sound.frets[(i - 1)].play();
        this.checkNote(note + (i));
    } else {
        sound.play();
        this.checkNote(note);
    }
};

Ukulele.Game.prototype.checkNote = function (note) {
    'use strict';
    
    console.log(this.sadGuy.happySong.currentNote);
    console.log(this.sadGuy.happySong.notes[this.sadGuy.happySong.currentNote]);
    if (this.sadGuy.happySong.currentNote < this.sadGuy.happySong.notes.length
            && this.sadGuy.happySong.notes[this.sadGuy.happySong.currentNote] === note) {
        this.sadGuy.happySong.currentNote += 1;
    }
};


Ukulele.Game.prototype.isTheEnd = function () {
    'use strict';
    var that = this,
        gameTime;
    
    this.over = true;
    this.displayTitle();
    
    if (this.sadGuy.isSad) {
        this.gameOverLabel = this.game.add.bitmapText(0, 0, this.mainFont, "Game Over", 50);
        this.gameOverLabel.tint = 0xFF1111;
    } else {
        this.gameOverLabel = this.game.add.bitmapText(0, 0, this.mainFont, "You defeated sadness with ukulele!", 50);
        this.gameOverLabel.tint = 0x00FF00;
    }
    
    this.gameOverLabel.updateTransform();
    this.gameOverLabel.x = Config.MAP_WIDTH / 2 - this.gameOverLabel.width / 2;
    this.gameOverLabel.y = Config.MAP_HEIGHT / 2;

    gameTime = this.game.time.now - this.gameStart;

    setTimeout(function () {
        that.game.state.start('Game', true, false);
    }, 3000);
};

Ukulele.Game.prototype.displayTitle = function () {
    'use strict';
    this.title = this.game.add.bitmapText(0, 0, this.mainFont,  '% The Uke Guy %', 62);
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
