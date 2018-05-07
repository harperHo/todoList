import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
	render() {
		return (
			<div className="header">
        <NavLink exact to="/" className="link" activeClassName="active">TODO LIST</NavLink>
        <NavLink exact to="/new_task" className="link" activeClassName="active">NEW TASK</NavLink>
			</div>
		);
	}
}
