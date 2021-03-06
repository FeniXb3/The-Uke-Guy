/*global Phaser */

var TextButton = function (game, x, y, label, callback, callbackContext, normalColor, hoverColor) {
    'use strict';
    Phaser.Button.call(this, game, x, y, '', callback, callbackContext);
    this.anchor.setTo(0.5, 0.5);
    
    this.normalColor = normalColor || 0xAAAAAA;
    this.hoverColor = hoverColor || 0xDDDDDD;
    
    this.label = this.game.add.bitmapText(0, 0, 'mainFont', label, 29);
    this.label.x = -this.label.width / 2;
    this.label.tint = this.normalColor;
    this.label.align = 'center';
    this.addChild(this.label);
    
    this.events.onInputOver.add(this.onButtonHover, this);
    this.events.onInputOut.add(this.onButtonOut, this);
    
    this.game.add.existing(this);
};
TextButton.prototype = Object.create(Phaser.Button.prototype);
TextButton.prototype.constructor = TextButton;

TextButton.prototype.onButtonHover = function (pointer, event) {
    'use strict';
    this.label.tint = this.hoverColor;
};

TextButton.prototype.onButtonOut = function () {
    'use strict';
    this.label.tint = this.normalColor;
};