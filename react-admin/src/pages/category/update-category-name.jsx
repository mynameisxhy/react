import React, { Component } from 'react';
import { Form , Input } from "antd";
import PropTypes from 'prop-types';

class UpdateCategoryNameForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired
  };
  validator = (rule,value,callback) => {
    if(!value){
      return callback('请输入分类名称');
    } else if(value === this.props.categoryName) {
      return callback('请不要输入之前的名称');
    }else{
      callback();
    }
};

  /*componentWillReceiveProps(nextProps,nextContext){
    this.setState({
      categoryName: nextProps.categoryName
    })
  }
*/
  render() {
    const { getFieldDecorator } = this.props.form;
    return <Form>
      <Form.Item>
        {getFieldDecorator(
          'categoryName',{
            initialValue:this.props.categoryName,
            rules:[
              {
                validator:this.validator
              }
            ]
          }
        )(
          <Input />
        )
        }
      </Form.Item>
    </Form>;
  }
}
export default Form.create()(UpdateCategoryNameForm);