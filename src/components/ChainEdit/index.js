import React from 'react';

import './style.css';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import { withRouter } from "react-router";

import ChainEditListing from "./../ChainEditListing";

import * as ChainServices from "./../../services/chain.js";


class ChainEdit extends React.Component{

	constructor(props){
		super(props);
		this.state = {chain: [], name: "", description: "", snack_open: false};

		this.save = this.save.bind(this);
		this.closeSnackbar = this.closeSnackbar.bind(this);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleChainUpdate = this.handleChainUpdate.bind(this);
	}

	async componentDidMount(){
		const id = this.props.match.params.id;

		let http = await ChainServices.getOne(id);

		this.setState(http.data);

	}

	async save(){

		let id = this.props.match.params.id;
		let name = this.state.name;
		let description = this.state.description;
		let chain = this.state.chain;

		let http = await ChainServices.update(id, name, description, chain);

		if(http.status === 204){
			this.setState({snack_open: true});
		}

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
	}

	closeSnackbar(){
		this.setState({snack_open: false});
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
				<Snackbar
			        anchorOrigin={{
			          vertical: 'bottom',
			          horizontal: 'left',
			        }}
			        open={this.state.snack_open}
			        autoHideDuration={6000}
			        onClose={this.closeSnackbar}
			        message="Chain saved!"
			        action={
			          <React.Fragment>
			            <IconButton 
			            	size="small" 
			            	aria-label="close" 
			            	color="inherit" onClick={this.closeSnackbar}>
			              <CloseIcon fontSize="small" />
			            </IconButton>
			          </React.Fragment>
			        }
			      />
			</Grid>);

	}

}

export default withRouter(ChainEdit);