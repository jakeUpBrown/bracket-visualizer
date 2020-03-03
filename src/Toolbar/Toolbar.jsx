import React from 'react';
import './Toolbar.css';
import { withRouter } from "react-router-dom";
import UserSelector from './UserSelector';
import ToolbarItem from './ToolbarItem';

const toolbarItems = [
  {
    name: "BRACKET",
    link: "/",
  },
  {
    name: "OVERALL STANDINGS",
    link: "/standings/overall",
  },
  {
    name: "INDIVIDUAL STANDINGS",
    link: "/standings/individual",
  }
]
const Toolbar = () => (
    <div className="toolbar-container">
      <div className="links-section">
        {toolbarItems.map(item => <ToolbarItem name={item.name} link={item.link} />)}
        <UserSelector />
      </div>
    </div>
);

export default withRouter(Toolbar);
