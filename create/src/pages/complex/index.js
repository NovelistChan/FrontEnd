/* eslint-disable no-debugger */
import React from 'react';
import schemaEditor from 'json-schema-editor-visual-lab';
// import 'json-schema-editor-visual-lab/dist/main.css'
import 'antd/dist/antd.css';
// import editor from "..../sddm-component/json-schema-editor-visual-lab/src/index.js";
import { Form } from 'react-jsonschema-form-lab';
import { Tabs, Card, Button, Spin } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';

import { definitions } from './definitions.json';
// const SchemaEditor = schemaEditor({defaultSchema: definitions})
// export default function() {
//     console.log(schemaEditor)
//     return (<SchemaEditor />)
// }
const namespace = 'schema-form-page';
const mapStateToProps = state => {
  const data = state[namespace];
  console.log('schema data: ', data);
  return { data };
};

const option = {
  defaultSchema: {
    ...definitions,
  },
};

const extensions = {
  link: props => {
    console.log(props.schema);
    return <div>1234</div>;
  },
  leaseType: props => {
    console.log(props.schema);
    return <div>1234</div>;
  },
  date: props => {
    console.log(props.schema);
    return <div>1234</div>;
  },
};

const SchemaEditor = schemaEditor(option);
@connect(mapStateToProps)
class App extends React.Component {
  setStateSchema = schema => {
    console.log('?');

    console.log(schema.schemaContent);
    this.setState({
      schema: schema.schemaContent.schema,
    });
  };

  setStateCommits = commits => {
    this.setState({
      commits,
    });
  };

  componentDidMount() {
    // console.log('here')
    const { id } = this.props.location.query;
    if (id) {
      this.props.dispatch({
        type: 'schema-form-page/getSchema',
        payload: id,
        callback: schema => {
          this.setState({ schema });
        },
      });
    }
  }

  saveSchema = schema => {
    console.log('save schema: ', schema);
    this.props.dispatch({
      type: 'schema-form-page/updateSchema',
      id: this.props.data.schema.id,
      payload: schema,
    });
  };

  getSchemaCommits = id => {
    this.props.dispatch({
      type: 'schema-form-page/getSchemaCommits',
      payload: id,
    });
  };

  getSchemaCommit = schema => {
    this.props.dispatch({
      type: 'schema-form-page/getSchemaCommit',
      payload: schema,
    });
  };

  advancedTemplate = (data, context) =>
    new Map([['link', <schemaLink data={data} context={context} />], []]);

  render() {
    console.log(this.props.data);
    if (!(this.state && this.state.schema)) return <Spin />;
    return (
      <div>
        <Tabs>
          <Tabs.TabPane tab="schema" key="1">
            <SchemaEditor
              showEditor
              data={this.state.schema}
              onChange={schema => this.setState({ schema })}
              advancedTemplate={this.advancedTemplate}
            />
            <Button type="primary" ghost onClick={() => this.saveSchema(this.state.schema)}>
              Save
            </Button>
            <Button type="primary" ghost onClick={() => this.saveSchema(this.state.schema)}>
              History
            </Button>
          </Tabs.TabPane>
          <Tabs.TabPane tab="form" key="2">
            <Card>
              <Form schema={JSON.parse(this.state.schema)} extensions={extensions} />
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(App);
