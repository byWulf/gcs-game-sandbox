var GameBase = require('gcs-game-base');
var Sleep = require('sleep');

GameBase.Game.init(function() {
    /**
     * Create all material
     */

    var autoResizeContainer = new GameBase.Elements.Type.AutoResizeContainer();
    GameBase.Elements.registerElement(autoResizeContainer);

    var otherResizeContainer = new GameBase.Elements.Type.AutoResizeContainer();
    GameBase.Elements.registerElement(otherResizeContainer);

    //TileContainer
    var tileContainer = new GameBase.Elements.Type.TileContainer();
    tileContainer.setTileForm('hexagonal');
    tileContainer.setStackElementRadius(5);
    tileContainer.setStackElementHeight(0.1);
    GameBase.Elements.registerElement(tileContainer);

    var availableTileContainer = new GameBase.Elements.Type.TileContainer();
    availableTileContainer.setTileForm('hexagonal');
    availableTileContainer.setStackElementRadius(5);
    availableTileContainer.setStackElementHeight(0.1);
    GameBase.Elements.registerElement(availableTileContainer);

    //Tiles
    var tiles = {};
    for (var x = -4; x <= 4; x++) {
        tiles[x] = {};
        for (var y = -4; y <= 4; y++) {
            tiles[x][y] = new GameBase.Elements.Type.Tile();
            tiles[x][y].setFrontImage('tile.png');
            tiles[x][y].setBackImage('tile_back.png');
            tiles[x][y].setSide('back');
            tiles[x][y].setFrontVisibility([]);
            tiles[x][y].setForm('hexagonal');
            tiles[x][y].setRadius(5);
            tiles[x][y].setHeight(0.1);
            GameBase.Elements.registerElement(tiles[x][y]);
        }
    }


    /**
     * Put the material on the table
     */
    autoResizeContainer.moveTo(GameBase.Elements.Default.CenterContainer);

    availableTileContainer.moveTo(autoResizeContainer, {x: 1, y: 0});
    otherResizeContainer.moveTo(autoResizeContainer, {x: 0, y: 0});

    tileContainer.moveTo(otherResizeContainer, {x: 0, y: 1});

    var playTiles = [];
    for (var x = -4; x <= 4; x++) {
        for (var y = -4; y <= 4; y++) {
            if (x == 0 && y == 0) {
                tiles[x][y].moveTo(tileContainer, {x: 0, y: 0, index: 0});
                tiles[x][y].flip();
                tiles[x][y].setFrontVisibility(null);
            } else {
                tiles[x][y].moveTo(availableTileContainer, {x: 0, y: 0, index: playTiles.length});
                playTiles.push(tiles[x][y]);
            }
        }
    }

    var startTurn = function() {
        var playTile = playTiles.pop();
        if (!playTile) {
            GameBase.Game.finish();
            return;
        }

        playTile.setFrontVisibility(null);
        playTile.flip();
        playTile.moveTo(availableTileContainer, {x: 0, y: 2, index: 0});
        Sleep.sleep(1);

        var possibleMovements = {};

        for (var x = -4; x <= 4; x++) {
            for (var y = -4; y <= 4; y++) {
                if (tiles[x][y].getParent().id !== tileContainer.getId()) continue;

                var neighbours = tiles[x][y].getNeighbours();
                for (var i = 0; i < neighbours.length; i++) {
                    if (neighbours[i].elements.length > 0) continue;

                    if (typeof possibleMovements[neighbours[i].y] == 'undefined') possibleMovements[neighbours[i].y] = {};
                    possibleMovements[neighbours[i].y][neighbours[i].x] = 1;
                }
            }
        }

        var movements = [];
        for (var y in possibleMovements) {
            for (var x in possibleMovements[y]) {
                movements.push({
                    slotIndex: 0,
                    target: {
                        id: tileContainer.getId(),
                        data: {
                            x: parseInt(x, 10),
                            y: parseInt(y, 10),
                            index: 0
                        }
                    }
                });
            }
        }

        playTile.canBeMovedBy(movements);
        playTile.canBeRotatedBy([{slotIndex: 0, rotation: 0}, {slotIndex: 0, rotation: 60}, {slotIndex: 0, rotation: 120}, {slotIndex: 0, rotation: 180}, {slotIndex: 0, rotation: 240}]);
        playTile.onAfterMove = function() {
            startTurn();
        }
    }

    /**
     * Game start - Here's the game logic
     */
    GameBase.Game.eventEmitter.on(GameBase.Game.Event.Started, function(slotIndex) {
        startTurn();
    });
});