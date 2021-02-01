import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {TextField, Button ,Typography, Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';

import {details} from './details.json';

import {getDetails} from './api/details.js';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      type: '',
      regular: false,
      priorities: [...details].filter(detail => {return detail.payment_type === 'priority'}), 
      regulars: [...details].filter(detail => {return detail.payment_type === 'regular'}),
      list: {}
    }

    this.handleApi = this.handleApi.bind(this);
    this.handleApi();


    this.handleType = this.handleType.bind(this);
    this.handleRegular = this.handleRegular.bind(this);
    this.handleTab = this.handleTab.bind(this);

    console.log('priorities', this.state.priorities);
    console.log('regulars', this.state.regulars);
  }

  handleType(e){
    this.setState({type: e.target.value})
  }

  handleRegular(e){
    e.preventDefault();
    this.setState({regular: !this.state.regular})
  }

  async handleApi(){
    this.state.list = await getDetails();
    console.log('handleApi', this.state.list)
  }

  handleTab(e){
    console.log(e)
  }

  render(){
    return(

      <div className="w-25 p-3 mx-auto space-between">
        <Typography variant='h6'>Add payment</Typography>
        
        <form>
          
          <div  className="mb-3">
            <Select
            label="type"
            inputProps={{id:"select"}}
            value={this.state.type} 
            onChange={this.handleType}
            variant="outlined"
            fullWidth
            >
              <MenuItem fullWidth value=""></MenuItem>
              <MenuItem fullWidth value="company">company</MenuItem>
              <MenuItem fullWidth value="individual">individual</MenuItem>
            </Select>
          </div>

          <div className="mb-3" hidden={this.state.type === ''}>

            <TextField
            fullWidth 
            id='beneficiary-name'
            className="mb-3"
            variant='outlined'
            label={
              this.state.type === "company" ? 
              "beneficiary company name" :
              "beneficiary first name"
            }/>

            <TextField fullWidth id="text" className="mb-3" variant='outlined' hidden={this.state.type!=='individual'} label="beneficiary last name"/>

          <div className='mb-3'>
            <Button disabled={!this.state.regular} onClick={this.handleRegular}>Priority payment</Button>
            <Button disabled={this.state.regular} onClick={this.handleRegular}>Regular payment</Button>
          </div>

          <div className="mb-3">
            {
              !this.state.regular ?
              (
                <div>
                  <div hidden={this.state.type === 'individual'}>
                    <TextField fullWidth id='beneficiary-company-name' className='mb-3' label='beneficiary company name' variant='outlined' />
                    <TextField fullWidth id='beneficiary-address' className='mb-3' label='beneficiary address' variant='outlined' />
                    <TextField fullWidth id='iban' className='mb-3' label='iban' variant='outlined' />
                    <TextField fullWidth id='beneficiary-last-name' className='mb-3' label='beneficiary last name' variant='outlined' />
                    <TextField fullWidth id='bic-swift' className='mb-3' label='bic swift' variant='outlined' />
                  </div>
                  <div hidden={this.state.type === 'company'}>
                    <TextField fullWidth id='beneficiary-last-name' className='mb-3' label='beneficiary last name' variant='outlined' />
                    <TextField fullWidth id='beneficiary-address' className='mb-3' label='beneficiary address' variant='outlined' />
                    <TextField fullWidth id='iban' className='mb-3' label='iban' variant='outlined' />
                    <TextField fullWidth id='beneficiary-first-name' className='mb-3' label='beneficiary first name' variant='outlined' />
                    <TextField fullWidth id='bic-swift' className='mb-3' label='bic swift' variant='outlined' />
                  </div>
                </div>
              ) :
              (
                <div className="mb-3">
                    <TextField fullWidth id='iban' className='mb-3' label='iban' variant='outlined' />
                </div>
              )

            }
          </div>

            <div>
              <Button>Cancel</Button>
              <Button variant='contained' color="primary" type="button">Add</Button>
            </div>
          </div>

        </form>
      </div>

    )
  }
}

export default App;
