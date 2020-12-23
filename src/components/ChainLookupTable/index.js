import React from 'react';

import "./style.css";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';

import ChainServices from "./../../services/chain";

class ChainLookupTable extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			page: 1, 
			total: null, 
			rows: []
		};

		this.search = this.search.bind(this);
	}

	componentDidMount(){
		this.search();
	}

	componentDidUpdate(prevProps) {

		let updated = false;

		if (this.props.name !== prevProps.name) {
			updated = true;
		}

		if (this.props.description !== prevProps.description) {
			updated = true;
		}

		if(updated){
			this.search();
		}
	}

	async search(page = 1){

		let name = this.props.name;
		let description = this.props.description;

		let http = await ChainServices.filter(name, description, page);

		this.setState({
			page: page, 
			total: http.data.pagination.total, 
			rows: http.data.records
		});

	}

	render(){

		let pagination_start;
		let total_pages = Math.ceil(this.state.total / 10);

		if(this.state.total === null || this.state.page <= 3){
			pagination_start = 1;
		}else if(total_pages - 2 >= this.state.page){
			pagination_start = this.state.page - 2;
		}else{
			pagination_start = total_pages - 4;
		}

		let pages = [];
		let end = (total_pages < 5 ? total_pages : 5);
		for(let i = 0; i < end; i++){
			pages.push(pagination_start + i);
		}

		let pages_buttons = pages.map((pageNumber) => 
			<IconButton 
				color="primary" 
				style={{"margin": "10px"}}
				disabled={this.state.page === pageNumber}
				onClick={this.search.bind(this, pageNumber)}>
				{pageNumber}
			</IconButton>
		);

		return <React.Fragment>
			<TableContainer>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.rows.map((chain) => (
							<TableRow key={chain.id}>
								<TableCell>{chain.name}</TableCell>
								<TableCell>{chain.description}</TableCell>
								<TableCell>{this.props.rowAction(chain)}</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell 
								colSpan={3} 
								style={{textAlign: "center", justifyContent: "center"}}>
							{pages_buttons}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</React.Fragment>;
	}

}

export default ChainLookupTable;