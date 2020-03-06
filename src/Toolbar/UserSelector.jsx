import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setSelectedUserId } from '../ducks/reducer';
import { withRouter } from "react-router-dom";
import * as QueryString from "query-string"

import './Toolbar.css';


const UserSelector = ({ selectedUserId, users, setSelectedUserId, history, location }) =>
(
    <div className="user-selector-container">
        <label className='user-label'>USER :</label>
        <select 
            onChange={(event) => {
                const newUserId = event.target.value;
                let search = QueryString.parse(location.search);
                search.userId = newUserId;
                history.replace({
                    search: QueryString.stringify(search),
                });
                setSelectedUserId(newUserId)
            } }
            value={selectedUserId}
            className='user-selector'
        >
            {users && Object.values(users).map(user => {
                return (
                    <option value={user.userId}>{user.name}</option>)}
                )
            } 
        </select>
    </div>
);


const mapStateToProps = (state) => {
    const jsState = state.toJS();
    const {
        selectedUserId,
        users,
    } = jsState;
    console.log('mapStateToProps', selectedUserId, users);
    return {
        selectedUserId,
        users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedUserId: value => dispatch(setSelectedUserId(value))
    }
}

const UserSelectorContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(UserSelector);

export default UserSelectorContainer;
