import React from 'react'
import { Form } from 'react-jsonschema-form-lab'

export default class FormEditorLab extends React.Component {
    render() {
        return (
            
            <Form FieldTemplate={this.FieldTemplate} ArrayFieldTemplate={this.ArrayFieldTemplate} ObjectFieldTempalt={this.ObjectFieldTempalt} {...this.props} />

        )
    }
    FieldTemplate = formProps => {

        const { schema } = formProps
    
        /* 自定义type */
        switch(schema["type"]) {
          case "party": return <PartyField {...formProps} />;
          case "lease": return <LeaseField {...formProps} />;
          default: return DefaultTemplate(formProps);
        }
        
    }

    ArrayFieldTemplate = formProps => {

        const { schema } = formProps
    
        /* 对Array类型的拓展 */
        if (schema["type"] === "lease") return <LeaseField {...formProps} />
    
        return DefaultFixedArrayFieldTemplate(formProps)
    }
    
    ObjectFieldTempalt =  formProps => {
    
        /* 对Object类型的拓展 */
        return DefaultObjectFieldTemplate(formProps)
    }
}
