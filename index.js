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

    pieceContainer.setPositions({
        1: {x: 30/357*113, y: 30/295*33, next: [17]},
        2: {x: 30/357*144, y: 30/295*34, next: [17]},
        3: {x: 30/357*114, y: 30/295*57, next: [17]},
        4: {x: 30/357*143, y: 30/295*57, next: [17]},
        5: {x: 30/357*290, y: 30/295*81, next: [21]},
        6: {x: 30/357*309, y: 30/295*82, next: [21]},
        7: {x: 30/357*281, y: 30/295*109, next: [21]},
        8: {x: 30/357*305, y: 30/295*111, next: [21]},
        9: {x: 30/357*222, y: 30/295*228, next: [25]},
        10: {x: 30/357*250, y: 30/295*227, next: [25]},
        11: {x: 30/357*226, y: 30/295*251, next: [25]},
        12: {x: 30/357*258, y: 30/295*248, next: [25]},
        13: {x: 30/357*49, y: 30/295*167, next: [29]},
        14: {x: 30/357*73, y: 30/295*166, next: [29]},
        15: {x: 30/357*47, y: 30/295*192, next: [29]},
        16: {x: 30/357*69, y: 30/295*194, next: [29]},
        17: {x: 30/357*114, y: 30/295*81, next: [18]},
        18: {x: 30/357*147, y: 30/295*84, next: [19]},
        19: {x: 30/357*181, y: 30/295*85, next: [20]},
        20: {x: 30/357*221, y: 30/295*84, next: [21]},
        21: {x: 30/357*257, y: 30/295*84, next: [22]},
        22: {x: 30/357*258, y: 30/295*113, next: [23]},
        23: {x: 30/357*257, y: 30/295*141, next: [24]},
        24: {x: 30/357*254, y: 30/295*178, next: [25]},
        25: {x: 30/357*252, y: 30/295*205, next: [26]},
        26: {x: 30/357*224, y: 30/295*204, next: [27]},
        27: {x: 30/357*190, y: 30/295*200, next: [28]},
        28: {x: 30/357*143, y: 30/295*199, next: [29]},
        29: {x: 30/357*102, y: 30/295*192, next: [30]},
        30: {x: 30/357*100, y: 30/295*167, next: [31]},
        31: {x: 30/357*102, y: 30/295*137, next: [32]},
        32: {x: 30/357*109, y: 30/295*109, next: [17]}
    });
    GameBase.Elements.registerElement(pieceContainer);

    var pieces = {};
    for (var i = 0; i < 4; i++) {
        pieces[i] = {};
        for (var j = 0; j < 4; j++) {
            pieces[i][j] = new GameBase.Elements.Type.Piece();
            pieces[i][j].setWidth(1);
            pieces[i][j].setHeight(2);
            pieces[i][j].setDepth(2);
            pieces[i][j].setModel('figure.obj');
            GameBase.Elements.registerElement(pieces[i][j]);
        }
    }

    var dice = new GameBase.Elements.Type.Dice();
    GameBase.Elements.registerElement(dice);

    //Ausbreiten
    board.moveTo(GameBase.Elements.Default.CenterContainer);

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            pieces[i][j].moveTo(pieceContainer, {index: i*4+j+1})
        }
    }

    dice.moveTo(GameBase.Elements.Default.CenterContainer);
});