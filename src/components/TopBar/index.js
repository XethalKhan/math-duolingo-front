import React from 'react';

import './style.css';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    }
}));

export default function TopBar(props){

	const classes = useStyles();

	return <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.open ? props.handleDrawerClose : props.handleDrawerOpen}
                    edge="start"
                >
                    {props.open ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
                <Typography variant="h6" noWrap>
                    Hypatia
                </Typography>
            </Toolbar>
        </AppBar>;

}