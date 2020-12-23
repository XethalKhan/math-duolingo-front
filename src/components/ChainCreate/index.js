import React from 'react';

import './style.css';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import SaveIcon from '@material-ui/icons/Save';

import ChainEditListing from "./../ChainEditListing";

import * as ChainServices from "./../../services/chain.js";


class ChainCreate extends React.Component{

	constructor(props){
		super(props);
		this.state = {chain: [], name: "", description: ""};

		this.save = this.save.bind(this);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleChainUpdate = this.handleChainUpdate.bind(this);
	}

	async save(){

		let name = this.state.name;
		let description = this.state.description;
		let chain = this.state.chain;

		let http = await ChainServices.create(name, description, chain);

	}

	handleInputChange(event){
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	    	[name]: value
	    });
	}

	handleChainUpdate(newChain){
		this.setState({chain: newChain});
		console.log(this.state);
	}

	render(){

		return (
			<Grid container>
				<Grid item sizing={12} xs={12}>
					<IconButton onClick={this.save}>
						<SaveIcon color="primary"/>
					</IconButton>
				</Grid>
				<Grid item sizing={12} xs={12} style={{"padding": "5px"}}>
					<TextField 
						fullWidth 
						label = "Name" 
						name = "name" 
						autoComplete = "off"
						value = {this.state.name} 
						onChange = {this.handleInputChange}/>
				</Grid>
				<Grid item sizing={12} xs={12} style={{"padding": "5px"}}>
					<TextField 
						fullWidth 
						label = "Description" 
						name = "description" 
						autoComplete = "off"
						value = {this.state.description} 
						onChange = {this.handleInputChange}/>
				</Grid>
				<Grid item sizing={12} xs={12}>
					<ChainEditListing 
						chain={this.state.chain} 
						onChange={this.handleChainUpdate}/>
				</Grid>
			</Grid>);

	}

}

export default ChainCreate;