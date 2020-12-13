import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
    BrowserRouter
  } from 'react-router-dom';
import {List, ListItemText, ListItemIcon, ListItem, Drawer, Divider } from '@material-ui/core'

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
    };
  }

  handleDrawerOpen = () => {
    this.setState({drawerBool : true})
    console.log(this.state.drawerBool);
  }
 

  render() {

    return (
      <BrowserRouter>
        <div >
          <AppBar position='static'>
            <Toolbar style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <IconButton edge='start'  color='inherit'  aria-label='open drawer'  onClick={() => this.setState({drawerBool : true})} >
                <MenuIcon style={{ fontSize: 30 }} /> 
              </IconButton>  
              <Drawer  open={this.state.drawerBool}>
                    <List>
                      <ListItem button style={{marginBottom: 20}} onClick={() => document.location.href = '/'}>
                          <ListItemIcon>
                            <HomeIcon  style={{ fontSize: 40 }} />
                          </ListItemIcon>
                          <ListItemText primary='На главную' />
                      </ListItem>
                      <ListItem button style={{marginBottom : 20}} onClick={() => document.location.href = '/add_product'}>
                          <ListItemIcon>
                            <AddIcon  style={{ fontSize: 40 }} />
                          </ListItemIcon>
                          <ListItemText primary='Добавить' />
                      </ListItem> 
                      <ListItem button style={{marginBottom: 20}} onClick={() => document.location.href = '/product_list'}>
                          <ListItemIcon>
                            <FormatListBulletedIcon  style={{ fontSize: 40 }} />
                          </ListItemIcon>
                          <ListItemText primary='Список товаров' />
                      </ListItem>
                      <ListItem button style={{marginBottom : 20}} onClick={() => {
                        console.log(document.cookie);
                         document.cookie = document.cookie.split('=')[0] += '=; max-age=0';
                         location.reload();
                        }}>
                          <ListItemIcon>
                            <ExitToAppIcon  style={{ fontSize: 40 }} />
                          </ListItemIcon>
                          <ListItemText primary='Выход' />
                      </ListItem>     
                    </List>
                    <IconButton onClick={() => this.setState({drawerBool : false})} >
                      <ArrowBackIcon style={{ fontSize: 40 }} /> 
                    </IconButton>
                </Drawer> 
                <Typography edge='start'  onClick={() => document.location.href = '/'} variant='h6' >
                  Easy Sale
                </Typography> 
                <Typography style={{marginLeft: 'auto'}}>
                  <Button  href='/login' variant='h6' color='inherit'>Вход</Button>                
                </Typography>   
            </Toolbar>
          </AppBar>
        </div>
      </BrowserRouter>    
    )     
  }
}

export default Navbar ;