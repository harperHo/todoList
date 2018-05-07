import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

import { addTask } from '../../redux/actionCreators/task';
import { NewTaskForm } from '../../components';
import { Dialog } from '../../portals';

@connect(
	state => ({
		add: state.task.get('add'),
		addSuc: state.task.get('addSuc'),
		addErr: state.task.get('addErr')
	}),
	{
    addTask,
	}
)
export default class Home extends Component {

	constructor(props) {
		super(props);

    this.data = {};
    this.dialog = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentDidUpdate(prevProps) {
    const { addSuc, addErr } = this.props;
    const { addSuc: prevAddSuc, addErr: prevAddErr } = prevProps;

    if (!prevAddSuc && addSuc) {
      const options = {
        message: 'A task has been added successfully.',
        confirmBtnText: 'Ok'
      };

      this.data = {};
      this.dialog.current.showDialog(options);
    }

    if (!prevAddErr && addErr) {
      const options = {
        message: 'Failed to add new task. Please try again.',
        confirmBtnText: 'Retry',
        confirmCallback: this.handleSubmit,
        cancelBtnText: 'Cancel'
      };

      this.dialog.current.showDialog(options);
    }
  }

  handleSubmit(data) {
    if (data) this.data = data;

    return this.props.addTask(this.data);
  }

	render() {
		return (
			<div className="new-task">
				<div className="form-container">
					<NewTaskForm handleSubmit={this.handleSubmit}/>
          <Dialog ref={this.dialog} />
				</div>
			</div>
		);
	}
}
