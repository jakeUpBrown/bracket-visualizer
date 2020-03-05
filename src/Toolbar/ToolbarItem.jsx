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
    return (
        <div className="toolbar-link">
            <Link to={toDescriptor} className="dropdown-link">
            <span>{name}</span>
            </Link>
        </div>
    );
}

export default withRouter(ToolbarItem);
