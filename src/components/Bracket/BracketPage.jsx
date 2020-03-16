
import React from 'react';
import Bracket from './Bracket';
import MetaDataTable from './MetaDataTable';
import '../../App.css';
import { Component } from 'react';
import { setSelectedGameIdFuncer } from '../../utilities/mappedActions';
import { connect } from 'react-redux';

class BracketPage extends Component {

    componentWillUnmount() {
        this.props.setSelectedGameId();
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
        setSelectedGameId: setSelectedGameIdFuncer(dispatch),
    }
};

const disconnected = connect(null, mapDispatchToProps)(BracketPage)

export default disconnected;