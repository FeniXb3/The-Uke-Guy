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
        // fonts
        this.load.bitmapFont('mainFont', 'assets/fonts/Sprinklescolors.png', 'assets/fonts/Sprinklescolors.fnt');
    },
    create: function () {
        'use strict';
        
        this.game.state.start('Preloader');
    }
};