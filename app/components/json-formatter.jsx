import React, {PropTypes} from 'react';

const JsonFormatter = props =>
  <div style={{margin: 20, padding: 10, backgroundColor: '#eee', borderWidth: 1, borderColor: '#aaa', borderStyle: 'solid'}}>
    <pre>{JSON.stringify(props.value, null, 2)}</pre>
  </div>
;

JsonFormatter.propTypes = {
  value: PropTypes.object
};

export default JsonFormatter;
