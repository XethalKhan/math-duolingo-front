import React from 'react';

import './style.css';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';

import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import MathContent from "./../MathContent";

import TermServices from "./../../services/term";

class TermDetails extends React.Component{

	constructor(props){
		super(props);
		this.state = {"page": "loading", "term": null};
	}

	async componentDidMount(){

		try{
			const id = this.props.match.params.id;

			let http = await TermServices.getOne(id);

			if(http.status === 200){
				this.setState({"page": "success", "term": http.data});
			}
		}catch(e){
			if(e.response.status === 404){
				this.setState({"page": "not_found", "term": null});
			}else{
				this.setState({"page": "error", "term": null});
			}
		}

	}

	render(){

		let out;

		if(this.state.page === "loading"){
			out = <h1>Loading</h1>;
		}else if(this.state.page === "success"){

			const id = this.props.match.params.id;
			const term = this.state.term;

			out = <React.Fragment>
				<Grid container>
					<Grid item sizing={12} xs={12}>
						<IconButton aria-label="Edit">
							<Link to={"/edit/term/" + id} className="link">
				        		<EditIcon color="primary"/>
				        	</Link>
						</IconButton>
					</Grid>
					<Grid item sizing={12} xs={12}>
						<span style={{fontSize: 20}}>
							<b>{term.name}</b>
							&nbsp;-&nbsp;
							<i>{term.description}</i>
						</span>
					</Grid>
					<Grid item sizing={12} xs={12}>
						<b>Type:</b> {term.type}
					</Grid>
					<Grid item sizing={12} xs={12}>
						<h4>Text:</h4>
						<MathContent>{term.text}</MathContent>
					</Grid>
					<Grid item sizing={12} xs={12}>
						<h4>Comment:</h4>
						<MathContent>{term.comment}</MathContent>
					</Grid>
					<Grid item sizing={12} xs={12}>
						<h4>Reference:</h4>
						<MathContent>{term.reference}</MathContent>
					</Grid>
				</Grid>
			</React.Fragment>;
		}else if(this.state.page === "not_found"){
			out = <h1>Page not found</h1>;
		}else{
			out = <h1>Error loading page, come back later</h1>;
		}

		return out;

	}

}

export default withRouter(TermDetails);