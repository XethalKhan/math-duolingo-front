import React from 'react';

import './style.css';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

import * as CourseServices from './../../services/course.js';

import CourseRowEdit from "./../CourseRowEdit";
import ModalChain from "./../ModalChain";

class CourseCreate extends React.Component{

	constructor(props){
		super(props);
		this.state = 
			{
				grid: [], 
				name: "", 
				description: "", 
				modal: false
			};

		this.addRow = this.addRow.bind(this);
		this.moveRowUp = this.moveRowUp.bind(this);
		this.moveRowDown = this.moveRowDown.bind(this);
		this.deleteRow = this.deleteRow.bind(this);

		this.displayModal = this.displayModal.bind(this);
		this.handleModalSelect = this.handleModalSelect.bind(this);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleGridUpdate = this.handleGridUpdate.bind(this);
	}

	addRow(){
		let grid = this.state.grid;
		grid.push({"items": [], "comment": ""});
		this.setState({"grid": grid});
	}

	moveRowUp(index){

		if(index === 0){
			return;
		}

		let grid = this.state.grid;

		let tmp = grid[index];
		grid[index] = grid[index - 1];
		grid[index - 1] = tmp;

		this.setState({"grid": grid});

	}

	moveRowDown(index){

		let grid = this.state.grid;

		if(index >= (grid.length - 1)){
			return;
		}

		let tmp = grid[index];
		grid[index] = grid[index + 1];
		grid[index + 1] = tmp;

		this.setState({"grid": grid});

	}

	deleteRow(index){
		let grid = this.state.grid;

		grid.splice(index, 1);

		this.setState({"grid": grid});
	}

	handleGridUpdate(row, index){
		let grid = this.state.grid;
		grid[index].items = row;
		this.setState({grid: grid});
	}

	displayModal(state, row = -1){
		let obj = {};
		obj.modal = state;

		if(state === true && row !== -1){
			obj.input_row = row;
		}

		this.setState(obj);
	}

	handleModalSelect(chain){
		let row = this.state.input_row;
		let grid = this.state.grid;

		if(grid[row].items.length > 2){
			this.displayModal(false);
			return;
		}

		grid[row].items.push(chain);

		this.setState({modal: false, grid: grid});
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

		let http = await CourseServices.create(
			this.state.name,
			this.state.description,
			this.state.grid,
			null
		);
	}

	render(){

		let courseMap = 
			this.state.grid.map((chains, index) => 
				<CourseRowEdit 
					key={index + (chains.items.length === 0 ? "" : chains.items[0].id)} 
					row = {chains.items}
					index = {index}
					onAdd={this.displayModal}
					onMoveUp={this.moveRowUp}
					onMoveDown={this.moveRowDown}
					onDelete={this.deleteRow}
					onUpdate={this.handleGridUpdate}/>
					
			);

		return <React.Fragment>
			<Grid container>
				<Grid item sizing={12} xs={12} style={{padding: "10px"}}>
					<TextField 
						fullWidth 
						label = "Name" 
						name = "name" 
						autoComplete = "off"
						value = {this.state.name} 
						onChange = {this.handleInputChange}/>
				</Grid>
				<Grid item sizing={12} xs={12} style={{padding: "10px"}}>
					<TextField 
						fullWidth 
						label = "Description" 
						name = "description" 
						autoComplete = "off"
						value = {this.state.description} 
						onChange = {this.handleInputChange}/>
				</Grid>
				<Grid item sizing={12} xs={12} style={{padding: "10px"}}>
					<IconButton color="primary" onClick={this.handleSave}>
						<SaveIcon />
					</IconButton>
					<IconButton color="primary" onClick={this.addRow}>
						<AddIcon />
					</IconButton>
				</Grid>
				{courseMap}
			</Grid>
			<ModalChain
				open={this.state.modal}
				onSelect={this.handleModalSelect}
				onChange={this.displayModal}
			/>
		</React.Fragment>;

	}

}

export default CourseCreate;