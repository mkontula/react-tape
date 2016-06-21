import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default class MouseTableCell extends React.Component {

  static propTypes = {
    col: PropTypes.string,
    row: PropTypes.string,
    colIndex: PropTypes.number
  }

  constructor (props) {
    super(props);
    this.state = {
      mouseDown: false
    }
  }

  onMouseMove = event => {
    if (this.props.captureMouse) {
      this.props.onMouseEnter(this.props.row, this.props.col, this.props.colIndex);
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
      active: this.props.active
    })
    return (
      <td className={css}
        onMouseMove={this.onMouseMove}>
          {`${this.props.row}-${this.props.col}`}
      </td>
    );
  }
}
