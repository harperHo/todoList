import React, { Component } from 'react';

export default class CheckboxGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checkedOptions: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { multipleChoice } = this.props;
    const option = e.currentTarget.getAttribute('data-option');

    if (multipleChoice) {
      const { checkedOptions } = this.state;
      const index = checkedOptions.indexOf(option);

      if (index !== -1) {
        checkedOptions.splice(index, 1);
      } else {
        checkedOptions.push(option);
      }

    } else {
      this.setState({
        checkedOptions: [option]
      });
    }
  }

  renderCheckbox() {
    const { options } = this.props;
    const { checkedOptions } = this.state;

    // 為什麼不要總是直接用 array 的 index 當 React Component 的 Key: https://goo.gl/kEq8y6
    return options.map((option, i) => {
      const checked = checkedOptions.includes(option);

      return <span key={i} className={`checkbox ${checked ? 'checked' : ''}`} data-option={option} onClick={this.handleClick}>{option}</span>
    });
  }

  render() {
    return (
      <div className="checkbox-group">
        {this.renderCheckbox()}
      </div>
    );
  }
}
