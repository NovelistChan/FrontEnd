import React from 'react'
import { Cascader, Row, Col, Input, Button } from 'antd'
import PropTypes from 'prop-types';
//import LocalProvider from '../LocalProvider/index.js';
import { connect } from 'dva'

const mapStateToProps = state => ({
  link: state['jsonSchema-link']
})

class CustomizedSchemaLink extends React.Component {

  render() {
    const { data, dispatch } = this.props;
    console.log(this.state.options)
    return (
      <div>
        <div className="default-setting">{'base_setting'}</div>
        <Row className="other-row" type="flex" align="middle">
          <Col span={4} className="other-label">
            {'link'}：
          </Col>
          <Col span={20}>
            {/* // link类型advanced settings组件的核心是一个级联选择框  */}
            <Cascader placeholder="please select customer schema and document" style={{ width: '100%' }}
              options={this.state.options}//动态选项
              onChange={selectedOptions => {
                /* 将选中的key和val写回当前的schema中 */
                console.log(selectedOptions)
                this.changeOtherValue(selectedOptions[0], "key", data)
                this.changeOtherValue(selectedOptions[2], "val", data)
              }} loadData={this.loadData} changeOnSelect >
            </Cascader>
          </Col>
        </Row>
      </div>
    );
  }

  state = {
    options: []
  }

	/* 回写schema方法 */
  changeOtherValue = (value, name, data) => {
    data[name] = value;
    this.context.changeCustomValue(data);
  };

	componentDidMount() {
    /* 渲染第一层可选项 */
    this.props.dispatch({
      type: 'jsonSchema-link/getCollectionList',
      callback: collectionList => {
        const options = collectionList.map(item => ({ value: item, label: item, isLeaf: false }))
        this.setState({ options })
      }
    })
  }

	/* 级联选择动态加载数据 */
  loadData = selectedOptions => {
    /* 渲染第二层可选项，向后台请求符合要求的所有schema */
    if (selectedOptions.length === 1) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      /* 向后台请求collection为key的schema */
      this.props.dispatch({
        type: 'jsonSchema-link/getSchemaList',
        key: targetOption.value,
        callback: schemaList => {
          targetOption.loading = false;
          targetOption.children = schemaList.map(item => ({ value: item.id, label: item.name, isLeaf: false }))
          this.setState({
            options: [...this.state.options],
          });
        }
      })
    }
    /* 渲染第三层可选项，向后台请求符合要求的所有document */
    if (selectedOptions.length === 2) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      /* 根据选中的schemaId向后台请求相关的document */
      this.props.dispatch({
        type: 'jsonSchema-link/getDocumentListBySchemaId',
        id: targetOption.value,
        callback: documentList => {
          targetOption.loading = false;
          targetOption.children = documentList.map(item => ({ value: item.id, label: item.name }))
          this.setState({
            options: [...this.state.options],
          });
        }
      })
    }
  };
}
CustomizedSchemaLink.contextTypes = {
  changeCustomValue: PropTypes.func,
};

export default connect(mapStateToProps)(CustomizedSchemaLink)