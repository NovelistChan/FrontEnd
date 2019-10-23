import React from 'react'
import { Tabs, Button, Input, Row, Col } from 'antd'
import schemaEditor from '@/components/JsonSchemaEditor'
// import '@/components/JsonSchemaEditor/index.css'
import { definitions } from './definitions.json'

const SchemaEditor = schemaEditor({ defaultSchema: definitions })
class CustomizedSchemaEditor extends React.Component {
    advancedTemplate = (data, context) => (new Map([
        // ['link', (<CustomizedSchemaLink data={data} context={context} />)],
        ['leaseType', (<AdvancedField data={data} context={context} />)],
    ]).get(data.customized || data.type))

    render() {
        return (
            <SchemaEditor advancedTemplate={this.advancedTemplate} />
        )
    }
}

export class AdvancedField extends React.Component {

    changeOtherValue = (value, name, data) => {
        data[name] = value;
        this.props.context.changeCustomValue(data);
    };

    render() {
        const { data, context } = this.props
        console.log(context)
        return (
            <div><Input onChange={e => this.changeOtherValue(e.target.value, 'advanced', data)} /></div>
        )
    }
}

export default CustomizedSchemaEditor
