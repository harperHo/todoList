import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTasks } from '../../redux/actionCreators/task';
import { Search, TaskList } from '../../components';

@connect(
	state => ({
		load: state.task.get('load'),
		loadSuc: state.task.get('loadSuc'),
		loadErr: state.task.get('loadErr'),
		tasks: state.task.get('tasks')
	}),
	// dispatch => ({
	// 	getTasks: () => dispatch(getTasks())
	// })
	{
		getTasks,
	}
)
export default class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			keyword: ''
		};

		this.setKeyword = this.setKeyword.bind(this);
	}

	componentDidMount() {
		this.props.getTasks();
	}

	setKeyword(keyword) {
		this.setState({
			keyword,
		});
	}

	render() {
		const { tasks } = this.props;
		const { keyword } = this.state;

		const _tasks = keyword === '' ? tasks : tasks.filter(task => {
			return task.get('task').toLowerCase().includes(keyword);
		})

		return (
			<div className="home">
				<div className="home-container">
					<Search setKeyword={this.setKeyword} />
					<TaskList tasks={_tasks} />
				</div>
			</div>
		);
	}
}
