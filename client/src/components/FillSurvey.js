import React, { Component } from "react";
import { Router, Link, Route, Redirect } from "react-router-dom";

class FillSurvey extends Component {
  REQUIRED_SCORES = 15;
  API_URL = "/api/attractions";
  constructor() {
    super();
    const userName = window.localStorage.getItem("userName");
    this.currentRef = React.createRef();
    this.state = {
      position: null,
      userName: userName,
      attractions: [],
      displayAttractions: [],
      scores: [],
      search: {
        searchNrCrt: "",
        searchName: "",
        searchDescription: ""
      },
      shouldRedirect: false
    };
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-12">
          {this.renderScoresMessage()}
          <h1 ref={this.currentRef}>Complete your survey </h1>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    className="form-control"
                    placeholder="Nr. Crt"
                    name="searchNrCrt"
                    onChange={e => this.handleChange(e)}
                    value={this.state.search.nrCrt}
                  />
                </th>
                <th>
                  <input
                    className="form-control"
                    placeholder="Name"
                    name="searchName"
                    onChange={e => this.handleChange(e)}
                    value={this.state.search.name}
                  />
                </th>
                <th>
                  <input
                    className="form-control"
                    placeholder="Description"
                    name="searchDescription"
                    onChange={e => this.handleChange(e)}
                    value={this.state.search.description}
                  />
                </th>
                <th />
              </tr>
            </thead>
            <thead>
              <tr>
                <th width="8%">#</th>
                <th width="20%">Name</th>
                <th width="60%">Description</th>
                <th width="12%">Your rating</th>
              </tr>
            </thead>
            <tbody>{this.renderItems()}</tbody>
          </table>
          {this.renderToolbox()}
          {this.state.shouldRedirect ? <Redirect to="/thank-you" /> : null}
        </div>
      </div>
    );
  }
  componentWillMount() {
    this.fetchItems();
    this.setLocation();
  }
  renderItems = () => {
    return this.state.displayAttractions.map((attraction, i) => {
      if (!attraction) {
        return;
      }
      return (
        <tr key={attraction.nrCrt}>
          <td>{attraction.nrCrt}</td>
          <td>
            {attraction.name.length >= 80
              ? attraction.name.substring(0, 80) + "..."
              : attraction.name}
          </td>
          <td>
            {attraction.description.length >= 180
              ? attraction.description.substring(0, 180) + "..."
              : attraction.description}
          </td>
          <td
            className="rating-stars"
            onClick={e => {
              // Rating logic here
              this.updateScore(e, i);
            }}
          >
            <div className="stars-outer">
              <div className="stars-inner" />
            </div>
          </td>
        </tr>
      );
    });
  };
  fetchItems = async () => {
    const res = await fetch(this.API_URL);
    const json = await res.json();
    if (json.success) {
      this.setState({
        ...this.state,
        attractions: json.attractions,
        displayAttractions: json.attractions
      });
    }
  };
  handleClick = e => {
    e.preventDefault();
    if (this.validateScores()) {
      const data = {
        location: this.state.position,
        userName: this.state.userName,
        scores: this.state.scores
      };
      console.log(data);
      window.localStorage.removeItem("userName");
      this.setState({ shouldRedirect: true });
    } else {
      alert("Please fill in at least 15 responses!");
    }
  };
  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ search: { ...this.state.search, [name]: value } });
    let property = name.replace("search", "").toLowerCase();
    if (name === "searchNrCrt") {
      property = "nrCrt";
    }
    if (value !== "") {
      this.setState({
        displayAttractions: this.state.attractions.filter(
          attraction =>
            attraction && new RegExp(value, "gi").test(attraction[property])
        )
      });
    } else {
      this.setState({
        displayAttractions: this.state.attractions
      });
    }
  };
  setLocation = () => {
    const context = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        context.setState({ position: position.coords })
      );
    }
  };
  validateScores = () => {
    return this.state.scores.length > 15;
  };
  updateScore = (e, i) => {
    // TODO::Bug here, takes offset width of wrong element
    const rating = e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth;
    const innerStars = e.target.children[0] ? e.target.children[0] : e.target;
    console.log(e.target);
    innerStars.style.width = rating * 100 + "%";
    const score = {
      attractionId: i,
      rating
    };

    // Do not allow duplicates. Update the existing record if exists
    this.setState({
      scores: [
        ...this.state.scores.filter(_score => _score.attractionId !== i),
        score
      ]
    });
  };
  scrollToTop = ref => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  renderScoresMessage = () => {
    const retval = (
      <div
        className={`scores-message alert alert-${
          this.REQUIRED_SCORES - this.state.scores.length <= 0
            ? "success"
            : "primary"
        }`}
      >
        {this.REQUIRED_SCORES - this.state.scores.length > 0 ? (
          <div>
            You still have to rate
            <strong>
              {" " + (this.REQUIRED_SCORES - this.state.scores.length)} out of
              {" " + this.REQUIRED_SCORES + " "}
            </strong>
            items.
          </div>
        ) : (
          <div>You can submit!</div>
        )}
      </div>
    );
    return retval;
  };
  renderToolbox = () => {
    return (
      <div className="col-md-3 toolbox">
        <div className="card">
          <div className="card-header">Touristic attractions</div>
          <div className="card-body">
            <p className="card-text">
              Please provide your opinion on the touristic attractions in the
              list. To find attractions that you have visited, you can search
              the list from the header. Thank you for participating!
            </p>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary"
              onClick={e => this.handleClick(e)}
            >
              Submit
            </button>
            &nbsp;
            <button
              className="btn btn-secondary float-right"
              onClick={() => this.scrollToTop(this.currentRef)}
            >
              Go to top
            </button>
          </div>
        </div>
      </div>
    );
  };
}

export default FillSurvey;
