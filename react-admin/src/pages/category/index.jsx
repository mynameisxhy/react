import React, { Component } from 'react';
import { Card ,Button ,Icon ,Table ,Modal , message } from 'antd';
import MyButton from "../../components/my-button";
import { reqCategories , reqAddCategory , reqUpdateCategoryName } from '../../api';
import './index.less';
import AddCategoryForm from './add-category-form';
import UpdateCategoryNameForm from './update-category-name';


export default class Category extends Component {
  state = {
    categories:[], //一级分类列表
    subCategories:[], //二级分类列表
    isShowSubCategories:false, //是否显示二级分类列表
    isShowAddCategory:false, //显示添加品类
    isShowUpdateCategoryName:false,  //显示修改分类名称
    loading:true  //是否显示Loading
  };
  category = {};

  componentDidMount(){ //发请求
    this.fetchCategories('0')
  };
  fetchCategories =async (parentId) =>{
    this.setState({
      loading:true
    });
   const result = await reqCategories(parentId);
   if(result){
     if(parentId === '0'){
       this.setState({categories:result}); //用一个新数组接收一级分类数据
     }else{
       this.setState({
         subCategories:result,  //用一个新数组接收二级分类数据
         isShowSubCategories:true
       })
     }
   }
   this.setState({
     loading:false
   })
  };
  //添加品类
  addCategory = () =>{
    const { form } = this.addCategoryForm.props;
    form.validateFields(async (err,values) => {
      if(!err){
        // console.log(values);
        const { parentId , categoryName } = values;
        const result = await reqAddCategory(parentId,categoryName);
        if(result){
          //添加分类成功
          message.success('添加分类成功',2);
          //清空表单数据
          form.resetFields(['parentId','categoryName']);

          //如果是一级分类：就在一级分类列表中展示
          //如果是二级分类。
          //    当前显示的一级分类不需要展示
          //    当前显示的是二级分类，还需要满足添加分类的一级分类和当前显示的一级分类一致，才显示。否则不显示

          const options = { isShowAddCategory:false } ;
          const { isShowSubCategories } = this.state;
          if(result.parentId === '0'){
            options.categories=[...this.state.categories,result] //创建一个新数组，并将新添加的一级分类 塞到数组最后面
          }else if(isShowSubCategories && result.parentId === this.parentCategory._id ){
            options.subCategories=[...this.state.subCategories,result]
          }

           //统一更新
          this.setState(options);
        }
      }
    })
  };
  /*
  *  切换显示
  * */
  toggleDisplay = (stateName,stateValue) =>{
    return() =>{
      this.setState({
        [stateName]:stateValue
      })
    }
  };
  hideUpdateCategoryName = () => {
    //清空表单项的值
    this.updateCategoryNameForm.props.form.resetFields(['categoryName']);
    //隐藏对话框
    this.setState({
      isShowUpdateCategoryName : false
    })
  };
  saveCategory = (category) => {
    return () => {
      //保存要更新的数据
      this.category = category;
      this.setState({
        isShowUpdateCategoryName:true
      })
    };
  };

  updateCategoryName =() =>{
    const { form } =  this.updateCategoryNameForm.props;
    //校验表单，收集数据
      form.validateFields(async (err,values) => {
        if (!err) {
          const {categoryName} = values;
          const categoryId = this.category._id;
          //通过发送请求
          const result =await reqUpdateCategoryName(categoryId, categoryName);

          if (result) {
            const { parentId } = this.category;
            //一级分类数据
            let categoryDate = this.state.categories;
            let stateName = 'categories';
            if( parentId !== '0'){
              //二级分类数据
              categoryDate = this.state.subCategories;
              stateName = 'subCategories';
            }

            //不想修改原数据
            console.log(result);
            const categories = categoryDate.map((category) => {
              let {_id, name, parentId} = category;
              //找到对应id 的category，修改分类名称
              if (_id === categoryId) {
                name = categoryName;
                return {
                  _id,
                  name,
                  parentId
                }
              }
                //没有修改的数据直接返回
                return category
            });

              // 清空表单项的值 隐藏对话框
              form.resetFields(['categoryName']);
              message.success('更新分类名称成功',2);
              this.setState({
                isShowUpdateCategoryName: false,
                //判断，根据传入的值 显示数据
                [stateName]:categories
              })
            }
          }
        })
  };

  //显示子品类
  showSubCategory = (category) =>{
    return async () =>{
      //请求二级分类数据
      this.parentCategory = category ;
      this.fetchCategories(category._id)
    }
  };
  goBack = () =>{
    this.setState({
      isShowSubCategories : false
    })
  };

  render() {
    const { categories , subCategories ,  isShowAddCategory ,isShowSubCategories ,isShowUpdateCategoryName ,loading } = this.state;
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        // dataIndex: 'operation',
        className:'category-operation',
        //改变当前列的显示
        render: category =>{
          // console.log(category);

          return <div>
            <MyButton onClick={ this.saveCategory(category) }>修改名称</MyButton>
            {
              this.state.isShowSubCategories ? null : <MyButton onClick={ this.showSubCategory(category)}>查看其子品类</MyButton>
            }
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
    return <Card
      title={isShowSubCategories ? <div><MyButton onClick={this.goBack}>一级分类</MyButton><Icon type="arrow-right"/>&nbsp;{this.parentCategory.name}</div> :"一级分类列表" }
       extra={<Button type="primary" onClick={this.toggleDisplay('isShowAddCategory',true)}><Icon type="plus" />添加品类目录</Button>}>
      <Table
        columns={columns}
        dataSource={isShowSubCategories ? subCategories : categories} //数据源，显示数据
        bordered
        pagination={{
          showSizeChanger:true,
          pageSizeOptions:['3', '6', '9', '12'],
          defaultPageSize:3,
          showQuickJumper:true
        }}
        rowKey="_id"
        loading={loading}
      />
      <Modal
        title="添加分类"
        visible={isShowAddCategory}
        onOk={this.addCategory}
        onCancel={this.toggleDisplay('isShowAddCategory',false)}
        okText="确定"
        cancelText="取消"
      >
        {/*  wrappedComponentRef 是 AddCategoryForm 本身提供的功能 ,将组件实例对象传进来，挂载到当前组件实例上*/}
        {/* wrappedComponentRef  只能用车Form.create 产生的组件 */}
        <AddCategoryForm categories={categories} wrappedComponentRef={(form) => this.addCategoryForm=form} />
      </Modal>
      <Modal
        title="修改分类名称"
        visible={isShowUpdateCategoryName}
        onOk={this.updateCategoryName}
        onCancel={this.hideUpdateCategoryName}
        okText="确定"
        cancelText="取消"
        width={300}
      >
        {/*  wrappedComponentRef 是 AddCategoryForm 本身提供的功能 ,将组件实例对象传进来，挂载到当前组件实例上*/}
        {/* wrappedComponentRef  只能用车Form.create 产生的组件 */}
        <UpdateCategoryNameForm categoryName={this.category.name} wrappedComponentRef={(form) => this.updateCategoryNameForm=form} />
      </Modal>
      </Card>
  }
}
