import React from 'react';

import './style.css';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';

import TermLookupTable from "./../TermLookupTable";

import * as StatementServices from "./../../services/statement";


class ChainItemTermLookup extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			name: "", 
			description: "", 
			type: "", 
			typeDDL: []
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.lookupRowAction = this.lookupRowAction.bind(this);
	}

	async componentDidMount(){
		let typeDDL = await StatementServices.getAll();

		this.setState({typeDDL: typeDDL.data});
	}

	handleInputChange(event){
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	    	[name]: value
	    });
	}

	lookupRowAction(term){
		return <React.Fragment>
			<IconButton onClick={(e) => this.props.onSelect(term, e)}>
				<CheckIcon color="primary"/>
			</IconButton>
		</React.Fragment>;
	}

	render(){

		let typeMap = 
			this.state.typeDDL.map((type) => 
				<MenuItem 
					key = {type.description} 
					value = { type.name }>
					{ type.name }
				</MenuItem>
			);

		return <form noValidate autoComplete="off">
			<Grid container>
					<Grid item xs={12}>
						<h2>Terms</h2>
					</Grid>
					<Grid container item xs={12}>
						<Grid item xs={12} sm={4} className="text-fields">
							<TextField  
								label = "Name" 
								variant ="outlined" 
								name = "name"
								value = {this.state.name} 
								onChange = {this.handleInputChange}
								fullWidth/>
						</Grid>
						<Grid item xs={12} sm={4} className="text-fields">
							<TextField 
								label="Description" 
								variant="outlined"
								name = "description"
								value = {this.state.description}
								onChange = {this.handleInputChange}
								fullWidth/>
						</Grid>
						<Grid item xs={12} sm={4} className="text-fields">
							<FormControl fullWidth variant="outlined">
							<InputLabel id="type-label">Type</InputLabel>
							<Select
								fullWidth
								labelId="type-label"
								name = "type"
								value={this.state.type}
								onChange={this.handleInputChange}
								label="Type"
							>
								<MenuItem value=""><em>None</em></MenuItem>
								{typeMap}
							</Select>
							</FormControl>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<TermLookupTable 
							name={this.state.name} 
							description={this.state.description}
							type={this.state.type}
							rowAction={this.lookupRowAction}/>
					</Grid>
				</Grid>
			</form>;
	}

}

export default ChainItemTermLookup;