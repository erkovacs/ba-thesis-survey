import React, { Component } from "react";
import { Router, Link, Route, Redirect } from "react-router-dom";

class FillSurvey extends Component {
  API_URL = "/api/attractions";
  constructor() {
    super();
    const userName = window.localStorage.getItem("userName");
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
          <div className="alert alert-dismissible alert-primary">
            <strong>Oh snap!</strong>
          </div>
          <h1>Complete your survey </h1>
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
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Your rating</th>
              </tr>
            </thead>
            <tbody>{this.renderItems()}</tbody>
          </table>
          <button onClick={e => this.handleClick(e)}>Submit</button>
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
            onClick={e => {
              // Rating logic here
              this.updateScore(e, i);
            }}
          >
            Stars
          </td>
        </tr>
      );
    });
  };
  fetchItems = async () => {
    const res = await fetch(this.API_URL);
    console.log(res);
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
    const property = name.replace("search", "").toLowerCase();
    if (value !== "") {
      this.setState({
        displayAttractions: this.state.attractions.filter(
          attraction =>
            attraction && new RegExp(value, "gi").test(attraction[property])
        )
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
    const rating = e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth;
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
}

export default FillSurvey;
