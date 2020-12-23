import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';

import VisibilityIcon from '@material-ui/icons/Visibility';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import NotesIcon from '@material-ui/icons/Notes';

import { Link } from "react-router-dom";

import ChainItemTermLookup from "./../ChainItemTermLookup";
import MathContent from "./../MathContent";

class ChainItemEdit extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			"id": props.term.id,
			"name": props.term.name,
			"text": props.term.text,
			"comment": props.term.comment,
			"edit": false
		}

		this.handleMoveDown = this.handleMoveDown.bind(this);
		this.handleMoveUp = this.handleMoveUp.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	handleMoveDown(){
		this.props.onMoveDown(this.props.index);
	}

	handleMoveUp(){
		this.props.onMoveUp(this.props.index);
	}

	handleDelete(){
		this.props.onDelete(this.props.index);
	}

	handleEdit(){
		this.setState({edit: !this.state.edit});
	}

	handleUpdate(term){
		this.props.onUpdate(term, this.props.index);
		this.setState({edit: !this.state.edit});
	}

	render(){

		return <React.Fragment>
			<Card key={this.state.id} style={{"margin": "10px"}}>
				<CardContent>
					{
						this.state.edit
						?
						<ChainItemTermLookup onSelect={this.handleUpdate}/>
						:
						<React.Fragment>
							<h4>{this.state.name}</h4>
							<MathContent>{this.state.text}</MathContent>
							<MathContent>{this.state.comment}</MathContent>
						</React.Fragment>
					}
				</CardContent>
				<CardActions>
					<IconButton onClick={this.handleMoveDown}>
	        			<ArrowDownwardIcon color="primary"/>
	        		</IconButton>
					<IconButton onClick={this.handleMoveUp}>
	        			<ArrowUpwardIcon color="primary"/>
	        		</IconButton>
	        		<IconButton>
	        			<NotesIcon color="primary"/>
	        		</IconButton>
	        		<IconButton onClick={this.handleDelete}>
	        			<DeleteIcon color="primary"/>
	        		</IconButton>
	        		<IconButton onClick={this.handleEdit}>
	        			<CreateIcon color="primary"/>
	        		</IconButton>
		        	<Link to={"/term/" + this.state.id} className="link">
		        		<IconButton>
		        			<VisibilityIcon color="primary"/>
		        		</IconButton>
		        	</Link>
			    </CardActions>
			</Card>
		</React.Fragment>;
	}

}

export default ChainItemEdit;