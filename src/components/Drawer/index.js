import React from 'react';

import './style.css';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import LinearScaleIcon from '@material-ui/icons/LinearScale';

import {Link} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    }
}));

export default function DrawerLeft(props){

	const classes = useStyles();

	return <React.Fragment>
		<Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    <Link to="/" className="link">
                        <ListItem button>
                            <ListItemIcon><HomeIcon/></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to="/course" className="link">
                        <ListItem button>
                            <ListItemIcon><AppsIcon/></ListItemIcon>
                            <ListItemText primary="Courses" />
                        </ListItem>
                    </Link>
                    <Link to="/chain" className="link">
                        <ListItem button>
                            <ListItemIcon><LinearScaleIcon/></ListItemIcon>
                            <ListItemText primary="Chains" />
                        </ListItem>
                    </Link>
                    <Link to="/term" className="link">
                        <ListItem button>
                            <ListItemIcon><ListIcon/></ListItemIcon>
                            <ListItemText primary="Terms" />
                        </ListItem>
                    </Link>
                </List>
            </div>
        </Drawer>
        </React.Fragment>;
}