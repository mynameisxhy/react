 import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { reqLogin } from "../../api";

 import logo from '../../assets/images/logo.png';
import './index.less';

const Item =Form.Item;

class Login extends Component {
  login=(e)=>{
    e.preventDefault();
    //validateFields  用来校验表单并获取表单的值
    this.props.form.validateFields( async (error,values) =>{
      // console.log(error,values);
     /* error代表表单校验
      null 校验通过
      {} 校验失败*/
     if(!error){
      //校验通过
       const { username,password } =values;
       // console.log(username,password) ;
      const result = await reqLogin( username , password );
        if( result ){
          this.props.history.replace('/');
        }else{
          this.props.form.resetFields('[password]');
        }
     }else{
       //校验失败
       console.log('登录表单校验失败',error);
     }
    })
  };
  //自定义校验规则函数
  validator = (rule,value,callback) => {
    //callback必须调用
    // console.log(rule,value);
    //fullField 原型上的方法， 可以传递用户名或密码
    const name = rule.fullField === 'username' ? '用户名':'密码';
    if(!value){
      //没有输入
      callback(`必须输入${name}`);
    }else if(value.length < 4){
      callback(`${name}必须大于4位`);
    }else if(value.length>15){
      callback(`${name}必须小于15位`);
    }else if(!/^[a-zA-Z0-9]+$/.test(value)){
      callback(`${name}只能包含英文字母、数字、下划线`);
    }else{
      //不传参代表校验通过
      callback();
    }
  };

  render() {
    //getFieldDecorator 也是一个高阶组件，高阶组件本身就是函数
    const { getFieldDecorator } = this.props.form;
    return  <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登录</h2>
        <Form onSubmit={this.login} className="login-form">
          <Item>
            {
              getFieldDecorator( 'username', {
                  rules: [
                    {
                      validator:this.validator
                    }
                  ]
                }
                )(
                <Input className="login-input" prefix={<Icon type="user" />} placeholder="用户名" />
              )}
          </Item>
          <Item>
            {
              getFieldDecorator( 'password', {
                rules: [
                  /*{ required: true, message: '请输入用户名!' },
                  {min:4,message:'密码必须大于4位'},
                  {max:15,message:'密码必须大于4位必须小于15位'},
                  {pattern:/^[a-zA-Z0-9]+$/,message:'密码必须大于4位只能包含英文字符、数字、下划线'}*/
                  {
                    validator:this.validator
                  }
                  ],
              }
              )(
                <Input className="login-input" prefix={<Icon type="lock" />} placeholder="密码" type="password"/>
            )}
          </Item>
          <Item>
          </Item>
          <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
        </Form>
      </section>
    </div>
  }
}

//返回值是一个包装组件 <Form(Login)><Login></Form(login)>
//通过Form(Login)包装组件向Login组件传递form属性
export default Form.create()(Login);