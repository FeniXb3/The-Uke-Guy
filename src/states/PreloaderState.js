/*global Ukulele */

Ukulele.Preloader = function (game) { 'use strict'; };
Ukulele.Preloader.prototype = {
    preload: function () {
        'use strict';
        
        // player
        this.load.image('ukeGuy', 'assets/graphics/ukeGuy.png');
        
        // sad guys
        this.load.image('sadGuy', 'assets/graphics/sadGuy.png');
        
        // sounds
        this.load.audio('drum', 'assets/audio/drum.mp3');
        this.load.audio('g', 'assets/audio/g.mp3');
        this.load.audio('c', 'assets/audio/c.mp3');
        this.load.audio('e', 'assets/audio/e.mp3');
        this.load.audio('a', 'assets/audio/a.mp3');
        this.load.audio('firstHappySong', 'assets/audio/firstHappySong.mp3');
        
    },
    create: function () {
        'use strict';
        this.game.state.start('Game');
    }
};
