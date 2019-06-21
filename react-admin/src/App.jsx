import React,{ Component } from 'react';
import { BrowserRouter , Switch , Route } from 'react-router-dom';

import Login from './pages/login/index';
import Admin from './pages/admin/index';

import { Button } from 'antd';
export default class App extends Component{
  render(){
    return(
      <div>
        {/*<Button type="primary">按钮</Button>*/}
        <BrowserRouter>
          <Switch>
            <Route path="/login"  component={Login}/>
            <Route path="/" component={Admin} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

