import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link, BrowserRouter} from 'react-router-dom';
import {List, ListItemText, ListItemIcon, ListItem, Drawer, Divider,  } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

class Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.state= {
      drawerBool: false,
      error: null,
      isLoaded: false,
      menu: [{name: 'Главная' , path: '/'}, {name: 'Добавить объявление', path: '/add_product'},
       {name: 'Список продуктов', path: '/product_list'}, {name: 'Мои объявления', path: '/cabinet/userproduct/'}],
    };
  }

  handleDrawerOpen = () => {
    this.setState({drawerBool : true})
  }

  render() {
    return (
        <div >     
          <AppBar position='static'>
            <Toolbar style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <IconButton edge='start'  color='inherit'  aria-label='open drawer'  onClick={() => this.setState({drawerBool : true})} >
                <MenuIcon style={{ fontSize: 30 }} /> 
              </IconButton>  
              <Drawer  open={this.state.drawerBool}>
              {this.state.menu.map((i, k) => {
                return(
                <ListItem button  key={k}>
                    <Link style={{textDecoration: 'none'}} to={i.path} key={k}><ListItemText style={{color: 'black'}}><h3>{i.name}</h3></ListItemText></Link>
                </ListItem>
              )})}

                <ListItem button>
                    <ListItemText onClick={() => {return fetch('http://localhost:3000/api/logout') 
                    .then(() => {this.setState({isLoaded: true})
                     console.log(this.state.isLoaded)}) }} style={{color: 'black'}}><h3>Выход</h3></ListItemText>
                </ListItem>
                  <IconButton onClick={() => this.setState({drawerBool : false})} >
                    <ArrowBackIcon style={{ fontSize: 40 }} /> 
                  </IconButton>
              </Drawer> 
                <Typography edge='start' variant='h6' >
                  Easy Sale
                </Typography> 
                <Typography style={{marginLeft: 'auto'}}>
                 <Link to='/login' style={{textDecoration: 'none'}}><Button style={{color: 'white'}}>Вход</Button></Link>
                </Typography>   
            </Toolbar>
          </AppBar>
        </div>    
    )     
  }
}

export default Navbar ;