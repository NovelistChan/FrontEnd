import React from 'react'
import Form from '@/components/JsonSchemaFormEditor'

class CustomizedFormEditor extends React.Component {
    render() {
        return (
            <Form schema={{ type: 'string' }}/>
        )
    }
}

export default CustomizedFormEditor
