import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button'
import Userproduct from './Userproducts';

class ViewUserProduct extends React.Component {
    constructor (props) {
        super(props)
        this.state= {
          isLoaded: false,
          users : [],
          error: null,
        };
    }
    
    /*componentDidMount() {
      fetch('http://localhost:3000/api/', {
        method: 'POST',
        body:document.cookie.toString()})
      .then(res => res.json()) 
      .then(
        (results) => {       
          this.setState({
          isLoaded: true,
          users: results
          }); 
        },
        (error) =>{
          this.setState({
            isLoaded : true,
            error: 1
          })     
        }
      )
    }*/

    render() {
    if(this.state.error == 1 ) {
      return (<Redirect push to='/login' />)
    } else {
    return (
        <div>
           {this.props.message}sss
        </div>
      )     
    }
  }
}
export default ViewUserProduct ;