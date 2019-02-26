import React from "react";

const ThankYou = props => {
  return (
    <div className="row">
      <div className="col-md-12 spacer" />
      <div className="col-md-8 offset-md-2">
        <div className="panel">
          <h1 className="display-3">Thank you!</h1>
          <p className="lead">
            Please accept my heartfelt thanks for filling out this survey.
            Hopefully together we can build something interesting! Check out the
            project on Github, it's not much yet but we're getting there ;)
          </p>
          <hr className="my-4" />
          <p className="lead">
            <a
              className="btn btn-primary"
              href="https://github.com/codepadawan93/ba-thesis-datasets"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
