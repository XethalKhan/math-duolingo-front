import React from 'react';

import './style.css';

import {Switch, Route} from "react-router-dom";

import Pages from "./pages.js";

export default function RouteList(props){

	return <React.Fragment>
		<Switch>
            {/*Routes for courses START*/}
            <Route path="/edit/course/:id">
                <Pages.CourseEdit />
            </Route>
            <Route path="/create/course">
                <Pages.CourseCreate />
            </Route>
            <Route path="/course/:id">
                <Pages.CourseDetails />
            </Route>
            <Route path="/course">
                <Pages.CourseList />
            </Route>
            {/*Routes for courses END*/}
            {/*Routes for chains START*/}
            <Route path="/edit/chain/:id">
                <Pages.ChainEdit />
            </Route>
            <Route path="/create/chain">
                <Pages.ChainCreate />
            </Route>
            <Route path="/chain/:id">
                <Pages.ChainDetails />
            </Route>
            <Route path="/chain">
                <Pages.ChainList />
            </Route>
            {/*Routes for chains END*/}
            {/*Routes for terms START*/}
            <Route path="/edit/term/:id">
                <Pages.TermEdit />
            </Route>
            <Route path="/create/term">
                <Pages.TermCreate />
            </Route>
            <Route path="/term/:id">
                <Pages.TermDetails />
            </Route>
            <Route path="/term">
                <Pages.TermList />
            </Route>
            {/*Routes for terms END*/}
            <Route path="/">
                <h1>/index (home) route</h1>
            </Route>
        </Switch>
    </React.Fragment>;

}