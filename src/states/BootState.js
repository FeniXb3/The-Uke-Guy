/*
    Font - Sprinklescolors by Des - http://www.fontspace.com/des/sprinklescolors
        converted to bitmap font with Littera - http://kvazars.com/littera/
*/

/*global Config */

var Ukulele = {};

Ukulele.Boot = function (game) { 'use strict'; };
Ukulele.Boot.prototype = {
    preload: function () {
        'use strict';
        // loading
        this.load.image('loadingBox', 'assets/graphics/progressEmpty.png');
        this.load.image('loadingBar', 'assets/graphics/progressFull.png');
        // fonts
        this.load.bitmapFont('mainFont', 'assets/fonts/Sprinklescolors.png', 'assets/fonts/Sprinklescolors.fnt');
    },
    create: function () {
        'use strict';
        
        this.game.state.start('Preloader');
    }
};