import React, { Component } from 'react'

import './Reports.css';

export class Reports extends Component {
    render() {
        return (
            <div className="model-container">
                <div className="reports-model">
                    <div className="close-model-r" onClick={this.props.closeModel}>X</div>
                    <div className="reports-row pd-16">
                        <div className="reports-header">Reports</div>
                    </div>
                    <div className="reports-row pd-16">
                    <div className="reports-week">{this.props.data.week}</div>
                    </div>
                    <div className="reports-row">
                        <div className="reports-table">
                            <div className="reports-table-row pd-16">
                                <div className="reports-table-col hd-item">Names</div>
                                <div className="reports-table-col hd-item">Quality</div>
                                <div className="reports-table-col hd-item">Quantity</div>
                                <div className="reports-table-col hd-item">Initiative</div>
                                <div className="reports-table-col hd-item">Communication</div>
                                <div className="reports-table-col hd-item">Professionalism</div>
                                <div className="reports-table-col hd-item">Integration</div>
                                <div className="reports-table-col hd-item">Average</div>
                            </div>
                            {this.props.data.reports.map((item, index) => {
                                return (
                                    <div onClick={()=>{this.props.viewEngineer(item)}} key={index} className="reports-table-row row-items pd-16">
                                        <div className="reports-table-col row-item">{item.names}</div>
                                        <div className="reports-table-col row-item">{item.reviews.quality.rating}</div>
                                        <div className="reports-table-col row-item">{item.reviews.quantity.rating}</div>
                                        <div className="reports-table-col row-item">{item.reviews.initiative.rating}</div>
                                        <div className="reports-table-col row-item">{item.reviews.communication.rating}</div>
                                        <div className="reports-table-col row-item">{item.reviews.professionalism.rating}</div>
                                        <div className="reports-table-col row-item">{item.reviews.integration.rating}</div>
                                        <div className="reports-table-col row-item">{item.reviews.quality.rating !== "-" ? ((item.reviews.quality.rating + item.reviews.quantity.rating + item.reviews.initiative.rating + item.reviews.communication.rating + item.reviews.professionalism.rating + item.reviews.integration.rating) / 6).toFixed(1) : '-'}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reports
