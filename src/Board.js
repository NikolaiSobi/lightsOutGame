import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let r = 0; r < nrows; r++){
      let innerArr = []
      for(let c = 0; c < ncols; c++){
        let random = Math.random()
        innerArr.push(random > chanceLightStartsOn)
    }
    initialBoard.push(innerArr)
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for(let r = 0; r < nrows; r++){
      for(let c = 0; c < ncols; c++){
        if(board[r][c] === true){
          return false
        }
      }
    }
    return true
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows){ 
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newOldBoard = structuredClone(oldBoard)

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y-1, x, newOldBoard)
      flipCell(y+1, x, newOldBoard)
      flipCell(y, x-1, newOldBoard)
      flipCell(y, x+1, newOldBoard)
      flipCell(y, x, newOldBoard)
 
      // TODO: return the copy
      return newOldBoard
    });
  }

  


  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if(hasWon()){
    return <div>YOU WON</div>
  }

  // make table board

  return (
    <div>
      {board.map( (arr, idx) => {
        return <div key={idx}>
          {arr.map((cell, idx2 )=> {
            return <Cell isLit={cell} flipCellsAroundMe={() => flipCellsAround(`${idx}-${idx2}`)} key={idx2}/>
          })}
          </div>
      })}
    </div>
  )
}

export default Board;
