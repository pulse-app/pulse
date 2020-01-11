import React, { Component } from "react";
import SideMenu from "./SideMenu";
import MainMenu from "./MainMenu";
import SearchBox from "./SearchBox";
import { Reports } from "../reports/Reports";
import { Report } from "../report/Report";
import { weeks, Simulations } from "../../data/data";
import Submit from "../submitRating/Submit";

export class Dashboard extends Component {
  state = {
    isReportsComponentActive: false,
    week: 0
  };

  constructor() {
    super();
    this.userData = {};
  }

  state = {
    isReportsComponentActive: false,
    isReportComponentActive: false,
    isSubmitComponentActive: false,
    week: 0
  };

  viewEngineer = item => {
    this.userData = item;
    this.setState({ isSubmitComponentActive: true });
  };

  openReportModal = index => {
    if (this.props.user.type === "Software Engineer") {
      if (weeks[index].completed) {
        this.setState({ week: index });
        this.setState({ isReportComponentActive: true });
      }
    } else {
      if (weeks.length > index) {
        this.setState({ week: index });
        this.setState({ isReportsComponentActive: true });
      }
    }
  };
  closeModel = () => {
    this.setState({ isReportsComponentActive: false });
  };
  closeModelR = () => {
    this.setState({ isReportComponentActive: false });
    this.setState({ isSubmitComponentActive: false });
  };
  getAverage = userID => {
    let av = 0;
    weeks
      .filter(week => week.completed)
      .forEach(item => {
        const userReport = item.reports.find(
          report => report.userId === userID
        );
        av +=
          (userReport.reviews.quality.rating +
            userReport.reviews.quantity.rating +
            userReport.reviews.initiative.rating +
            userReport.reviews.communication.rating +
            userReport.reviews.professionalism.rating +
            userReport.reviews.integration.rating) /
          6;
      });

    return av / weeks.length;
  };

  //this function helps to get simulation card on dashboard
  simulationCard(average, allWeeklyAverages) {
    if (this.props.user.type === "Software Engineer") {
      return (
        <MainMenu
          title={"Simulation "}
          average={average}
          each={allWeeklyAverages}
          onClick={this.openReportModal}
          user={this.props.user}
        />
      );
    } else {
      let count = 0;
      return Simulations.map((simulation, index) => {
        if (simulation.LFID === this.props.user.userId) {
          count += 1;
          return (
            <MainMenu
              key={simulation.id}
              title={"Simulation " + simulation.number}
              average={average}
              onClick={this.openReportModal}
              user={this.props.user}
            />
          );
        } else {
          return Simulations.length - 1 === index && count === 0 ? (
            <div className="main-menu__no-cohort-message">
              Ooooops ! <br /> There is no cohort
            </div>
          ) : (
            ""
          );
        }
      });
    }
  }
  getEachAverage = id => {
    let qualityAverage = 0,
      quantityAverage = 0,
      initiativeAverage = 0,
      professionalismAverage = 0,
      communicationAverage = 0,
      integrationAverage = 0;
    let allAverages;
    weeks
      .filter(week => week.completed)
      .forEach(user => {
        const isUserRates = user.reports.find(user => user.userId === id);
        if (isUserRates) {
          qualityAverage += isUserRates.reviews.quality.rating;
          quantityAverage += isUserRates.reviews.quantity.rating;
          initiativeAverage += isUserRates.reviews.initiative.rating;
          professionalismAverage += isUserRates.reviews.professionalism.rating;
          communicationAverage += isUserRates.reviews.communication.rating;
          integrationAverage += isUserRates.reviews.integration.rating;
        }
        return false;
      });
    allAverages = [
      (qualityAverage / weeks.length).toFixed(1),
      (quantityAverage / weeks.length).toFixed(1),
      (initiativeAverage / weeks.length).toFixed(1),
      (professionalismAverage / weeks.length).toFixed(1),
      (communicationAverage / weeks.length).toFixed(1),
      (integrationAverage / weeks.length).toFixed(1)
    ];
    return allAverages;
  };

  render() {
    let average = 0;
    let allWeeklyAverages = {};
    if (this.props.user.userId) {
      allWeeklyAverages = this.getEachAverage(this.props.user.userId);
      average = this.getAverage(this.props.user.userId);
      console.log(average);
    }
    // }

    if (
      this.props.user.userId &&
      this.props.user.type === "Software Engineer"
    ) {
      this.userData = weeks[this.state.week].reports.find(
        week => week.userId === this.props.user.userId
      );
    }
    return (
      <div className="menus">
        <SideMenu user={this.props.user} onClick={this.props.onClick} />
        <div className="simmulation__card">
          <div className="searchbox__wraper">
            <SearchBox user={this.props.user} />{" "}
          </div>{" "}
          {this.simulationCard(average.toFixed(1), allWeeklyAverages)}
        </div>
        <div
          style={{
            display: this.state.isReportsComponentActive ? "block" : "none"
          }}
        >
          <Reports
            viewEngineer={this.viewEngineer}
            closeModel={this.closeModel}
            data={weeks[this.state.week]}
          />
        </div>
        <div
          className={
            this.props.user.type === "Software Engineer"
              ? "hide-main-menu__floating-button"
              : "main-menu__floating-button"
          }
        >
          +
        </div>
        <div
          style={{
            display: this.state.isReportComponentActive ? "block" : "none"
          }}
        >
          <Report closeModel={this.closeModelR} data={this.userData} />
        </div>
        <div
          style={{
            display: this.state.isSubmitComponentActive ? "block" : "none"
          }}
        >
          <Submit closeModel={this.closeModelR} data={this.userData} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
