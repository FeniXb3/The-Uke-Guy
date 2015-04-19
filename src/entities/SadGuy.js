/*global Phaser */
/*jslint plusplus: true */

var SadGuy = function (game, x, y, image) {
    'use strict';
    x = x || 0;
    y = y || 0;
    
    Phaser.Sprite.call(this, game, x, y, image);
    this.game.add.existing(this);

    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.scale.x = 0.5;
    this.scale.y = 0.5;
    
    this.tint = 0x333333;
    this.isSad = true;
    
    this.setupHappySong();
    
};

SadGuy.prototype = Object.create(Phaser.Sprite.prototype);
SadGuy.prototype.constructor = SadGuy;


Object.defineProperty(SadGuy.prototype, "velocity", {
    get: function () {
        'use strict';
        return this.body.velocity.x;
    },
    set: function (value) {
        'use strict';
        this.body.velocity.x = value;
        this.body.velocity.y = 0;
    }
});

SadGuy.prototype.update = function () {
    'use strict';
    
    this.velocity = -66;
    
    if (this.happySong.currentNote === this.happySong.notes.length && this.isSad) {
        this.isSad = false;
        this.tint = 0xFFFFFF;
        this.happySong.whole.play();
    }
};

SadGuy.prototype.setupHappySong = function () {
    'use strict';
    this.happySong = {};
    this.happySong.whole = this.game.add.audio('firstHappySong');
    
    this.happySong.notes = [
        'G',
        'A',
        'E',
        'C',
        'G',
        'DRUM'
    ];
    
    this.happySong.currentNote = 0;
};