import React from 'react'
import schemaEditor from 'json-schema-editor-visual-lab'
// import 'json-schema-editor-visual-lab/dist/main.css'
import 'antd/dist/antd.css'
// import editor from "..../sddm-component/json-schema-editor-visual-lab/src/index.js";
import { definitions } from './definitions.json'
import { Form } from 'react-jsonschema-form-lab'
import { Tabs, Card, Button } from 'antd'
import 'bootstrap/dist/css/bootstrap.css'
import { connect } from 'dva'

const namespace = "schemaEdit"
const mapStateToProps = (state) => {
    const data = state[namespace]
    console.log("schema data: ", data)
    return { data }
}

const option = {
    defaultSchema: {
        ...definitions,
    }
};


const SchemaEditor = schemaEditor(option);
@connect(mapStateToProps)
export default class App extends React.Component {

    saveSchema = (schema) => {
        console.log("save schema: ", schema)
        this.props.dispatch({
            type: "schemaEdit/updateSchema",
            payload: schema
        })
    }

    getSchema = (state) => {
        this.props.dispatch({
            type: "schemaEdit/getSchema",
            payload: state.schema
        })
    }

    render() {
        const data = this.props
        return (
            <div>
                <SchemaEditor showEditor={true} data={this.getSchema}
                    onChange={schema => this.setState({ schema },
                        //console.log(this.state.schema)
                    )}
                    advancedTemplate={this.advancedTemplate}
                />
                <Button type="primary" onClick={() => this.saveSchema(this.state.schema)}>保存</Button>
            </div>
        )
    }
}
