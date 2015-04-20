/*global Ukulele */
/*global Config */
/*global Phaser */
/*global TextButton */
/*jslint plusplus: true */

Ukulele.MainMenu = function (game) { 'use strict'; };
Ukulele.MainMenu.prototype = {
    loadMenusData: function () {
        'use strict';
        this.menus = this.game.cache.getJSON('menusData');
    }
};

Ukulele.MainMenu.prototype.create = function () {
    'use strict';
    this.mainFont = 'mainFont';
    this.displayTitle();
    this.showControls();
    this.displayMenu();
    this.setupSounds();
    this.setupControls();
};


Ukulele.MainMenu.prototype.setupControls = function () {
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

Ukulele.MainMenu.prototype.handleDrumKeyDown = function (key) {
    'use strict';
    this.sounds.DRUM.play();
    this.updateTryout('DRUM');
};

Ukulele.MainMenu.prototype.handleGKeyDown = function (key) {
    'use strict';
    this.playAndCheck(Config.Controls.G, this.sounds.G, 'G');
};

Ukulele.MainMenu.prototype.handleCKeyDown = function (key) {
    'use strict';
    
    this.playAndCheck(Config.Controls.C, this.sounds.C, 'C');
};

Ukulele.MainMenu.prototype.handleEKeyDown = function (key) {
    'use strict';
    this.playAndCheck(Config.Controls.E, this.sounds.E, 'E');
};

Ukulele.MainMenu.prototype.handleAKeyDown = function (key) {
    'use strict';
    this.playAndCheck(Config.Controls.A, this.sounds.A, 'A');
};

Ukulele.MainMenu.prototype.playAndCheck = function (control, sound, note) {
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
        this.updateTryout(note + i);
    } else {
        sound.play();
        this.updateTryout(note);
    }
};

Ukulele.MainMenu.prototype.setupSounds = function () {
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


Ukulele.MainMenu.prototype.displayMenu = function () {
    'use strict';
    var x = Config.MAP_WIDTH / 2,
        y = Config.MAP_HEIGHT * 6 / 7 + 20,
        distance = 30;
    
    this.startButton = new TextButton(this.game, x, y, '% Start game %', this.startGame, this);
};

Ukulele.MainMenu.prototype.startGame = function () {
    'use strict';
    this.game.state.start('Game');
};

Ukulele.MainMenu.prototype.showControls = function () {
    'use strict';
    var controlsText = '',
        fretsText = '',
        testText = '';
    
    controlsText = 'Controls:\n'
        + 'There are 4 uke strings sounds:\n'
        + 'G - [Shift]\n'
        + 'C - [Enter]\n'
        + 'E - [Backslash]\n'
        + 'A - [Backspace]\n'
        + '\nAn additional sound:\n'
        + 'DRUM - [Ctrl]';
    
    this.controls = this.game.add.bitmapText(10, 0, this.mainFont,  controlsText, 27);
    //this.controls.x = Config.MAP_WIDTH / 2 - this.title.width / 2;
    this.controls.y = Config.MAP_HEIGHT / 12 + 180;
    this.controls.tint = 0x5AFA5A;
    
    fretsText = 'In each keyboard row there are sound\n'
        + 'modifiers - hold one and press string key:\n'
        + 'G - [z], [x], [c], [v], [b]\n'
        + 'C - [a], [s], [d], [f], [g]\n'
        + 'E - [q], [w], [e], [r], [t]\n'
        + 'A - [1], [2], [3], [4], [5]\n';
    this.frets = this.game.add.bitmapText(10, 0, this.mainFont,  fretsText, 27);
    this.frets.x = Config.MAP_WIDTH / 2 - 20;// - this.title.width / 2;
    this.frets.y = Config.MAP_HEIGHT / 12 + 180;
    this.frets.tint = 0x5AFA5A;
    
    testText = '\n  YOU CAN TEST HERE!\n Hold [z] and press [shift]!';
    this.test = this.game.add.bitmapText(10, 0, this.mainFont,  testText, 27);
    this.test.x = Config.MAP_WIDTH / 2 - 20;// - this.title.width / 2;
    this.test.y = Config.MAP_HEIGHT / 12 + 360;
    this.test.tint = 0xFF6600;
    
    this.tryout = this.game.add.bitmapText(10, 0, this.mainFont,  'Sound: ', 27);
    this.tryout.x = Config.MAP_WIDTH / 2 + 270;// - this.title.width / 2;
    this.tryout.y = Config.MAP_HEIGHT / 12 + 450;
    this.tryout.tint = 0xFFAA00;
};

Ukulele.MainMenu.prototype.updateTryout = function (sound) {
    'use strict';
    this.tryout.text = 'Sound: ' + sound;
};

Ukulele.MainMenu.prototype.displayTitle = function () {
    'use strict';
    
    this.title = this.game.add.bitmapText(0, 0, this.mainFont,  '% The Uke Guy %', 62);
    this.title.x = Config.MAP_WIDTH / 2 - this.title.width / 2;
    this.title.y = Config.MAP_HEIGHT / 12 - 50;

    this.titleLong = this.game.add.bitmapText(0, 0, this.mainFont,  'An Uconventional Weapon', 42);
    this.titleLong.x = Config.MAP_WIDTH / 2 - this.titleLong.width / 2;
    this.titleLong.y = Config.MAP_HEIGHT / 12 + 65 - 50;

    this.titleFeniX = this.game.add.bitmapText(0, 0, this.mainFont,  'by FeniX', 26);
    this.titleFeniX.x = Config.MAP_WIDTH / 2 - this.titleFeniX.width / 2;
    this.titleFeniX.y = Config.MAP_HEIGHT / 12 + 120 - 50;
    this.titleFeniX.tint = 0x00FF00;
    
    this.titleLD = this.game.add.bitmapText(0, 0, this.mainFont,  'Ludum Dare 32', 24);
    this.titleLD.x = Config.MAP_WIDTH / 2 - this.titleLD.width / 2;
    this.titleLD.y = Config.MAP_HEIGHT / 12 + 155 - 50;

    //this.titleDino = this.game.add.bitmapText(0, 0, this.mainFont,  '+', 62);
    //this.titleDino.x = Config.MAP_WIDTH / 2 - this.titleDino.width / 2;
    //this.titleDino.y = Config.MAP_HEIGHT / 12 + 215;
};