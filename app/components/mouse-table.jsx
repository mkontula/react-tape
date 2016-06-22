import React from 'react';
import MouseTableRow from './mouse-table-row';
import Point from './point';

const rows = ['row1', 'row2', 'row3', 'row4'];
const cols = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6'];
const undefPoint = new Point(-1, -1);
class MouseTable extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.resetSelection();
  }

  resetSelection = () => ({
    mouseDown: false,
    lastIndex: undefPoint,
    firstIndex: undefPoint,
    selectionStart: undefPoint,
    selectionEnd: undefPoint
  });

  onMouseDown = event => {
    if (!this.state.mouseDown) {
      event.preventDefault();
      const newState = this.resetSelection();
      newState.mouseDown = true;
      this.setState(newState);
    }
  }

  onMouseUp = event => {
    if (this.state.mouseDown) {
      this.setState({mouseDown: false});
    }
  }

  onMouseMoveCell = (rowIndex, colIndex) => {
    const cellIndex = new Point(rowIndex, colIndex);
    const {firstIndex, lastIndex} = this.state;
    if (cellIndex.equals(lastIndex)) { // equals defined in Point
      return;
    }
    // no selection => new selection
    if (firstIndex === undefPoint && lastIndex === undefPoint) {
      this.setState({
        firstIndex: cellIndex,
        lastIndex: cellIndex,
        selectionStart: cellIndex,
        selectionEnd: cellIndex
      });
      return;
    }
    if (cellIndex.col >= firstIndex.col && cellIndex.row >= firstIndex.row) { // going right and down
      this.setState({
        selectionEnd: cellIndex,
        lastIndex: cellIndex,
        selectionStart: firstIndex
      });
    } else if (cellIndex.col >= firstIndex.col && cellIndex.row < firstIndex.row){ // going rigt and up
      this.setState({
        selectionStart: new Point(cellIndex.row, firstIndex.col),
        selectionEnd: new Point(firstIndex.row, cellIndex.col),
        lastIndex: cellIndex
      });
    } else if (cellIndex.col < firstIndex.col && cellIndex.row < firstIndex.row) { // going left and up
      this.setState({
        selectionStart: new Point(cellIndex.row, cellIndex.col),
        selectionEnd: new Point(firstIndex.row, firstIndex.col),
        lastIndex: cellIndex
      });
    } else { // going left and down
      this.setState({
        selectionStart: new Point(firstIndex.row, cellIndex.col),
        selectionEnd: new Point(cellIndex.row, firstIndex.col),
        lastIndex: cellIndex
      });
    }
  }

  render () {
    const {firstIndex, lastIndex, selectionStart, selectionEnd, mouseDown} = this.state;
    const rowProps = {firstIndex, lastIndex, selectionStart, selectionEnd, mouseDown};
    return (
      <div>
        <div className='mouse-table'
          onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
          <div className='mouse-table-header'>
            <div className='mouse-table-column-header'>&nbsp;</div>
            {cols.map(col =>
              <div className='mouse-table-column-header' key={`th-${col}`}>{col}</div>
            )}
          </div>
          <div className='mouse-table-body'>
            {rows.map((row, index) =>
              <MouseTableRow key={row}
                row={row}
                cols={cols}
                rowIndex={index}
                onMouseMoveCell={this.onMouseMoveCell}
                {...rowProps} />
            )}
          </div>
        </div>
        <div>
          <ul>
            <li>firstIndex: {firstIndex.toString()}</li>
            <li>lastIndex: {lastIndex.toString()}</li>
            <li>selectionStart: {selectionStart.toString()}</li>
            <li>selectionEnd: {selectionEnd.toString()}</li>
          </ul>
        </div>
      </div>
    );
  }
}


export default MouseTable;
