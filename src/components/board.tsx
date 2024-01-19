import React from "react";

interface Clicker {
  //onMouseMove: (event: React.MouseEvent, x: number, y: number) => void;
  C4board: string[][],
  localBoard: string[][],
  player1Color: "B80F0A",
  player2Color: "FEE12B",
}

const Board: React.FC<Clicker> = ({
  //onMouseMove,
  C4board,
  localBoard,
  player1Color,
  player2Color,
}) => {
  return (
    <div>
      {C4board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((C4board, colIndex) => (
            <div
              key={colIndex}
              style={{
                backgroundColor:
                  localBoard[rowIndex][colIndex] == "FFFFFF" // If it is blank 
                    ? "FFFFFFF" // set value to blank
                    : localBoard[rowIndex][colIndex] == "B80F0A" // Otherwise, check what player it is and choose color based on that.
                        ? player1Color
                        : player2Color
                ,width: "200px",
                height: "200px",
              }}
              //onMouseMove={(e) => onMouseMove(e, rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
