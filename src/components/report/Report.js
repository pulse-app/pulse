import React, { Component } from 'react'

import './Report.css';

export class Report extends Component {
    
    state = {
        selectedIndex: 0
    }

    changeState(index){
        this.setState({selectedIndex: index})
    }

    render() {
        let data = [];
        
        if (this.props.data.reviews) {
            data = [this.props.data.reviews.quality, this.props.data.reviews.quantity,this.props.data.reviews.initiative,this.props.data.reviews.communication,this.props.data.reviews.professionalism, this.props.data.reviews.integration];
        }
        return (
            <div className="model-container">
                <div className="close-model" onClick={this.props.closeModel}>X</div>
                <div className="report-model">
                    <div className="report-row pd-16">
                        <div className="report-header">Attributes</div>
                    </div>
                    <div className="report-row">
                        <div className="report-table">

                            {data.map((item, index) => {
                                return (
                                    <div className="report-table-row pd-l-16 row-items" key={index} onClick={()=> {this.changeState(index)}}>
                                        <div className="report-table-col row-item">{item.name}</div>
                                        <div className="report-table-col row-item">
                                            <div className="item-border">{item.rating}</div>
                                        </div>
                                        <div className="report-table-col row-item cl-brue align-r">{item.review}</div>
                                    </div>
                                );
                            })}

                            <div className="report-table-review">{data.length > 0 ? data[this.state.selectedIndex].reviewMessage : ''}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Report
