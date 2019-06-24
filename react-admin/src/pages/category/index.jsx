import React, { Component } from 'react';
import { Card ,Button ,Icon ,Table} from 'antd';
import MyButton from "../../components/my-button";
import { reqCategories } from '../../api';
import './index.less';


export default class Category extends Component {
  state = {
    categories:[] //一级分类列表
  };

  async componentDidMount(){ //发请求
    const result =await reqCategories('0');
    if(result){
      this.setState({categories:result});
    }

  }
  render() {
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        className:'category-operation',
        //改变当前列的显示
        render: text =>{
          return <div>
            <MyButton>修改名称</MyButton>
            <MyButton>查看其子品类</MyButton>
          </div>
        }
      },
    ];
 /*   const data =[
      {
        key:'1',
        categoryName:'手机',
      },
      {
        key:'2',
        categoryName:'电脑'
      },
      {
        key:'3',
        categoryName:'耳机'
      },
      {
        key:'4',
        categoryName:'键盘'
      }
    ]*/
    return <Card title="一级分类列表" extra={<Button type="primary"><Icon type="plus" />添加品类目录</Button>}>
        <Table
          columns={columns}
          dataSource={this.state.categories}
          bordered
          pagination={{
            showSizeChanger:true,
            pageSizeOptions:['3', '6', '9', '12'],
            defaultPageSize:3,
            showQuickJumper:true
          }}
        />
      </Card>
  }
}