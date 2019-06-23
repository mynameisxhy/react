import React, {Component} from 'react';
import { Layout } from 'antd';

import LeftNav from '../../components/left-nav/index';
import HeaderMain from '../../components/header-main/index';
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