import React from "react";

interface Clicker {
  //onMouseMove: (event: React.MouseEvent, x: number, y: number) => void;
  isSelected: boolean;
  C4board: boolean[][],
  localBoard: boolean[][],
  player1Color: "#B80F0A",
  player2Color: "#FEE12B",
}

const Board: React.FC<Clicker> = ({
  //onMouseMove,
  isSelected,
  C4board,
  localBoard,
  player1Color,
  player2Color,
}) => {
  return (
    <div
        onMouseDown={() => setIsSelected(!isSelected)} // Click to select, click again to "unselect"? -- Use an alternate button to submit.
        //onMouseLeave={() => setIsDragging(false)}
        style={{
          cursor: isSelected ? 'crosshair' : 'pointer', // CHANGE THIS! This should be like something that indicates you're selecting a column.
        }}
    >
      {C4board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((C4board, colIndex) => (
            <div
              key={colIndex}
              style={{
                backgroundColor:
                  localBoard[rowIndex][colIndex] == null // If it is blank 
                    ? "#000000" // set value to blank
                    : localBoard[rowIndex][colIndex] == false // Otherwise, check what player it is and choose color based on that.
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
