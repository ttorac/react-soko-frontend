/**
 * Tiles Enum and link, the order matters here
 */

export const TileEnum = Object.freeze({
    BLANK: 5,
    FLOOR: 0,
    WALL: 1,
    GOAL: 2,
    BOX: 3,
    BOX_ON_GOAL: 4,
    PLAYER: 9,
    PLAYER_ON_GOAL:8,
    properties: {
        0: {name: "floor", value: 0, code: "0", ext_code: " "},
        1: {name: "wall", value: 1, code: "1", ext_code: "#"},
        2: {name: "goal", value: 2, code: "2", ext_code: "."},
        3: {name: "box", value: 3, code: "3", ext_code: "$"},
        4: {name: "box_on_goal", value: "4", code: "4", ext_code: "*"},
        5: {name: "blank", value: 5, code: "5", ext_code: null},
        8: {name: "player_on_goal", value: "8", code: "8", ext_code: "+"},
        9: {name: "player", value: 9, code: "9", ext_code: "@"} 
    }
})

// const ExtTileEnum = Object.freeze(
//     {
//         FLOOR: ' ',
//         WALL: '#',
//         GOAL: '.',
//         BOX: '$',
//         BOX_ON_GOAL: '*',
//         PLAYER: 9,
//         PLAYER_ON_GOAL:8
// })

export const tileMap = new Map([
    // ['_', TilesEnum.BLANK],
    [TileEnum.properties[TileEnum.FLOOR].ext_code, TileEnum.FLOOR],
    [TileEnum.properties[TileEnum.WALL].ext_code, TileEnum.WALL],
    [TileEnum.properties[TileEnum.GOAL].ext_code, TileEnum.GOAL],
    [TileEnum.properties[TileEnum.BOX].ext_code, TileEnum.BOX],
    [TileEnum.properties[TileEnum.BOX_ON_GOAL].ext_code, TileEnum.BOX_ON_GOAL],
    [TileEnum.properties[TileEnum.PLAYER_ON_GOAL].ext_code, TileEnum.PLAYER_ON_GOAL],
    [TileEnum.properties[TileEnum.PLAYER].ext_code, TileEnum.PLAYER]
])
