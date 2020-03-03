import React from 'react';
import { connect } from 'react-redux';
import { setSelectedUserId } from '../ducks/reducer';
import './Toolbar.css';


const UserSelector = ({ selectedUser, users, setSelectedUserId }) =>
(
    <div className="user-selector-container">
        <label className='user-label'>USER :</label>
        <select 
            onChange={(event) => setSelectedUserId(event.target.value)}
            value={selectedUser}
            className='user-selector'
        >
            {users && users.map(user => <option value={user.userId}>{user.name}</option>)}
        </select>
    </div>
);


const mapStateToProps = (state) => {
    const jsState = state.toJS();
    const {
        selectedUser,
        users,
    } = jsState;
    return {
        selectedUser,
        users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedUserId: value => dispatch(setSelectedUserId(value))
    }
}

const UserSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(UserSelector);

export default UserSelectorContainer;
