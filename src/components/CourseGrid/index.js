import React from 'react';

import './style.css';

import Grid from '@material-ui/core/Grid';

import { Link } from "react-router-dom";

import * as ArrayUtils from "./../../util/array.js";

class CourseGrid extends React.Component{

	constructor(props){
		super(props);

		this.state = {"list": props.list, "size": props.size};
	}

	componentDidUpdate(prevProps){

		let obj = {};
		let updated = false;

		if(this.props.size !== prevProps.size){
			obj.size = this.props.size;
			updated = true;
		}

		if(!ArrayUtils.arraysEqual(this.props.list, prevProps.list)){
			obj.list = this.props.list;
			updated = true;
		}
		
		if(updated){
			this.setState(obj);
		}

	}

	render(){

		let rows = ArrayUtils.createRows(this.state.list, this.state.size);

		let courseMap = 
			rows.map((courses, index) => 
				<Grid key={index + (courses.length === 0 ? "" : courses[0]._id)} item container sizing={3}>
					{courses.map((course) =>

						<Grid item key={course._id} sizing={3} xs={12} sm={3}>
							<Link to={ "/course/" + course._id } className="link" style={{textAlign: "center"}}>
								<img 
									alt={course.name}
									src={course.img !== "" ? "http://localhost:5000/static/" + course.img : ""} 
									style={{"maxWidth": "100%"}}/>
								<br/>
								<h4>{course.name}</h4>
							</Link>
						</Grid>

					)}
				</Grid>
			);

		return <Grid container>{courseMap}</Grid>;
	}

}

export default CourseGrid;