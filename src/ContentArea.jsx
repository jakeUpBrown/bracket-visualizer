import React, { Component } from 'react';
import BracketPage from './components/Bracket/BracketPage';
import { Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import PicksPage from './components/Picks/PicksPage';
import CurrentStandings from './components/Standings/CurrentStandings';
import RoundOutlookPage from './components/RoundOutlook/RoundOutlookPage';
import BadBeatsPage from './components/BadBeats/BadBeatsPage';
import { setSelectedUserIdFuncer } from './utilities/mappedActions';
import * as QueryString from "query-string"

import './App.css';

class ContentArea extends Component {

    componentDidMount() {
        const queryParams = QueryString.parse(this.props.location.search);
        if (queryParams && queryParams.userId) {
            this.props.setSelectedUserId(queryParams.userId);
        }
    }

    render() {
        return (
            <Switch>
                <React.Fragment>
                    <div className="content-area">
                        <Route exact path="/" component={BracketPage} />
                        <Route exact path="/standings/current" component={CurrentStandings} />
                        <Route exact path="/round-outlook" component={RoundOutlookPage} />
                        <Route exact path="/bad-beats" component={BadBeatsPage} />
                        <Route exact path="/picks" component={PicksPage} />
                    </div>
                </React.Fragment>
            </Switch>
          );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedUserId: setSelectedUserIdFuncer(dispatch),
    }
}

const ContentAreaContainer = connect(null, mapDispatchToProps)(ContentArea);

export default ContentAreaContainer;




