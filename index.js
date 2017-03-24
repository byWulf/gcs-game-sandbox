var GameBase = require('gcs-game-base');
var Sleep = require('sleep');

GameBase.Game.init(function() {
    /**
     * Create all material
     */

    //Board
    var board = new GameBase.Elements.Type.Board();
    board.setWidth(30);
    board.setHeight(30);
    board.setImage('board.png');
    GameBase.Elements.registerElement(board);

    //PieceContainer
    var pieceContainer = new GameBase.Elements.Type.PieceContainer();
    pieceContainer.moveTo(board);
    pieceContainer.setStackElementRadius(1.5);

    var calc = function(pixel, maxPixel) {
        return 30/maxPixel*pixel-15;
    };

    pieceContainer.setPositions([
        {index: 1, x: calc(113, 357), y: calc(33, 295), next: {0: [17], 1: [17], 2: [17], 3: [17]}},
        {index: 2, x: calc(144, 357), y: calc(34, 295), next: {0: [17], 1: [17], 2: [17], 3: [17]}},
        {index: 3, x: calc(114, 357), y: calc(57, 295), next: {0: [17], 1: [17], 2: [17], 3: [17]}},
        {index: 4, x: calc(143, 357), y: calc(57, 295), next: {0: [17], 1: [17], 2: [17], 3: [17]}},
        {index: 5, x: calc(290, 357), y: calc(81, 295), next: {0: [21], 1: [21], 2: [21], 3: [21]}},
        {index: 6, x: calc(309, 357), y: calc(82, 295), next: {0: [21], 1: [21], 2: [21], 3: [21]}},
        {index: 7, x: calc(281, 357), y: calc(109, 295), next: {0: [21], 1: [21], 2: [21], 3: [21]}},
        {index: 8, x: calc(305, 357), y: calc(111, 295), next: {0: [21], 1: [21], 2: [21], 3: [21]}},
        {index: 9, x: calc(222, 357), y: calc(228, 295), next: {0: [25], 1: [25], 2: [25], 3: [25]}},
        {index: 10, x: calc(250, 357), y: calc(227, 295), next: {0: [25], 1: [25], 2: [25], 3: [25]}},
        {index: 11, x: calc(226, 357), y: calc(251, 295), next: {0: [25], 1: [25], 2: [25], 3: [25]}},
        {index: 12, x: calc(258, 357), y: calc(248, 295), next: {0: [25], 1: [25], 2: [25], 3: [25]}},
        {index: 13, x: calc(49, 357), y: calc(167, 295), next: {0: [29], 1: [29], 2: [29], 3: [29]}},
        {index: 14, x: calc(73, 357), y: calc(166, 295), next: {0: [29], 1: [29], 2: [29], 3: [29]}},
        {index: 15, x: calc(47, 357), y: calc(192, 295), next: {0: [29], 1: [29], 2: [29], 3: [29]}},
        {index: 16, x: calc(69, 357), y: calc(194, 295), next: {0: [29], 1: [29], 2: [29], 3: [29]}},
        {index: 17, x: calc(114, 357), y: calc(81, 295), next: {0: [18], 1: [18], 2: [18], 3: [18]}},
        {index: 18, x: calc(147, 357), y: calc(84, 295), next: {0: [19], 1: [19], 2: [19], 3: [19]}},
        {index: 19, x: calc(181, 357), y: calc(85, 295), next: {0: [20], 1: [20], 2: [20], 3: [20]}},
        {index: 20, x: calc(221, 357), y: calc(84, 295), next: {0: [21], 1: [21], 2: [21], 3: [21]}},
        {index: 21, x: calc(257, 357), y: calc(84, 295), next: {0: [22], 1: [22], 2: [22], 3: [22]}},
        {index: 22, x: calc(258, 357), y: calc(113, 295), next: {0: [23], 1: [23], 2: [23], 3: [23]}},
        {index: 23, x: calc(257, 357), y: calc(141, 295), next: {0: [24], 1: [24], 2: [24], 3: [24]}},
        {index: 24, x: calc(254, 357), y: calc(178, 295), next: {0: [25], 1: [25], 2: [25], 3: [25]}},
        {index: 25, x: calc(252, 357), y: calc(205, 295), next: {0: [26], 1: [26], 2: [26], 3: [26]}},
        {index: 26, x: calc(224, 357), y: calc(204, 295), next: {0: [27], 1: [27], 2: [27], 3: [27]}},
        {index: 27, x: calc(190, 357), y: calc(200, 295), next: {0: [28], 1: [28], 2: [28], 3: [28]}},
        {index: 28, x: calc(143, 357), y: calc(199, 295), next: {0: [29], 1: [29], 2: [29], 3: [29]}},
        {index: 29, x: calc(102, 357), y: calc(192, 295), next: {0: [30], 1: [30], 2: [30], 3: [30]}},
        {index: 30, x: calc(100, 357), y: calc(167, 295), next: {0: [31], 1: [31], 2: [31], 3: [31]}},
        {index: 31, x: calc(102, 357), y: calc(137, 295), next: {0: [32], 1: [32], 2: [32], 3: [32]}},
        {index: 32, x: calc(109, 357), y: calc(109, 295), next: {0: [17], 1: [17], 2: [17], 3: [17]}}
    ]);
    GameBase.Elements.registerElement(pieceContainer);

    //Pieces
    var colors = [
        "#ff0000",
        "#ffff00",
        "#00ff00",
        "#0000ff"
    ];
    var pieces = {};
    for (var i = 0; i < 4; i++) {
        pieces[i] = {};
        for (var j = 0; j < 4; j++) {
            pieces[i][j] = new GameBase.Elements.Type.Piece();
            pieces[i][j].setModel('figure.obj');
            pieces[i][j].setColor(colors[i]);
            pieces[i][j].userData.startIndex = i * 4 + j + 1;
            GameBase.Elements.registerElement(pieces[i][j]);
        }
    }

    //Die
    var dice = new GameBase.Elements.Type.Dice();
    GameBase.Elements.registerElement(dice);

    /**
     * Put the material on the table
     */
    board.moveTo(GameBase.Elements.Default.CenterContainer);

    for (var i = 0; i < 4; i++) {
        if (GameBase.Players.getSlot(i).getUser() === null) continue;

        for (var j = 0; j < 4; j++) {
            pieces[i][j].moveTo(pieceContainer, {index: pieces[i][j].userData.startIndex})
        }
    }

    dice.moveTo(GameBase.Elements.Default.CenterContainer);


    //When players join, put their personal material on the table. When they leave, put it back to the packageContainer
    GameBase.Players.eventEmitter.on('user.joined', function(slotIndex) {
        for (var j = 0; j < 4; j++) {
            pieces[slotIndex][j].moveTo(pieceContainer, {index: slotIndex*4+j+1})
        }
    });
    GameBase.Players.eventEmitter.on('user.switched', function(oldSlotIndex, newSlotIndex) {
        for (var j = 0; j < 4; j++) {
            pieces[oldSlotIndex][j].moveTo(GameBase.Elements.Default.PlayerContainer);
        }

        for (var j = 0; j < 4; j++) {
            pieces[newSlotIndex][j].moveTo(pieceContainer, {index: newSlotIndex*4+j+1})
        }
    });
    GameBase.Players.eventEmitter.on('user.left', function(slotIndex) {
        for (var j = 0; j < 4; j++) {
            pieces[slotIndex][j].moveTo(GameBase.Elements.Default.PackageContainer);
        }
    });

    /**
     * Game start - Here's the game logic
     */
    GameBase.Game.eventEmitter.on(GameBase.Game.Event.Started, function(slotIndex) {
        //Determine starting player and let him roll the die
        dice.canBeRolledBy(GameBase.Players.getFilledSlots()[0].getIndex());

        //After rolling, let the player move his pieces. If no move is possible, let the next player roll the die.
        dice.onAfterRoll = function(slotIndex, value) {
            var hasTargets = false;
            for (var i = 0; i < 4; i++) {
                var canBeMovedBy = [];
                var targetIndexes = pieceContainer.calculateNextIndexes(pieces[slotIndex][i].getParent().data.index, value, slotIndex);
                for (var j = 0; j < targetIndexes.length; j++) {
                    hasTargets = true;
                    canBeMovedBy.push({slotIndex: slotIndex, target: {id: pieceContainer.getId(), data: {index: targetIndexes[j]}}});
                }
                pieces[slotIndex][i].canBeMovedBy(canBeMovedBy);
            }

            if (!hasTargets) {
                dice.canBeRolledBy(GameBase.Players.getNextSlotIndex(slotIndex));
            }
        };

        //After moving his piece, check if a piece was already on the pieceContainerIndex and kick it back into the base.
        //After that, let the next player roll the die
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                pieces[i][j].onAfterMove = function(slotIndex, target) {
                    var indexPieces = pieceContainer.getChildren(target.data.index);
                    for (var k = 0; k < indexPieces.length; k++) {
                        if (indexPieces[k] === this) continue;

                        indexPieces[k].moveTo(pieceContainer, {index: indexPieces[k].userData.startIndex});
                    }
                    if (indexPieces.length > 1) {
                        Sleep.sleep(1);
                    }

                    dice.canBeRolledBy(GameBase.Players.getNextSlotIndex(slotIndex));
                }
            }
        }
    });
});