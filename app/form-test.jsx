import yup from 'yup';

import React from 'react';
import Form from 'react-formal';
import JsonFormattter from './components/json-formatter';

const schema = yup.object({
  strA: yup.string().default('strA'),
  strB: yup.string().default('strB').max(10, 'max-length: 10'),
  strC: yup.string().default('strC'),
  strD: yup.string().default('strD'),
  strE: yup.string().default('strE'),
  strF: yup.string().default('strF'),
  strG: yup.string().default('strG'),
  strH: yup.string().default('strH'),
  strI: yup.string().default('strI'),
  strJ: yup.string().default('strJ'),
  strK: yup.string().default('strK'),
  strL: yup.string().default('strL'),
  strM: yup.string().default('strM'),
  strN: yup.string().default('strN'),
  strO: yup.string().default('strO'),
  strP: yup.string().default('strP'),
  strQ: yup.string().default('strQ'),
  strR: yup.string().default('strR')
});

export default class FormTest extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      formValue: schema.default()
    }
  }

  change = value => {
    this.setState({formValue: value});
  }

  render () {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Form
          defaultValue={schema.default()}
          schema={schema}
          onChange={this.change}
          style={{display: 'flex', flexGrow: 1, flexDirection: 'column'}}
        >
          <div>
            <label>strA</label>
            <Form.Field name='strA' type='textarea' rows={4} style={{width: '100%'}} />
            <Form.Message for='strA' />
          </div>
          <div>
            <label>strB</label>
            <Form.Field name='strB' style={{width: '100%'}} />
            <Form.Message for='strB' />
          </div>
          <div>
            <label>strC</label>
            <Form.Field name='strC' type='textarea' rows={4} style={{width: '100%'}} />
            <Form.Message for='strC' />
          </div>
          <div>
            <label>strD</label>
            <Form.Field name='strD' style={{width: '100%'}} />
            <Form.Message for='strD' />
          </div>
          <div>
            <label>strE</label>
            <Form.Field name='strE' type='textarea' rows={4} style={{width: '100%'}} />
            <Form.Message for='strE' />
          </div>
          <div>
            <label>strF</label>
            <Form.Field name='strF' style={{width: '100%'}} />
            <Form.Message for='strF' />
          </div>
          <div>
            <label>strG</label>
            <Form.Field name='strG' type='textarea' rows={4} style={{width: '100%'}} />
            <Form.Message for='strG' />
          </div>
          <div>
            <label>strH</label>
            <Form.Field name='strH' style={{width: '100%'}} />
            <Form.Message for='strH' />
          </div>
          <div>
            <label>strI</label>
            <Form.Field name='strI' type='textarea' rows={4} style={{width: '100%'}} />
            <Form.Message for='strI' />
          </div>
          <div>
            <label>strJ</label>
            <Form.Field name='strJ' style={{width: '100%'}} />
            <Form.Message for='strJ' />
          </div>
          <div>
            <label>strK</label>
            <Form.Field name='strK' type='textarea' rows={4} style={{width: '100%'}} />
            <Form.Message for='strK' />
          </div>
          <div>
            <label>strL</label>
            <Form.Field name='strL' style={{width: '100%'}} />
            <Form.Message for='strL' />
          </div>
          <div>
            <label>strM</label>
            <Form.Field name='strM' type='textarea' rows={4} style={{width: '100%'}} />
            <Form.Message for='strM' />
          </div>
          <div>
            <label>strN</label>
            <Form.Field name='strN' style={{width: '100%'}} />
            <Form.Message for='strN' />
          </div>
          <div>
            <label>strO</label>
            <Form.Field name='strO' type='textarea' rows={4} style={{width: '100%'}} />
            <Form.Message for='strO' />
          </div>
          <div>
            <label>strP</label>
            <Form.Field name='strP' style={{width: '100%'}} />
            <Form.Message for='strP' />
          </div>
          <div>
            <label>strQ</label>
            <Form.Field name='strQ' type='textarea' rows={4} style={{width: '100%'}} />
            <Form.Message for='strQ' />
          </div>
          <div>
            <label>strR</label>
            <Form.Field name='strR' style={{width: '100%'}} />
            <Form.Message for='strR' />
          </div>
        </Form>
        <div style={{display: 'flex', flexGrow: 1}}>
          <JsonFormattter value={this.state.formValue} />
        </div>
      </div>
    );
  }
}
