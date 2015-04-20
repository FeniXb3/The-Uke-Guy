/*global Phaser */
/*jslint plusplus: true */

var SadGuy = function (game, x, y, image, velocity) {
    'use strict';
    x = x || 0;
    y = y || 0;
    velocity = velocity || -66;
    
    Phaser.Sprite.call(this, game, x, y, image);
    this.game.add.existing(this);

    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    //this.body.collideWorldBounds = true;
    this.scale.x = 0.5;
    this.scale.y = 0.5;
    
    this.tint = 0x333333;
    this.isSad = true;
    this.metUkeGuy = false;
    
    this.noteBox = this.game.add.sprite(0, -100, 'noteBox');
    this.noteBox.anchor.setTo(1, 1);
    this.noteBox.scale.x = 5;
    this.noteBox.scale.y = 6;
    
    this.currentNoteText = this.game.add.bitmapText(-20, -10, 'mainFont', 'Music...', 15);
    this.currentNoteText.anchor.setTo(1, 1);
    
    this.noteBox.addChild(this.currentNoteText);
    this.addChild(this.noteBox);
    
    this.startX = x;
    this.startY = y;
    this.startVelocity = velocity;
    this.songPlayed = false;
    
    //this.setupHappySong();
    
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

SadGuy.prototype.reset = function () {
    'use strict';
    this.x = this.startX;
    this.y = this.startY;
    this.velocity = this.startVelocity;
    this.tint = 0x333333;
    this.metUkeGuy = false;
    this.isSad = true;
};


SadGuy.prototype.update = function () {
    'use strict';
    
    if (!this.isSad && this.metUkeGuy) {
        this.velocity = 0;
        this.currentNoteText.text = "Play!";
        if (!this.happySong.whole.isPlaying && !this.songPlayed) {
            this.songPlayed = true;
            this.happySong.whole.play();
        }
    } else {
        if (this.isSad) {
            this.velocity = this.startVelocity;
        } else {
            this.velocity = this.startVelocity * 3;
        }
        
        if (this.happySong.notes[this.happySong.currentNote]) {
            this.currentNoteText.text = this.happySong.notes[this.happySong.currentNote];
        }
    }
    
    if (this.happySong.currentNote === this.happySong.notes.length && this.isSad) {
        this.isSad = false;
        this.tint = 0xFFFFFF;
        this.happySong.sad.stop();
        
        this.currentNoteText.text = "Happy!";
    }
};

SadGuy.prototype.setupHappySong = function (song) {
    'use strict';
    this.happySong = song;
    this.happySong.currentNote = 0;
    this.happySong.sad.loopFull();
};