import React from 'react';
import './Toolbar.css';
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
        {toolbarItems.map((item, index) => <ToolbarItem key={`user-${index}`} name={item.name} link={item.link} />)}
        <UserSelector />
      </div>
    </div>
);

export default Toolbar;
