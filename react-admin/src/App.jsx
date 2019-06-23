import React,{ Component } from 'react';
import {  Switch , Route } from 'react-router-dom';

import Login from './pages/login/index';
import Admin from './pages/admin/index';


// import { Button } from 'antd';
export default class App extends Component{
  render(){
    return <Switch>
      <Route path="/login"  component={Login}/>
      <Route path="/" component={Admin} />
    </Switch>
  }
}

