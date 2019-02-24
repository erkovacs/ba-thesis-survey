import React, { Component } from "react";
import { Router, Link, Route } from "react-router-dom";
import { posix } from "path";

class FillSurvey extends Component {
  API_URL = "/api/attractions";
  constructor() {
    super();
    const userName = window.localStorage.getItem("userName");
    this.state = {
      position: null,
      userName: userName,
      attractions: [],
      scores: []
    };
  }
  render() {
    return (
      <div>
        <h1>Complete your survey </h1>
        <table>
          <thead>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Your rating</th>
          </thead>
          <tbody>{this.renderItems()}</tbody>
        </table>
        <button onClick={e => this.handleClick(e)}>Submit</button>
      </div>
    );
  }
  componentWillMount() {
    this.fetchItems();
    this.setLocation();
  }
  renderItems = () => {
    return this.state.attractions.map((attraction, i) => {
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
      this.setState({ attractions: json.attractions });
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
    } else {
      alert("Please fill in at least 15 responses!");
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
