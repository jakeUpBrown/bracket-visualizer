import React, { Component } from 'react';
import BracketPage from './Bracket/BracketPage.jsx';
import { Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import IndividualStandings from './Standings/IndividualStandings';
import OverallStandings from './Standings/OverallStandings';
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
                    <Route exact path="/standings/overall" component={OverallStandings} />
                    <Route exact path="/standings/individual" component={IndividualStandings} />
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




