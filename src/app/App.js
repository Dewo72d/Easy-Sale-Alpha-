import React from 'react';
import Navbar from '../nav/Navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import SingUp from '../sing-in-up/sing-up';
import SingIn from '../sing-in-up/sing-in';
import Main from '../main/Main';
import ListOfProducts from '../product_List/ListOfProducts';
import AddProduct from '../addProduct/AddProduct';
import Userproduct from '../cabinet/Userproducts';
import ViewUserProduct from '../cabinet/ViewUserProduct';
import Page404 from './page404/Page404';

class App extends React.Component {
    render() {
        return (
        <Router>
            <Navbar />
                <Switch>
                 <Route exact path='/cabinet/userproduct/' component={Userproduct}/>
                 <Route exact path='/cabinet/view_user_product/' component={ViewUserProduct} />
                 <Route exact path='/login' component={SingIn}/>
                 <Route exact path='/registration' component={SingUp}/>
                 <Route exact path='/product_list' component={ListOfProducts}/>
                 <Route exact path='/add_product' component={AddProduct}/>
                 <Route exact path='/' component={Main}/>
                 <Route component={Page404} />
                </Switch>
        </Router>            
        )
    }
}

export default App ;