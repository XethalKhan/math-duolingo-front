import React from 'react';

import './style.css';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';

import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import { Link } from "react-router-dom";

import TermLookupTable from "./../TermLookupTable";

import StatementServices from "./../../services/statement";


class TermList extends React.Component{

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
			<IconButton>
				<Link to={"/term/" + term.id}>
					<VisibilityIcon color="primary"/>
				</Link>
			</IconButton>
			<IconButton>
				<Link to={"/edit/term/" + term.id}>
					<EditIcon color="primary"/>
				</Link>
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
						<h1>Term list</h1>
					</Grid>
					<Grid item xs={12}>
						<IconButton>
							<Link to="/create/term">
								<AddIcon color="primary"/>
							</Link>
						</IconButton>
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

export default TermList;