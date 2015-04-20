/*global Ukulele */
/*jslint plusplus: true */
/*global Config */

Ukulele.Preloader = function (game) { 'use strict'; };
Ukulele.Preloader.prototype = {
    preload: function () {
        'use strict';
        var i = 1,
            max = 5;
        this.mainFont = 'mainFont';
        
        this.preloadBox = this.add.sprite(Config.MAP_WIDTH / 2, Config.MAP_HEIGHT / 2, 'loadingBox');
        this.preloadBox.x -= this.preloadBox.width / 2;
        //this.preloadBox.anchor.setTo(0.5, 0.5);
        this.preloadBar = this.add.sprite(Config.MAP_WIDTH / 2, Config.MAP_HEIGHT / 2, 'loadingBar');
        this.preloadBar.x -= this.preloadBar.width / 2;
        //this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);
        
        
        this.displayTitle();
        
        
        // player
        this.load.image('ukeGuy', 'assets/graphics/ukeGuy.png');
        // sad guys
        this.load.image('sadGuy', 'assets/graphics/sadGuy.png');
        this.load.image('noteBox', 'assets/graphics/noteBox.png');
        
        
        this.load.spritesheet('forkme', 'assets/graphics/forkme.png');
        
        // sounds
        this.load.audio('drum', 'assets/audio/drum.mp3');
        this.load.audio('g', 'assets/audio/g.mp3');
        for (i = 1; i <= max; i++) {
            this.load.audio('g' + i, 'assets/audio/g/g' + i + '.mp3');
        }
        this.load.audio('c', 'assets/audio/c.mp3');
        
        for (i = 1; i <= max; i++) {
            this.load.audio('c' +  i, 'assets/audio/c/c' + i + '.mp3');
        }
        this.load.audio('e', 'assets/audio/e.mp3');
        for (i = 1; i <= max; i++) {
            this.load.audio('e' +  i, 'assets/audio/e/e' + i + '.mp3');
        }
        this.load.audio('a', 'assets/audio/a.mp3');
        for (i = 1; i <= max; i++) {
            this.load.audio('a' +  i, 'assets/audio/a/a' + i + '.mp3');
        }
        this.load.audio('firstHappySong', 'assets/audio/firstHappySong.mp3');
        
    },
    create: function () {
        'use strict';
        this.game.state.start('Game');
    }
};

Ukulele.Preloader.prototype.displayTitle = function () {
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