import React, { Component } from 'react';

export default class Task extends Component {

	constructor(props) {
		super(props);

		this.priority = {
			'High Priority': 'high',
			'Medium Priority': 'normal',
			'Low Priority': 'low'
		};

		this.state = {
			checked: false
		};

		this.check = this.check.bind(this);
	}

	check() {
		const { checked } = this.state;

		this.setState({
			checked: !checked
		});
	}

	render() {
		const { task } = this.props;
		const { checked } = this.state;

		const priorityStr = task.get('priority');
		const priority = this.priority[priorityStr];

		return (
			<li className="task" onClick={this.check}>
				<span className={`checkbox ${checked ? 'checked' : ''}`}>{task.get('task')}</span>
				<span className={`priority ${priority}`}>{priorityStr}</span>
			</li>
		);
	}
}
