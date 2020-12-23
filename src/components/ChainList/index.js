import React from 'react';

import './style.css';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import { Link } from "react-router-dom";

import ChainLookupTable from "./../ChainLookupTable";


class ChainList extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			name: "", 
			description: ""
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.lookupRowAction = this.lookupRowAction.bind(this);
	}

	handleInputChange(event){
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	    	[name]: value
	    });
	}

	lookupRowAction(chain){
		return <React.Fragment>
			<IconButton>
				<Link to={"/chain/" + chain.id}>
					<VisibilityIcon color="primary"/>
				</Link>
			</IconButton>
			<IconButton>
				<Link to={"/edit/chain/" + chain.id}>
					<EditIcon color="primary"/>
				</Link>
			</IconButton>
		</React.Fragment>;
	}

	render(){

		return <form noValidate autoComplete="off">
			<Grid container>
					<Grid item xs={12}>
						<h1>Chain list</h1>
					</Grid>
					<Grid item xs={12}>
						<IconButton>
							<Link to="/create/chain">
								<AddIcon color="primary"/>
							</Link>
						</IconButton>
					</Grid>
					<Grid container item xs={12}>
						<Grid item xs={12} sm={6} className="text-fields">
							<TextField  
								label = "Name" 
								variant ="outlined" 
								name = "name"
								value = {this.state.name} 
								onChange = {this.handleInputChange}
								fullWidth/>
						</Grid>
						<Grid item xs={12} sm={6} className="text-fields">
							<TextField 
								label="Description" 
								variant="outlined"
								name = "description"
								value = {this.state.description}
								onChange = {this.handleInputChange}
								fullWidth/>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<ChainLookupTable 
							name={this.state.name} 
							description={this.state.description}
							rowAction={this.lookupRowAction}/>
					</Grid>
				</Grid>
			</form>;
	}

}

export default ChainList;