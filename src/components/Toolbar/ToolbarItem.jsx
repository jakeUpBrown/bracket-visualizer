import React from 'react';
import './Toolbar.css';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const ToolbarItem =({
    name,
    link,
    location,
}) =>
 {
    const toDescriptor = {
        pathname: link,
        search: location.search,
    }
    const toolbarItemSelected = location.pathname === link;
    return (
        <div className={`toolbar-link ${toolbarItemSelected ? 'selected-toolbar-item' : ''}`}>
            <Link to={toDescriptor} className="dropdown-link">
            <span>{name}</span>
            </Link>
        </div>
    );
}

export default withRouter(ToolbarItem);
