import React from 'react'
import { Button, Icon, List, Card, Tooltip, Spin } from 'antd';
import { Link } from 'umi/link'
import { connect } from 'dva'
import { formatMessage } from 'umi/locale';
import router from 'umi/router'
import route from 'umi/router';
const mapStateToProps = (state) => {
    const data = state['schemaList']
    return { data }
}

const defaultContent = JSON.stringify({
    schema: {
        "type": "object",
        "title": "empty object",
        "properties": {}
    }
})

@connect(mapStateToProps)
export default class SchemaList extends React.Component {

    componentDidMount() {
        console.log("mount")
        this.props.dispatch({
            type: 'schemaList/getSchemaList'
        })
    }

    deleteSchema(key) {
        this.props.dispatch({
            type: 'schemaList/deleteSchema',
            id: key.id
        })
    }

    createSchema(schema) {
        this.props.dispatch({
            type: 'schemaList/createSchema',
            payload: schema
        })
    }

    render() {
        const { data } = this.props
        return (
            <div>
                <List dataSource={data}
                    renderItem={item => <List.Item
                        actions={[<Button type="primary" ghost onClick={() => router.push(`/complex?id=${item.id}`)}>Edit</Button>,
                        <Button type="primary" ghost onClick={() => this.deleteSchema(item)}>Delete</Button>,
                        <Button type="primary" ghost >History</Button>]}
                    >{item.id}</List.Item>}
                />
                <Button type="primary" ghost onClick={() => this.createSchema(defaultContent)}>Add</Button>
            </div>

        )

    }
}

