import React from 'react';

import './style.css';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';

import ChainItemEdit from "./../ChainItemEdit";

import ArrayUtils from "./../../util/array.js";

class ChainEditListing extends React.Component{

	constructor(props){
		super(props);
		this.state = {chain: props.chain};

		this.addTerm = this.addTerm.bind(this);
		this.moveDownTerm = this.moveDownTerm.bind(this);
		this.moveUpTerm = this.moveUpTerm.bind(this);
		this.deleteTerm = this.deleteTerm.bind(this);
		this.updateTerm = this.updateTerm.bind(this);

		this.handleOnChange = this.handleOnChange.bind(this);
	}

	componentDidUpdate(prevProps){

		if(!ArrayUtils.arraysEqual(this.props.chain, prevProps.chain)){
			this.setState({chain: this.props.chain});
		}

	}

	addTerm(){
		let terms = this.state.chain;

		terms.push({"id": "", "name": "", "text": "", "comment": ""});

		this.setState({"chain": terms});

		this.handleOnChange(this.state.chain);
	}

	moveDownTerm(index){
		let terms = this.state.chain;

		if((index + 1) === terms.length){
			return;
		}

		ArrayUtils.switchElements(terms, index, index + 1);

		this.setState({"chain": terms});

		this.handleOnChange(this.state.chain);
	}

	moveUpTerm(index){
		let terms = this.state.chain;

		if(index === 0){
			return;
		}

		ArrayUtils.switchElements(terms, index, index - 1);

		this.setState({"chain": terms});

		this.handleOnChange(this.state.chain);
	}

	deleteTerm(index){
		let terms = this.state.chain;

		terms.splice(index, 1);

		this.setState({"chain": terms});

		this.handleOnChange(this.state.chain);
	}

	updateTerm(term, index){
		let terms = this.state.chain;

		let obj = {
			id: term.id,
			name: term.name,
			text: term.text,
			comment: term.comment
		}

		terms[index] = obj;

		this.setState({"chain": terms});

		this.handleOnChange(this.state.chain);
	}

	handleOnChange(chain){
		this.props.onChange(chain);
	}

	render(){

		let chain = 
			this.state.chain.map((term, index) => 
				<ChainItemEdit 
					key = {term.id + index}
					term = {term}
					index = {index}
					onMoveDown = {this.moveDownTerm}
					onMoveUp = {this.moveUpTerm}
					onDelete = {this.deleteTerm}
					onUpdate = {this.updateTerm}
				/>
			);

		return <Grid container>
			<Grid item sizing={12} xs={12}>
				<IconButton color="primary" onClick={this.addTerm}>
					<AddIcon />
				</IconButton><br/>
			</Grid>
			<Grid item sizing={12} xs={12}>
				{chain}
			</Grid>
		</Grid>;

	}

}

export default ChainEditListing;