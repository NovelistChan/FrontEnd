import React from 'react'
import schemaEditor from 'json-schema-editor-visual-lab'
// import 'json-schema-editor-visual-lab/dist/main.css'
import 'antd/dist/antd.css'
// import editor from "..../sddm-component/json-schema-editor-visual-lab/src/index.js";
import { definitions } from './definitions.json'
import { Form } from 'react-jsonschema-form-lab'
import { Tabs , Card, Button } from 'antd'
import 'bootstrap/dist/css/bootstrap.css'
// const SchemaEditor = schemaEditor({defaultSchema: definitions})
// export default function() {
//     console.log(schemaEditor)
//     return (<SchemaEditor />)
// }
const option = {
    defaultSchema: {
        ...definitions,
    }
};

const extensions = {
    'link': props=>{console.log(props.schema); return <div>1234</div>}
    
}

const SchemaEditor = schemaEditor(option);
export default class App extends React.Component {
    state = {
        schema: null
    }
    render() {
        return (
            <div>
                <Tabs>
                    
                    <Tabs.TabPane tab="schema" key="1">
                        <Button>bgrg</Button>
                        <SchemaEditor showEditor={true} data={this.state.schema} 
                        onChange={schema => this.setState({ schema }, 
                        //console.log(this.state.schema)
                        )} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="form" key="2">
                        <Card>
                        <Form schema={JSON.parse(this.state.schema)} 
                            extensions={extensions}
                             />
                             </Card>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
}
