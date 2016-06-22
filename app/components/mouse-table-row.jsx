import React, {PropTypes} from 'react';
import classNames from 'classnames';
import MouseTableCell from './mouse-table-cell';

export default class MouseTableRow extends React.Component {

  static propTypes = {
    cols: PropTypes.array,
    row: PropTypes.string,
    onSelectionChanged: PropTypes.func
  }

  constructor (props) {
    super(props);
    this.state = {
      mouseDown: false,
      lastIndex: undefined,
      firstIndex: undefined,
      selectionStart: undefined,
      selectionEnd: undefined
    }
  }

  onMouseDown = event => {
    if (!this.state.mouseDown) {
      event.preventDefault();
      this.setState({
        mouseDown: true,
        firstIndex: undefined,
        lastIndex: undefined,
        selectionStart: undefined,
        selectionEnd: undefined
      });
    }
  }

  onMouseUp = event => {
    this.setState({mouseDown: false});
  }

  onMouseExit = event => {
    this.setState({mouseDown: false});
  }

  onMouseEnterCell = (row, col, colIndex) => {
    if (this.state.mouseDown) {
      const {firstIndex, lastIndex} = this.state;
      if (colIndex === lastIndex) {
        return;
      }
      // no selection => new selection
      if (firstIndex === undefined && lastIndex === undefined) {
        this.setState({
          firstIndex: colIndex,
          lastIndex: colIndex,
          selectionStart: colIndex,
          selectionEnd: colIndex
        });
        return;
      }
      if (colIndex >= firstIndex) { // going right
        this.setState({
          selectionEnd: colIndex,
          lastIndex: colIndex,
          selectionStart: firstIndex
        });
      } else { // going left
        this.setState({
          selectionStart: colIndex,
          selectionEnd: firstIndex,
          lastIndex: colIndex
        });
      }
    }
  }

  render () {
    const {row, cols} = this.props;
    const {selectionStart, selectionEnd, mouseDown} = this.state;
    return (
      <div className='mouse-table-row'
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseExit={this.onMouseExit}>
        <div className='mouse-table-row-header'>
          {row}
        </div>
        {cols.map((col, index) => {
          const active = selectionStart !== undefined &&
            selectionEnd !== undefined &&
            index >= selectionStart && index <= selectionEnd;
          const first = index === selectionStart;
          const last = index === selectionEnd;
          return (
            <MouseTableCell key={`td-${row}-${col}`}
              col={col}
              row={row}
              colIndex={index}
              onMouseEnter={this.onMouseEnterCell}
              captureMouse={mouseDown}
              active={active}
              first={first}
              last={last} />
          );
        }
        )}
        <div className='mouse-table-cell'>{selectionStart || -1}</div>
        <div className='mouse-table-cell'>{selectionEnd || -1}</div>
      </div>
    );
  }
}
