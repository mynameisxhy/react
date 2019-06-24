import React, {Component} from 'react';
import { Layout } from 'antd';

import LeftNav from '../../components/left-nav/index';
import HeaderMain from '../../components/header-main/index';
import {getItem} from '../../utils/storage-tools';
import { reqValidateUserInfo } from '../../api';
import './index.less';

const { Header, Content, Footer , Sider } = Layout;



export default class Admin extends Component {
  state = {
    collapsed: false,  //根据状态控制折叠， 为false就不折叠
  };
  //collapse 折叠面板   oncollapse 切换面板的回调
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  async componentWillMount(){
    //判断登录是否成功
    const user = getItem();

    //如果用户是刷新进来的
    if(user && user._id){
      //发送请求验证 用户信息是否合法
      //如果是登录进来的，就不需要。如果用户使用之前的值。刷新访问进来，就需要

      const result = await reqValidateUserInfo(user._id);
      if(result) return;
    }
    this.props.history.replace('/login');
  }
  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <LeftNav collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, minHeight: 100 }}>
            <HeaderMain />
          </Header>
          <Content style={{ margin: '25px 16px' }}>
            <div className="home">
              <h2>欢迎使用硅谷后台管理系统</h2>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}