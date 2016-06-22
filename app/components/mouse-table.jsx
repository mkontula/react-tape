import React from 'react';
import MouseTableRow from './mouse-table-row';

const rows = ['row1', 'row2', 'row3', 'row4'];
const cols = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6'];

const MouseTable = () =>
  <div className='mouse-table'>
    <div className='mouse-table-header'>
      <div className='mouse-table-column-header'>&nbsp;</div>
      {cols.map(col =>
        <div className='mouse-table-column-header' key={`th-${col}`}>{col}</div>
      )}
      <div className='mouse-table-column-header'>start</div>
      <div className='mouse-table-column-header'>end</div>
    </div>
    <div className='mouse-table-body'>
      {rows.map(row =>
        <MouseTableRow key={row} row={row} cols={cols} />
      )}
    </div>
  </div>
;

export default MouseTable;
