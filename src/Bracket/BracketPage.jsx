
import React from 'react';
import Bracket from './Bracket.jsx';
import MetaDataTable from './MetaDataTable.jsx';
import '../App.css';
import { Component } from 'react';
import { setSelectedTeamLine } from '../ducks/reducer';
import { connect } from 'react-redux';

class BracketPage extends Component {

    componentWillUnmount() {
        this.props.resetSelectedGameId();
    }

    render() {
        return (
            <div>
                <div className="bracket-container">
                    <Bracket/>
                </div>
                <MetaDataTable />
            </div>
        )
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        resetSelectedGameId: () => dispatch(setSelectedTeamLine()),
    }
};

const disconnected = connect(null, mapDispatchToProps)(BracketPage)

export default disconnected;