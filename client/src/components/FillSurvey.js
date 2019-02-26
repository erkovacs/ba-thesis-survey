import React, { Component } from "react";
import { Router, Link, Route, Redirect } from "react-router-dom";

class FillSurvey extends Component {
  REQUIRED_SCORES = 15;
  API_URL = "/api/attractions";
  API_POST = "/api/response";
  constructor() {
    super();
    const userName = window.localStorage.getItem("userName");
    this.currentRef = React.createRef();
    this.state = {
      position: [],
      userName: userName,
      attractions: [],
      displayAttractions: [],
      scores: [],
      scoreStates: [],
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
      <div className="row">
        <div className="col-md-12">
          {this.renderScoresMessage()}
          <h1 ref={this.currentRef} className="panel">
            Complete your survey{" "}
          </h1>
          <table className="table table-hover panel">
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
          <td className="rating-stars">{this.renderStars(attraction.nrCrt)}</td>
        </tr>
      );
    });
  };
  fetchItems = async () => {
    try {
      const res = await fetch(this.API_URL);
      const json = await res.json();
      if (json.success) {
        this.setState({
          ...this.state,
          attractions: json.attractions,
          displayAttractions: json.attractions
        });
      }
    } catch (e) {
      alert(`Error has occurred: ${e}`);
    }
  };
  handleClick = async e => {
    e.preventDefault();
    if (this.validateScores()) {
      const { latitude, longitude } = this.state.position;
      const data = {
        location: { latitude, longitude },
        userName: this.state.userName,
        scores: this.state.scores
      };
      try {
        const res = await fetch(this.API_POST, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json.success) {
          window.localStorage.removeItem("userName");
          this.setState({ shouldRedirect: true });
        } else {
          alert(`An error has occurred: ${json.error}`);
        }
      } catch (e) {
        alert(`An error has occurred: ${e}`);
      }
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
      navigator.geolocation.getCurrentPosition(position => {
        context.setState({ position: position.coords });
      });
    }
  };
  validateScores = () => {
    return this.state.scores.length >= 15;
  };
  handleRate = (id, rating) => {
    rating /= 5;
    const newScoreStates = this.state.scoreStates;
    newScoreStates[id] = rating;
    this.setState({
      scoreStates: newScoreStates
    });
    const score = {
      attractionId: id,
      rating
    };

    // Do not allow duplicates. Update the existing record if exists
    this.setState({
      scores: [
        ...this.state.scores.filter(_score => _score.attractionId !== id),
        score
      ]
    });
  };
  updateScore = (e, i) => {
    const rating = e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth;
    const innerStars = e.target.children[0] ? e.target.children[0] : e.target;
    const newScoreStates = this.state.scoreStates;
    newScoreStates[i] = Math.ceil(rating * 100);
    this.setState({
      scoreStates: newScoreStates
    });
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
      <div className="container-fluid toolbox">
        <div className="row">
          <div className="offset-md-9 col-md-3 col-sm-12">
            <div className="card">
              <div className="card-header">Touristic attractions</div>
              <div className="card-body">
                <p className="card-text">
                  Please provide your opinion on the touristic attractions in
                  the list. To find attractions that you have visited, you can
                  search the list from the header. Thank you for participating!
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
        </div>
      </div>
    );
  };
  renderStars = id => {
    // Pretty bad but werks well enough
    return [1, 2, 3, 4, 5].map(j => {
      const currentScore = this.state.scoreStates[id];
      let starClass = "fa-star-o";
      if (currentScore && currentScore * 5 >= j) {
        starClass = "fa-star golden";
      }
      return (
        <i
          className={`fa ${starClass}`}
          key={id + "." + j}
          onClick={e => this.handleRate(id, j)}
        />
      );
    });
  };
}

export default FillSurvey;
