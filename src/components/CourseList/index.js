import React from 'react';

import './style.css';

import CourseGrid from "./../CourseGrid";

import CourseServices from "./../../services/course";

class CourseList extends React.Component{

	constructor(props){
		super(props);
		this.state = {list: []};
	}

	async componentDidMount(){

		let http = await CourseServices.filter();

		this.setState({list: http.data});

	}

	render(){

		return (<div>
					<h1>Course list</h1>
					<CourseGrid list={this.state.list} size={4}/>
				</div>);
	}

}

export default CourseList;