import React from 'react'
import Form from 'react-jsonschema-form'
import 'antd/dist/antd.css' 

class FormEditor extends React.Component {
    render() {
        return (
            <Form schema={{ type: 'string' }}/>
        )
    }
}
export default FormEditor
