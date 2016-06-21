import React from 'react';
import MouseTableRow from './mouse-table-row';

const rows = ['row1', 'row2', 'row3', 'row4'];
const cols = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6'];

const MouseTable = () =>
  <table>
    <thead>
      <tr><th />{cols.map(col => <th key={`th-${col}`}>{col}</th>)}</tr>
    </thead>
    <tbody>
      {rows.map(row =>
        <MouseTableRow key={row} row={row} cols={cols} />
      )}
    </tbody>
  </table>
;

export default MouseTable;
