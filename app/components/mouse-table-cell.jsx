import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default class MouseTableCell extends React.Component {

  static propTypes = {
    col: PropTypes.string,
    row: PropTypes.string,
    firstRow: PropTypes.bool,
    lastRow: PropTypes.bool,
    firstCol: PropTypes.bool,
    lastCol: PropTypes.bool,
    colIndex: PropTypes.number,
    rowIndex: PropTypes.number
  }

  constructor (props) {
    super(props);
    this.state = {
      mouseDown: false
    }
  }

  onMouseMove = event => {
    if (this.props.captureMouse) {
      this.props.onMouseEnter(this.props.rowIndex, this.props.colIndex);
    }
    event.preventDefault();
  }

  onMouseEnter = event => {
    if (this.props.captureMouse) {
      this.props.onMouseEnter(this.props.row, this.props.col, this.props.colIndex);
    }
  }

  onMouseDown = event => {
    if (this.props.captureMouse) {
      this.props.onMouseEnter(this.props.row, this.props.col, this.props.colIndex);
    }
  }

  render () {
    const css = classNames({
      fc: this.props.firstCol,
      lc: this.props.lastCol,
      fr: this.props.firstRow,
      lr: this.props.lastRow,
      act: this.props.active,
      'mouse-table-cell': true
    })
    return (
      <div className={css}
        onMouseMove={this.onMouseMove}>
          {`${this.props.row}-${this.props.col}`}
      </div>
    );
  }
}
