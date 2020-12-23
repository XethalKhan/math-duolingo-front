import React from 'react';

import './style.css';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { Link } from "react-router-dom";

import MathContent from "./../MathContent";


class ChainItem extends React.Component{

	constructor(props){
		super(props);
		this.state = {term: props.term};
	}

	render(){

		let term = this.state.term;

		return (<React.Fragment>
			<Card key={term.id} style={{"marginBottom": "5px"}}>
				<CardContent>
					<h3>{term.name}</h3>
					<MathContent>{term.text}</MathContent>
					<MathContent>{term.comment}</MathContent>
				</CardContent>
				<CardActions>
		        	<Link to={"/term/" + term.id} className="link">
		        		<IconButton>
		        			<VisibilityIcon color="primary"/>
		        		</IconButton>
		        	</Link>
			    </CardActions>
			</Card>
		</React.Fragment>);

	}

}

export default ChainItem;