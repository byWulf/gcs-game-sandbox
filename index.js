var GameBase = require('gcs-game-base');

GameBase.Game.init(function() {
    //Create all material
    var board = new GameBase.Elements.Type.Board();
    board.setWidth(30);
    board.setHeight(30);
    board.setImage('board.png');
    GameBase.Elements.registerElement(board);

    var pieceContainer = new GameBase.Elements.Type.PieceContainer();
    pieceContainer.moveTo(board);
    pieceContainer.setStackElementRadius(1.5);

    var calc = function(pixel, maxPixel) {
        return 30/maxPixel*pixel-15;
    };

    pieceContainer.setPositions([
        {index: 1, x: calc(113, 357), y: calc(33, 295), next: [17]},
        {index: 2, x: calc(144, 357), y: calc(34, 295), next: [17]},
        {index: 3, x: calc(114, 357), y: calc(57, 295), next: [17]},
        {index: 4, x: calc(143, 357), y: calc(57, 295), next: [17]},
        {index: 5, x: calc(290, 357), y: calc(81, 295), next: [21]},
        {index: 6, x: calc(309, 357), y: calc(82, 295), next: [21]},
        {index: 7, x: calc(281, 357), y: calc(109, 295), next: [21]},
        {index: 8, x: calc(305, 357), y: calc(111, 295), next: [21]},
        {index: 9, x: calc(222, 357), y: calc(228, 295), next: [25]},
        {index: 10, x: calc(250, 357), y: calc(227, 295), next: [25]},
        {index: 11, x: calc(226, 357), y: calc(251, 295), next: [25]},
        {index: 12, x: calc(258, 357), y: calc(248, 295), next: [25]},
        {index: 13, x: calc(49, 357), y: calc(167, 295), next: [29]},
        {index: 14, x: calc(73, 357), y: calc(166, 295), next: [29]},
        {index: 15, x: calc(47, 357), y: calc(192, 295), next: [29]},
        {index: 16, x: calc(69, 357), y: calc(194, 295), next: [29]},
        {index: 17, x: calc(114, 357), y: calc(81, 295), next: [18]},
        {index: 18, x: calc(147, 357), y: calc(84, 295), next: [19]},
        {index: 19, x: calc(181, 357), y: calc(85, 295), next: [20]},
        {index: 20, x: calc(221, 357), y: calc(84, 295), next: [21]},
        {index: 21, x: calc(257, 357), y: calc(84, 295), next: [22]},
        {index: 22, x: calc(258, 357), y: calc(113, 295), next: [23]},
        {index: 23, x: calc(257, 357), y: calc(141, 295), next: [24]},
        {index: 24, x: calc(254, 357), y: calc(178, 295), next: [25]},
        {index: 25, x: calc(252, 357), y: calc(205, 295), next: [26]},
        {index: 26, x: calc(224, 357), y: calc(204, 295), next: [27]},
        {index: 27, x: calc(190, 357), y: calc(200, 295), next: [28]},
        {index: 28, x: calc(143, 357), y: calc(199, 295), next: [29]},
        {index: 29, x: calc(102, 357), y: calc(192, 295), next: [30]},
        {index: 30, x: calc(100, 357), y: calc(167, 295), next: [31]},
        {index: 31, x: calc(102, 357), y: calc(137, 295), next: [32]},
        {index: 32, x: calc(109, 357), y: calc(109, 295), next: [17]}
    ]);
    GameBase.Elements.registerElement(pieceContainer);

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
            GameBase.Elements.registerElement(pieces[i][j]);
        }
    }

    var dice = new GameBase.Elements.Type.Dice();
    GameBase.Elements.registerElement(dice);
    dice.onAfterRoll = function(slotIndex, value) {
        this.canBeRolledBy(GameBase.Players.getNextSlotIndex(slotIndex));
    };

    //Ausbreiten
    board.moveTo(GameBase.Elements.Default.CenterContainer);

    for (var i = 0; i < 4; i++) {
        if (GameBase.Players.slots[i].user === null) continue;

        for (var j = 0; j < 4; j++) {
            pieces[i][j].moveTo(pieceContainer, {index: i*4+j+1})
        }
    }

    dice.moveTo(GameBase.Elements.Default.CenterContainer);


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
    GameBase.Game.eventEmitter.on(GameBase.Game.Event.Started, function(slotIndex) {
        //Spielen

        var startingPlayer = 0;
        for (var j = 0; j < 4; j++) {
            if (GameBase.Players.slots[j].user !== null) {
                startingPlayer = j;
                break;
            }
        }

        dice.canBeRolledBy(startingPlayer);


/*
        var sendPieceToHome = function(piece, index) {
            setTimeout(function() {
                piece.moveTo(pieceContainer, {index: index});
            }, 700);
        };

        setInterval(function() {
            var playerIndex = Math.floor(Math.random() * 4);
            while (GameBase.Players.slots[playerIndex].user === null) {
                playerIndex = Math.floor(Math.random() * 4);
            }

            var pieceIndex = Math.floor(Math.random() * 4);
            var movement = Math.floor(Math.random() * 6);

            var nextIndexes = pieceContainer.calculateNextIndexes(pieces[playerIndex][pieceIndex].getParent().data.index, movement);

            if (nextIndexes.length) {
                for (var i = 0; i < 4; i++) {
                    if (GameBase.Players.slots[i].user === null) continue;

                    for (var j = 0; j < 4; j++) {
                        if (pieces[i][j].getParent().data.index === nextIndexes[0] && (i !== playerIndex || j !== pieceIndex)) {
                            sendPieceToHome(pieces[i][j], i*4+j+1);
                        }
                    }
                }

                pieces[playerIndex][pieceIndex].moveTo(pieceContainer, {index: nextIndexes[0]})
            }
        }, 2000);*/
    });
});