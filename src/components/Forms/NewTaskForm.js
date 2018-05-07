import React, { Component, createRef } from 'react';

import { CheckboxGroup } from '../../components';

export default class NewTaskForm extends Component {

  constructor(props) {
    super(props);

    this.options = ['High Priority', 'Medium Priority', 'Low Priority'];
    this.checkboxGroupRef = createRef(); // createRef API: https://reactjs.org/blog/2018/03/29/react-v-16-3.html

    this.state = {
      task: '',
      desErr: false,
      priorityErr: false
    };

    this.handleChange = this.handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      task: e.target.value
    });
  }

  _handleSubmit(e) {
    const { handleSubmit } = this.props;
    const { task } = this.state;

    let canSubmit = true;
    const checkedOptions = this.checkboxGroupRef.current.state.checkedOptions[0];

    this.setState({
      desErr: false,
      priorityErr: false
    });

    e.preventDefault(); // Prevent default submit behavior (redirect)

    if (task === '') {
      canSubmit = false;
      this.setState({
        desErr: true,
      });
    }

    if (!checkedOptions || (checkedOptions && checkedOptions.length === 0)) {
      canSubmit = false;
      this.setState({
        priorityErr: true,
      });
    }

    if (canSubmit) {
      const data = {
        task,
        priority: checkedOptions
      }

      return handleSubmit(data);
    }
  }

  render() {
    const { desErr, priorityErr } = this.state;

    return (
      <form className="form new-task-form" onSubmit={this._handleSubmit}>
        <label className="field">
          <span className="text">Description</span>
          <input className="input" type="text" onChange={this.handleChange} />
          {desErr && <span className="err">*This field is required</span>}
        </label>
        <label className="field">
          <span className="text">Priority</span>
          <CheckboxGroup ref={this.checkboxGroupRef} options={this.options} multipleChoice={false} />
          {priorityErr && <span className="err">*This field is required</span>}
        </label>
        <input className="submit" type="submit" value="Submit" />
      </form>
    );
  }
}
