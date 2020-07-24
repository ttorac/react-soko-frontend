    // window.fetch(`${process.env.PUBLIC_URL}/AC_Easy.slc`)
    //   .then(response => response.text())
    //   .then(data => this.covertMapFormatting(data))

// covertMapFormatting = (xmlString) => {
//     const xmlDOM = new DOMParser().parseFromString(xmlString, "application/xml")


//     // console.log(Object.keys(TileEnum.properties))
//     const fileName = "AC_Easy.slc"
//     const selectedLevel = null

//     const levels = xmlDOM.getElementsByTagName('Level')
//     for (const element of levels) {
//       let level = null,
//         width = null, 
//         height = null,
//         initPos = null,
//         numGoals = 0,
//         tiles = []

//       level = element.getAttribute('Id')
//       width = parseInt(element.getAttribute('Width'))
//       height = parseInt(element.getAttribute('Height'))
//       // console.log(level)
        
//       let l = element.getElementsByTagName('L')

//       Array.prototype.map.call(l, (row, i) => {
//         let chars = row.innerHTML
//         let length = chars.length
//         let isBeforeFirstWall = true;

//         // prepare array
//         [...chars].forEach((char, a) => {
//           let isBlank = (char === TileEnum.properties[TileEnum.FLOOR].ext_code) && isBeforeFirstWall
//           let key = a + i*width
//           tiles[key] = isBlank ? TileEnum.BLANK : tileMap.get(char)
//           if (isBeforeFirstWall && tiles[key] === TileEnum.WALL) isBeforeFirstWall = false
//           // count quantity of goals in the level
//           if (char === TileEnum.properties[TileEnum.GOAL].ext_code ||
//             char === TileEnum.properties[TileEnum.BOX_ON_GOAL].ext_code ||
//             char === TileEnum.properties[TileEnum.PLAYER_ON_GOAL].ext_code) numGoals++
//           // define starting position
//           if (char === TileEnum.properties[TileEnum.PLAYER].ext_code || 
//             char === TileEnum.properties[TileEnum.PLAYER_ON_GOAL].ext_code) initPos = key
//           // if it's the end fill remaining positions with blank
//           if ((a === (length-1)) && a < width) Array.prototype.push.apply(tiles,new Array(width-length).fill(TileEnum.BLANK))
//         })
//       })

//       const dbObj = {
//         // _id
//         width: width,
//         height: height,
//         initPos: initPos,
//         totalGoals: numGoals,
//         levelSeq: null,
//         solutionHash: null,
//         source: fileName,
//         originId: level,
//         tiles: tiles
//       }

//       const lvlObj = {
//         level: level,
//         width: width,
//         height: height,
//         initPos: initPos,
//         totalGoals: numGoals,
//         tiles: tiles
//       }


//       if (dbObj.totalGoals < 6) console.log(JSON.stringify(dbObj))

//       // console.log(`${lvlObj.level} === ${selectedLevel} `)
//       if (lvlObj.level === selectedLevel) {
//         // console.log(JSON.stringify(lvlObj))
//         this.setState({
//           history: [
//               {
//                   tiles: lvlObj.tiles,
//                   action: null,
//                   position: null // initial position
//               }
//           ],
//           level: lvlObj.level,
//           width: lvlObj.width,
//           height: lvlObj.height,
//           initPos: lvlObj.initPos,
//           totalFits: lvlObj.totalGoals,
//           fitCount: 0,
//           moveCount: 0,
//           moves: ['ArrowUp','ArrowLeft','ArrowDown','ArrowRight']
//         })
//       }
//       // console.log(JSON.stringify(lvlObj))
//     }
//   }