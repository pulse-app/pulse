import React, { Component } from "react";
import "./Submit.css";

export class Submit extends Component {
  // state = {
  //     selectedIndex: 0,
  //     ratingValue: 0,
  //     review: 'satisfied'
  // }

  state = {
    selectedItem: "quality",
    rating: {
      quality: {
        name: "quality",
        value: 0,
        reviewMessage: ""
      },
      quantity: {
        name: "quantity",
        value: 0,
        reviewMessage: ""
      },
      initiative: {
        name: "initiative",
        value: 0,
        reviewMessage: ""
      },
      communication: {
        name: "communication",
        value: 0,
        reviewMessage: ""
      },
      professionalism: {
        name: "professionalism",
        value: 0,
        reviewMessage: ""
      },
      integration: {
        name: "integration",
        value: 0,
        reviewMessage: ""
      }
    }
  };

  changeRating = e => {
    const value = e.target.value;
    if (e.target.name === "quality" && value <= 2 && value >= -2) {
      this.setState(prevState => ({
        rating: {
          ...prevState.rating,
          quality: { value: value, reviewMessage: prevState.reviewMessage }
        }
      }));
    } else if (e.target.name === "quantity" && value <= 2 && value >= -2) {
      this.setState(prevState => ({
        rating: {
          ...prevState.rating,
          quantity: { value: value, reviewMessage: prevState.reviewMessage }
        }
      }));
    } else if (e.target.name === "initiative" && value <= 2 && value >= -2) {
      this.setState(prevState => ({
        rating: {
          ...prevState.rating,
          initiative: { value: value, reviewMessage: prevState.reviewMessage }
        }
      }));
    } else if (e.target.name === "communication" && value <= 2 && value >= -2) {
      this.setState(prevState => ({
        rating: {
          ...prevState.rating,
          communication: {
            value: value,
            reviewMessage: prevState.reviewMessage
          }
        }
      }));
    } else if (
      e.target.name === "professionalism" &&
      value <= 2 &&
      value >= -2
    ) {
      this.setState(prevState => ({
        rating: {
          ...prevState.rating,
          professionalism: {
            value: value,
            reviewMessage: prevState.reviewMessage
          }
        }
      }));
    } else if (e.target.name === "integration" && value <= 2 && value >= -2) {
      this.setState(prevState => ({
        rating: {
          ...prevState.rating,
          integration: { value: value, reviewMessage: prevState.reviewMessage }
        }
      }));
    }
  };

  // handleChange = (event) => {
  //     this.setState({ratingValue: event.target.value});

  //   }

  changeState(index) {
    this.setState({ selectedIndex: index });
  }

  render() {
    let data = [];
    // this.props.data.reviews = this.state.review;
    if (this.props.data.reviews) {
      data = [
        this.props.data.reviews.quality,
        this.props.data.reviews.quantity,
        this.props.data.reviews.initiative,
        this.props.data.reviews.communication,
        this.props.data.reviews.professionalism,
        this.props.data.reviews.integration
      ];
    }
    return (
      <div className="model-container">
        <div className="close-model" onClick={this.props.closeModel}>
          X
        </div>
        <div className="report-model">
          <div className="report-row pd-16">
            <div className="report-header">Attributes</div>
          </div>
          <div className="report-row">
            <div className="report-table">
              {data.map((item, index) => {
                // (review) => {
                //   review = this.state.rating;
                //   if ((review = -2)) {
                //     return (review = "very poor");
                //   } else if ((review = -1)) {
                //     return (review = "poor");
                //   } else if ((review= 0)) {
                //     return (review = "satisfied");
                //   } else if ((review = 1)) {
                //     return (review = "very satisfied");
                //   } else review = 2;
                //   return (review= "perfect");
                // };
                return (
                  <div
                    className="report-table-row pd-l-16 row-items"
                    key={index}
                  >
                    <div className="report-table-col row-item">{item.name}</div>
                    <div className="report-table-col row-item">
                      <input
                        className="item-border"
                        name={item.name}
                        onChange={this.changeRating}
                        value={this.state.rating[item.name]}
                        type="number"
                        min="-2"
                        max="2"
                      />
                    </div>
                    <div
                      className="report-table-col row-item cl-brue align-r"
                      onChange={this.changeRating}
                    >
                      {item.review}
                    </div>
                  </div>
                );
              })}

              <textarea
                onChange={this.changereviewMessage}
                className="report-table-review"
              />
              <div><button className="submitBtn">Save</button></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Submit;
