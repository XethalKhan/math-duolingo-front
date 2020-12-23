import React from 'react';

import './style.css';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';

import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import ChainItem from "./../ChainItem";

const axios = require('axios');


class ChainDetails extends React.Component{

	constructor(props){
		super(props);
		this.state = {chain: []};
	}

	componentDidMount(){
		const id = this.props.match.params.id;

		const url = "http://localhost:5000/chain/" + id;

		axios.get(url)
		  .then((response) => {
		    // handle success
		    this.setState(response.data);
		  })

	}

	render(){

		let id = this.props.match.params.id;

		let chain = 
			this.state.chain.map((term) => 
				<ChainItem term={term}/>
			);

		return (
			<Grid container>
				<Grid item sizing={12} xs={12}>
					<IconButton aria-label="Edit">
						<Link to={"/edit/chain/" + id} className="link">
			        		<EditIcon color="primary"/>
			        	</Link>
					</IconButton>
				</Grid>
				<Grid item sizing={12} xs={12}>
					<h2>{ this.state.name }</h2>
				</Grid>
				<Grid item sizing={12} xs={12}>
					<p>{ this.state.description }</p>
				</Grid>
				<Grid item sizing={12} xs={12}>
					{chain}
				</Grid>
			</Grid>);

	}

}

export default withRouter(ChainDetails);