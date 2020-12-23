import React from 'react';

import './style.css';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import { Link } from "react-router-dom";

import * as ArrayUtils from "./../../util/array.js";

class CourseRowLayout extends React.Component{

	constructor(props){
		super(props);
		this.state = {list: props.list};
	}

	componentDidUpdate(prevProps){

		let modified = false;
		let obj = {};

		if(!ArrayUtils.arraysEqual(prevProps.list, this.props.list)){
			obj.list = this.props.list;
			modified = true;
		}

		if(modified){
			this.setState(obj);
		}

	}

	render(){

		let count = 1;

		return (
			<Grid className="chain-row" container justify="center" alignItems="center">

				{this.state.list.map((chain) =>

					<Grid item key={chain.id} align="center" sizing={4} xs={4} sm={4}>
						<Link to={ "/chain/" + chain.id } className="link" >
							<Avatar style={{backgroundColor: "#3f51b5"}}>{count++}</Avatar><br/>
							{chain.name}
						</Link>
					</Grid>

				)}

			</Grid>);

	}

}

export default CourseRowLayout;