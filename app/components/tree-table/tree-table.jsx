import debug from 'debug';
import cssns from '../../utils/cssnsConfig';
const {React} = cssns('TreeTable2');

import { PropTypes } from 'react';
// import { Button, ButtonGroup } from 'react-bootstrap';

// import { Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmComponent from '../immutable-component';
// import { BudgetValueRecord } from '../../records';
import { Map } from 'immutable';

class TreeTableCellData extends ImmComponent { // eslint-disable-line no-unused-vars
  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.state = { immutable: Map( // eslint-disable-line new-cap
      {
        mode: 'display', // or 'edit'
        value: props.value
      }
    )};
  }

  componentWillReceiveProps (newProps) {
    this.setImmState({
      value: newProps.value
    });
  }

  onBlur () {
    const { editFunc, row, column } = this.props;
    const value = this.state.immutable.get('value');
    // debug('dev')('TreeTableCellData::onBlur', row, column, value.amount);
    if (editFunc) {
      editFunc(row, column.id, value.amount);
    }
    this.setImmState({mode: 'display'});
  }

  onChange (event) {
    const eventValue = event.target.value;
    const value = this.state.immutable.get('value');
    const newValue = value.set('amount', eventValue);

    this.setImmState({
      value: newValue
    });
  }

  handleDoubleClick () {
    this.setImmState({mode: 'edit'});
    this.refs.input.setSelectionRange(0, this.refs.input.value.length);
    setTimeout(() => this.refs.input.focus(), 10);
  }

  render () {
    const mode = this.state.immutable.get('mode');
    const value = this.state.immutable.get('value');
    const amount = value ? value.amount : 0;
    const editable = true; // TODO: row.edtable && column.editable

    const spanDisplay = (mode === 'display') ? 'block' : 'none';
    const inputDisplay = (mode === 'display') ? 'none' : 'block';

    if (editable) {
      return (
        <div onDoubleClick={this.handleDoubleClick} className="cell">
          <div className="cell-amount" style={{display: spanDisplay}}>{amount}</div>
          <input value={amount}
            onBlur={this.onBlur}
            ref="input"
            style={{display: inputDisplay}}
            className="form-control"
            onChange={this.onChange}
          />
        </div>
      );
    } else {
      return (
        <div className="cell">{amount}</div>
      );
    }
  }
}

class TreeTable extends ImmComponent {
  static displayName = 'TreeTable';

  static propTypes = {
    GroupComponent: PropTypes.any.isRequired,
    CellComponent: PropTypes.any.isRequired,
    StyleComponent: PropTypes.any.isRequired,
    columns: ImmutablePropTypes.list,
    cssFunc: PropTypes.func.isRequired,
    editFunc: PropTypes.func.isRequired,
    ToolBar: PropTypes.node,
    tree: ImmutablePropTypes.record,
    data: ImmutablePropTypes.map
  };

  constructor (props) {
    super(props);
    this.state = { immutable: Map(
      {
        rows: this.getTree(props.tree)
      }
    )};
  }

  componentWillReceiveProps (newProps) {
    debug('dev')('TreeTable::componentWillReceiveProps,has tree changed?', newProps.tree !== this.props.tree);
    if (newProps.tree !== this.props.tree) {
      debug('dev')('TreeTable::componentWillReceiveProps, tree changed');
      this.setImmState({
        rows: this.getTree(newProps.tree)
      });
    }
  }

  getTree (tree) {
    const rows = [];
    debug('dev')('TreeTable::buildTree START');
    this.buildTree(tree, rows, 0);
    debug('dev')('TreeTable::buildTree END');
    return rows;
  }

  buildTree (schemeObject, rows, level) {
    const { type, rowId, rowType, editable, formula, normalizedFormula, account, name } = schemeObject;
    rows.push({ level, type, rowId, rowType, editable, formula, normalizedFormula, account, name });
    if (schemeObject.children && schemeObject.children.size > 0) {
      schemeObject.children.map((child) => this.buildTree(child, rows, level + 1));
    }
    if (schemeObject.rows && schemeObject.rows.size > 0) {
      schemeObject.rows.map((child) => this.buildTree(child, rows, level + 1));
    }
  }


  render () {
    const { data, editFunc } = this.props;
    const tree = this.state.immutable.get('rows');
    return (
      <div className='this'>
        <div className='eq'>
          <div className='tree'>
            {tree.map((schemeObject) => {
              const className = `indent-${schemeObject.level} header`;
              return (
                <div key={schemeObject.rowId} className={className}>{schemeObject.name}</div>
              );
            })}
          </div>
          <div className="data">
            {data.map((row, rowKey) =>
              <TreeDataRow key={rowKey}
                editFunc={editFunc}
                CellComponent={TreeTableCellData}
                columns={this.props.columns}
                data={row}
                rowKey={rowKey}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

class TreeDataRow extends ImmComponent {
  render () {
    const { rowKey, data, columns, CellComponent, editFunc } = this.props;
    return (
      <div className='row-data'>
        {
          columns.map((column) => {
            const columnValue = !data ? null : data.get(column.id);
            return (
              <CellComponent
                key={column.id}
                row={rowKey}
                column={column}
                value={columnValue} editFunc={editFunc}
              />
            );
          })
        }
      </div>
    );
  }
}

export default TreeTable;
