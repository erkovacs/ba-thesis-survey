import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class InputName extends Component {
  NAME_REGEX = /^[a-zA-Z0-9\-]+$/;
  storage = window.localStorage;
  constructor() {
    super();
    let shouldRedirectImmediately = false;
    const userName = this.storage.getItem("userName");
    if (userName) {
      shouldRedirectImmediately = true;
    }
    this.state = {
      userName: "",
      shouldRedirect: shouldRedirectImmediately
    };
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12 spacer" />
        <div className="col-md-4 offset-md-4">
          <form className="panel">
            <div className="form-group">
              <h1>Enter your name:</h1>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                placeholder="Enter name"
                value={this.state.userName}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={e => this.handleClick(e)}
            >
              Submit
            </button>
          </form>
          {this.state.shouldRedirect ? <Redirect to="/fill-survey" /> : null}
        </div>
      </div>
    );
  }
  handleClick = e => {
    e.preventDefault();
    if (this.validateName(this.state.userName)) {
      this.storage.setItem("userName", this.state.userName);
      this.setState({ shouldRedirect: true });
    } else {
      alert(
        "Invalid name provided, use only letters, numbers and '-'. Please try again."
      );
    }
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  validateName = name => this.NAME_REGEX.test(name);
}

export default InputName;
