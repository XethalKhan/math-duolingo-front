import React from 'react';

import './style.css';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import CheckIcon from '@material-ui/icons/Check';

import ChainLookupTable from "./../ChainLookupTable";

class ModalChain extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			open: props.open,
			name: "", 
			description: ""
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.rowAction = this.rowAction.bind(this);
	}

	componentDidUpdate(prevProps){
		if(this.props.open !== prevProps.open){
			this.setState({open: this.props.open});
		}
	}

	handleModalClose(){
		this.props.onChange(false);
	}

	handleInputChange(event){
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	    	[name]: value
	    });
	}

	onSelect(chain){
		this.props.onSelect(chain);
	}

	rowAction(chain){
		return <React.Fragment>
			<IconButton onClick={(e) => this.props.onSelect(chain, e)}>
				<CheckIcon color="primary"/>
			</IconButton>
		</React.Fragment>;
	}

	render(){
		return <React.Fragment>
			<Modal
		        aria-labelledby="transition-modal-title"
		        aria-describedby="transition-modal-description"
		        className={"modal"}
		        open={this.state.open}
		        onClose={this.handleModalClose}
		        closeAfterTransition
		        BackdropComponent={Backdrop}
		        BackdropProps={{
		          timeout: 500,
		        }}
		        style={{alignItems: "center", justifyContent: "center", margin: "20px", "overflow": "scroll"}}
		      >
				<Fade in={this.props.open} style={{"backgroundColor": "white"}}>
					<Grid container>
						<Grid container item>
							<Grid item xs={12} sm={6} style={{"padding": "5px"}}>
								<TextField 
									fullWidth 
									label = "Name" 
									name = "name" 
									autoComplete = "off"
									value = {this.state.name} 
									onChange = {this.handleInputChange}/>
							</Grid>
							<Grid item xs={12} sm={6} style={{"padding": "5px"}}>
								<TextField 
									fullWidth 
									label = "Description" 
									name = "description" 
									autoComplete = "off"
									value = {this.state.description} 
									onChange = {this.handleInputChange}/>
							</Grid>
						</Grid>
						<Grid item  style={{"margin": "auto"}}>
							<ChainLookupTable
								name={this.state.name} 
								description={this.state.description}
								rowAction={this.rowAction}/>
						</Grid>
					</Grid>
				</Fade>
			</Modal>
		</React.Fragment>;
	}

}

export default ModalChain;