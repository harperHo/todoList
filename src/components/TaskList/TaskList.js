import React, { Component } from 'react';

import { Task } from '../../components';

export default class TaskList extends Component {

	renderTask() {
		const { tasks } = this.props;

		return tasks.map((task, key) => {
			return <Task key={key} task={task} />
		});
	}

	render() {
		return (
			<ul className="task-list">
				{this.renderTask()}
			</ul>
		);
	}
}
