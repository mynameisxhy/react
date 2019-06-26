import React,{ Component } from 'react';
import logo from "../../assets/images/logo.png";
import { Menu,Icon } from 'antd';
import { Link , withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import menuList from '../../config/menu-config';
import './index.less';

const { SubMenu , Item} = Menu;

class LeftNav extends Component{
  static propTypes = {
    collapsed: PropTypes.bool.isRequired
  };
  createMenu = (menu) =>{
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon} />
        <span>{menu.title}</span>
      </Link>
    </Item>
  };
  //在 componentWillMount 中 使用map加载menuList 生成动态菜单， 在render之前，只会执行一次
  componentWillMount(){
    let { pathname } = this.props.location ; //根据 withRouter 传递的属性获取菜单地址

    /*
    *     pathname: '/product/saveupdate'  --> '/product
    * */
    const pathnameReg = /^\/product\//;
    if(pathnameReg.test(pathname)){
      pathname = pathname.slice(0,8);
    }
    let isHome = true;
    //根据menuList 生成菜单
    this.menus = menuList.map((menu) => {
      //判断是一级菜单还是二级菜单
      const children = menu.children;
      if(children){
        return <SubMenu
          key={menu.key}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.title}</span>
            </span>
          }
        >
          {
            children.map((item) => {
              console.log(item.key);
              if (item.key === pathname) { //如果他们相等，就说明当前地址是二级菜单 ，需要展开一级菜单
                //初始化打开的菜单
                this.openKey = menu.key;
                isHome = false;
              }
              return this.createMenu(item)
            })
          }
        </SubMenu>
      }else{
        if(menu.key === pathname) isHome = false;
        return this.createMenu(menu);
      }
    } )
    //初始化选中的菜单
    this.selectedKey = isHome ? '/home' : pathname;
  }
  render(){
    const { collapsed } = this.props;
    return(<div>
      <Link className="header-left" to="/home">
        <img src={logo} alt="logo"/>
        <h1 style={{display:collapsed ? 'none' : 'block'}}>硅谷后台</h1>
      </Link>

     {/* defaultSelectedKeys 初始化选中的菜单选项*/}
      <Menu theme="dark" defaultSelectedKeys={[this.selectedKey]} defaultOpenKeys={[this.openKey]} mode="inline">
        {
          this.menus
        }
        {/*<Item key="home">
          <Link to="/home">
            <Icon type="home" />
            <span>首页</span>
          </Link>
        </Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="appstore" />
              <span>商品</span>
            </span>
          }
        >
          <Item key="/category">
            <Link to="/category">
              <Icon type="tool" />
              <span>品类管理</span>
            </Link>
          </Item>
          <Item key="/commodity">
            <Link to="/commodity">
              <Icon type="unordered-list" />
              <span>商品管理</span>
            </Link>
          </Item>
        </SubMenu>
        <Item key="user">
          <Link to="/user">
            <Icon type="user" />
            <span>用户管理</span>
          </Link>
        </Item>
        <Item key="authority">
          <Link to="/authority">
            <Icon type="safety" />
            <span>权限管理</span>
          </Link>
        </Item>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="area-chart" />
              <span>图形图表</span>
            </span>
          }
        >
          <Item key="/bar-chart">
            <Link to="/bar-chart">
              <Icon type="bar-chart" />
              <span>柱形图</span>
            </Link>
          </Item>
          <Item key="/line-chart">
            <Link to="/line-chart">
              <Icon type="line-chart" />
              <span>折线图</span>
            </Link>
          </Item>
          <Item key="/pie-chart">
            <Link to="/pie-chart">
              <Icon type="pie-chart" />
              <span>饼图</span>
            </Link>
          </Item>
        </SubMenu>*/}
      </Menu>
      </div>
    )
  }
}

//withRouter是高阶组件，给非路由组件传递路由组件的三大属性： history、location macth
export default withRouter(LeftNav);
