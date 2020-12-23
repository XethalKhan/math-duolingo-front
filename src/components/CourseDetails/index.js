import React from 'react';

import './style.css';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';

import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import CourseRowLayout from "./../CourseRowLayout";

import CourseServices from './../../services/course.js';

class CourseDetails extends React.Component{

	constructor(props){
		super(props);
		this.state = {course: {grid: []}};
	}

	async componentDidMount(){
		const id = this.props.match.params.id;

		let http = await CourseServices.getOne(id);

		this.setState({"course": http.data});

	}

	render(){

		const id = this.props.match.params.id;

		let courseMap =
			this.state.course.grid.map((row, index) =>
				<CourseRowLayout key={index + (row.items.length === 0 ? '' : row.items[0].id)} list={row.items}/>
			);

		return (
			<Grid container>
				<Grid item sizing={12} xs={12}>
					<IconButton aria-label="Edit">
						<Link to={"/edit/course/" + id} className="link">
			        		<EditIcon color="primary"/>
			        	</Link>
					</IconButton>
				</Grid>
				<Grid item sizing={12} xs={12}>
					<h2>{ this.state.course.name }</h2>
				</Grid>
				<Grid item sizing={12} xs={12}>
					<Typography>{ this.state.course.description }</Typography>
				</Grid>
				{courseMap}
			</Grid>);

	}

}

export default withRouter(CourseDetails);