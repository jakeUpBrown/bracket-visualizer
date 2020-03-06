import React, { Component } from 'react';
import BracketPage from './Bracket/BracketPage.jsx';
import { Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import PicksPage from './Standings/PicksPage';
import CurrentStandings from './Standings/CurrentStandings';
import { setSelectedUserId } from './ducks/reducer';
import * as QueryString from "query-string"

import './App.css';

class ContentArea extends Component {

    componentDidMount() {
        console.log('componentDidMount');
        console.log('tester', this.props);
        const queryParams = QueryString.parse(this.props.location.search);
        if (queryParams && queryParams.userId) {
            this.props.setSelectedUserId(queryParams.userId);
        }
    }

    render() {
        return (
            <Switch>
                <div className="content-area">
                    <Route exact path="/" component={BracketPage} />
                    <Route exact path="/standings/current" component={CurrentStandings} />
                    <Route exact path="/picks" component={PicksPage} />
                </div>
            </Switch>
          );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedUserId: value => dispatch(setSelectedUserId(value))
    }
}

const ContentAreaContainer = connect(null, mapDispatchToProps)(ContentArea);

export default ContentAreaContainer;




