// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "dice", gameRoute);
    var diceGroup;
    var text;

    var gameRoute = {


        preload: function () {

            // centre the canvas
            this.game.load.spritesheet("dice", "images/dice.png", 64, 64);
            this.game.load.script("BlurX", "scripts/BlurX.js");
            this.game.load.script("BlurY", "scripts/BlurY.js");
        },


        create: function () {

            diceGroup = this.game.add.group();

            var i;
            for (i = 0; i < 5; i++) {
                var d = new Dice(this.game, i * 100 + 90, 190);
                diceGroup.add(d);
            }

            // roll the dice when a mouse button is clicked
            this.game.input.onDown.add(
            function () {
                var total = 0;
                diceGroup.callAll("roll", null);
            });


            text = this.game.add.text(30, 90, "Total: ");
            text.fontSize = 30;
            text.fill = "#d3d3d3";

        },

        update: function () {
            // I don't like having the foreach code run so often.
            // Ideally it would only be run when the dice have finished
            // rolling, but I haven't worked out how to do that yet.
            var total = 0;
            diceGroup.forEach(function (item) { total += item.value(); });
            text.setText("Total: " + total);
        },
    };

    game.state.add('gameRoute', gameRoute);
    game.state.start('gameRoute');

})();