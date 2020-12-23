import React from 'react';

import './style.css';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';

import MathContent from "./../MathContent";

class MathTextArea extends React.Component{

	constructor(props){
		super(props);

		this.state = {"value": props.value, "markdown": false};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.changeTextDisplay = this.changeTextDisplay.bind(this);
	}

	handleOnChange(event){
		this.props.onChange(event);

	    const value = event.target.value;

	    this.setState({"value": value});
	}

	changeTextDisplay(){
		this.setState({"markdown": !this.state.markdown});
	}

	render(){

		let preview;

		if(this.state.markdown){
			preview = <MathContent>{this.state.value}</MathContent>;
		}else{
			preview = 
				<TextField
					fullWidth 
					multiline 
					label={this.props.label}
					name={this.props.name}
					variant="outlined"
  					rows={14} 
  					value={this.state.value} 
  					onChange={this.handleOnChange}/>;
		}

		return <React.Fragment>
			<Grid item container sizing={11} xs={11}>
			{preview}
			</Grid>
			<Grid item sizing={1} xs={1} className="icon-button">
				<IconButton 
					aria-label="Save" 
					color="primary" 
					onClick={this.changeTextDisplay}>
					<FlipCameraAndroidIcon />
				</IconButton>
			</Grid>
		</React.Fragment>;
	}

}

export default MathTextArea;