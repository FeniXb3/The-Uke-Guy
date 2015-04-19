/*global Ukulele */

Ukulele.Preloader = function (game) { 'use strict'; };
Ukulele.Preloader.prototype = {
    preload: function () {
        'use strict';
        
        // player
        this.load.image('ukeGuy', 'assets/graphics/ukeGuy.png');
        
        
    },
    create: function () {
        'use strict';
        this.game.state.start('Game');
    }
};
