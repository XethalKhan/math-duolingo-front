import React from 'react';

import './style.css';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { Link } from "react-router-dom";

import * as ArrayUtils from "./../../util/array.js";

class CourseRowEdit extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			row: props.row,
			index: props.index
		}

		this.moveItemLeft = this.moveItemLeft.bind(this);
		this.moveItemRight = this.moveItemRight.bind(this);
		this.deleteItem = this.deleteItem.bind(this);

		this.moveRowUp = this.moveRowUp.bind(this);
		this.moveRowDown = this.moveRowDown.bind(this);
		this.deleteRow = this.deleteRow.bind(this);
		this.addItem = this.addItem.bind(this);
	}

	componentDidUpdate(prevProps){

		let updated = false;
		let obj = {};

		if(!(ArrayUtils.arraysEqual(this.props.row, prevProps.row))){
			obj.row = this.props.row;
			updated = true;
		}

		if(!(this.props.index === prevProps.index)){
			obj.index = this.props.index;
			updated = true;
		}

		if(updated){
			this.setState(obj);
		}

	}

	moveItemLeft(index){

		if(index === 0){
			return;
		}

		let row = this.state.row;

		let tmp = row[index];
		row[index] = row[index - 1];
		row[index - 1] = tmp;

		this.props.onUpdate(row, this.props.index);

	}

	moveItemRight(index){

		let row = this.state.row;

		if(index >= (row.length - 1)){
			return;
		}

		let tmp = row[index];
		row[index] = row[index + 1];
		row[index + 1] = tmp;

		this.props.onUpdate(row, this.props.index);

	}

	deleteItem(index){

		let row = this.state.row;

		if(row.length === 1){
			this.props.onUpdate([], this.props.index);
			return;
		}

		row.splice(index, 1);

		this.props.onUpdate(row, this.props.index);

	}

	addItem(){
		this.props.onAdd(true, this.state.index);
	}

	moveRowUp(){
		this.props.onMoveUp(this.props.index);
	}

	moveRowDown(){
		this.props.onMoveDown(this.props.index);
	}

	deleteRow(){
		this.props.onDelete(this.props.index);
	}

	render(){

		let chains;
		let row = this.state.row;
		let counter = 0;
		if(row.length === 0){
			chains = <Grid item sizing={9} xs={9} sm={9}></Grid>;
		}else{
			chains = row.map((chain, index) =>
				<Grid 
					item 
					key={chain.id} 
					align="center" 
					sizing={row.length === 2 ? 4 : 9 / row.length} 
					xs={row.length === 2 ? 4 : 9 / row.length} 
					sm={row.length === 2 ? 4 : 9 / row.length}>
					<Link to={ "/chain/" + chain.id } className="link" >
						<Avatar style={{backgroundColor: "#3f51b5"}}>{++counter}</Avatar>
						<br/>
						{chain.name}
					</Link>
					<br/>
						<IconButton color="primary" onClick={this.moveItemLeft.bind(this, index)}>
							<ArrowBackIcon />
						</IconButton>
						<IconButton color="primary" onClick={this.moveItemRight.bind(this, index)}>
							<ArrowForwardIcon />
						</IconButton>
						<IconButton color="primary" onClick={this.deleteItem.bind(this, index)}>
							<DeleteIcon />
						</IconButton>
				</Grid>

			);
		}

		return <Grid className="chain-row" container justify="center" alignItems="center">
					{chains}
					{
						this.state.row.length === 2 ? 
						<Grid item align="center" sizing={1} xs={1} sm={1}>
						</Grid> 
						: 
						''}
					<Grid item align="center" sizing={3} xs={3} sm={3}>
						<IconButton color="primary" onClick={this.moveRowUp}>
							<ArrowUpwardIcon />
						</IconButton>
						<IconButton color="primary" onClick={this.moveRowDown}>
							<ArrowDownwardIcon />
						</IconButton>
						<IconButton color="primary" onClick={this.addItem}>
							<AddIcon />
						</IconButton>
						<IconButton color="primary" onClick={this.deleteRow}>
							<DeleteIcon />
						</IconButton>
					</Grid>
				</Grid>;

	}

}

export default CourseRowEdit;