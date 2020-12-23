import React from 'react';

import './style.css';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import SaveIcon from '@material-ui/icons/Save';

import { withRouter } from "react-router";

import MathTextArea from "./../MathTextArea";
import LoadingBackdrop from "./../LoadingBackdrop";

import TermServices from "./../../services/term";
import StatementServices from "./../../services/statement";


class TermCreate extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			name: '', 
			type: '', 
			description: '', 
			text: '', 
			comment: '', 
			reference: '', 
			typeDDL: [],
			processing: false
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	async componentDidMount(){

		let typeDDL = await StatementServices.getAll();

		this.setState({"typeDDL": typeDDL.data});

	}

	handleInputChange(event){

	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	    	[name]: value
	    });
	}

	async handleSave(event){

		this.setState({processing: true});
				
		let http = await TermServices.create(
			this.state.name,
			this.state.type,
			this.state.description,
			this.state.text,
			this.state.comment,
			this.state.reference
		);

		let url = "/term/" + http.data.id;

		this.props.history.push(url);
		
	}

	render(){

		let typeMap = 
			this.state.typeDDL.map((type) => 
				<MenuItem key = {type.description} value = { type.name }>{ type.name }</MenuItem>
			);

		return (
			<Container maxWidth="lg">
			<LoadingBackdrop open={this.state.processing}/>
			<form>
				<Grid container>
					<Grid item sizing={12} xs={12}>
						<IconButton color="primary" onClick={this.handleSave}>
							<SaveIcon />
						</IconButton>
					</Grid>
						<Grid item container sizing={12} xs={12}>
							<Grid item sizing={12} sm={12} md={5} className="input-text">
								<TextField 
									fullWidth 
									label = "Name" 
									name = "name" 
									autoComplete = "off"
									value = {this.state.name} 
									onChange = {this.handleInputChange}/>
							</Grid>
							<Grid item sizing={12} sm={12} md={5} className="input-text">
								<TextField 
									fullWidth 
									label = "Description" 
									name = "description" 
									autoComplete = "off"
									value = {this.state.description} 
									onChange = {this.handleInputChange}/>
							</Grid>
							<Grid item sizing={12} sm={12} md={2} className="input-text">
								<InputLabel id="type-ddl">Type</InputLabel>
								<Select
									fullWidth
									labelId="type-ddl"
									name = "type"
									value={this.state.type}
									onChange={this.handleInputChange}
									label="Type"
								>
									<MenuItem value=""><em>None</em></MenuItem>
									{typeMap}
								</Select>
							</Grid>
						</Grid>
						<Grid item container sizing={12} xs={12} style={{paddingTop: "10px"}}>
							<MathTextArea 
								value={this.state.text} 
								label="Text" 
								name="text" 
								onChange={this.handleInputChange}/>
						</Grid>
						<Grid item container sizing={12} xs={12} style={{paddingTop: "10px"}}>
							<MathTextArea 
								value={this.state.comment} 
								label="Comment" 
								name="comment" 
								onChange={this.handleInputChange}/>
						</Grid>
						<Grid item container sizing={12} xs={12} style={{paddingTop: "10px"}}>
							<MathTextArea 
								value={this.state.reference} 
								label="Reference" 
								name="reference" 
								onChange={this.handleInputChange}/>
						</Grid>
				</Grid>
			</form>
			</Container>);

	}

}

export default withRouter(TermCreate);