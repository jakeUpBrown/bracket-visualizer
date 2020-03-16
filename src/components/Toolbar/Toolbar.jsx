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
    name: "STANDINGS",
    link: "/standings/current",
  },
  {
    name: "ROUND OUTLOOK",
    link: "/round-outlook",
  },
  {
    name: "BAD BEATS",
    link: "/bad-beats",
  },
  {
    name: "PICKS",
    link: "/picks",
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
