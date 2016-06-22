import React from 'react';
import MouseTableCell from './mouse-table-cell';

const MouseTableRow = props => {
  const {
    row, cols, rowIndex, selectionStart, selectionEnd,
    mouseDown, onMouseMoveCell} = props;
  return (
    <div className='mouse-table-row'>
      <div className='mouse-table-row-header'>
        {row}
      </div>
      {cols.map((col, index) =>
        <MouseTableCell key={`td-${row}-${col}`}
          col={col}
          row={row}
          colIndex={index}
          rowIndex={rowIndex}
          onMouseEnter={onMouseMoveCell}
          captureMouse={mouseDown}
          firstCol={index === selectionStart.col}
          lastCol={index === selectionEnd.col}
          firstRow={rowIndex === selectionStart.row}
          lastRow={rowIndex === selectionEnd.row}
          active={rowIndex >= selectionStart.row &&
            rowIndex <= selectionEnd.row &&
            index >= selectionStart.col &&
            index <= selectionEnd.col} />
      )}
    </div>
  );
}

export default MouseTableRow;
