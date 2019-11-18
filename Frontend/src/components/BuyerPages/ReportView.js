import React, {Component} from "react";
import {Badge, Button, Card} from "react-bootstrap";
import "../../styles/Menu.css"
import {getOrdersByStatus, onDragEnd} from "../../js/actions/restaurantActions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {HOSTNAME} from "../Constants/Constants";
import { Document, Page } from 'react-pdf';
import sample from '../../pdfs/full-report.pdf'

import axios from 'axios';

axios.defaults.withCredentials = true;

function mapStateToProps(store) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

class ReportView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            numPages: null,
            pageNumber: 2,
        };
    }

    data = () => {
        return {"_id": "1", "customer_address": "Some address", "status": "New"}
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    getOrderStatusBadge = (status, term) => {
        let badge = null;

        switch (status) {
            case "New":
                badge = <Badge style={{fontSize: 14}} variant="primary">{term}</Badge>
                break;

            case "Preparing":
                badge = <Badge style={{fontSize: 14}} variant="info">{term}</Badge>
                break;

            case "Ready":
                badge = <Badge style={{fontSize: 14}} variant="dark">{term}</Badge>
                break;

            case "Delivered":
                badge = <Badge style={{fontSize: 14}} variant="success">{term}</Badge>
                break;

            case "Cancel":
                badge = <Badge style={{fontSize: 14}} variant="danger">{term}</Badge>
                break;
        }

        return badge;
    }

    populateSection = () => {
        console.log("populateSection");

        const renderTodos = this.state.data.map((order, index) => {
            // const items = JSON.parse(order.items);
            console.log("order")

            console.log(order)
            const jsonOrder = order

            return <li key={index}>
                <Card style={{width: '50rem'}}>
                    {/*<Card.Img variant="top" src={require("../../images/restaurant-logo.png")}/>*/}
                    <Card.Body>
                        <Card.Title>{this.getOrderStatusBadge("Ready", "Clinical term")}</Card.Title>
                        <Card.Text>
                            {this.getOrderStatusBadge("Preparing", "Term")} - <div style={{fontSize: 12}}>{jsonOrder.entityName}</div>
                            <br/>
                            {this.getOrderStatusBadge("Preparing", "Explanation")} - <div style={{fontSize: 12}}>{jsonOrder.comment}</div>

                        </Card.Text>
                        <Button onClick={() => this.goToChat(order)} type="button" variant="primary">Learn more</Button>
                    </Card.Body>
                </Card>
            </li>;
        });

        return <div>
            <ul className="ul li">{renderTodos}</ul>
        </div>;
    }

    componentDidMount() {
        const payload = {};

        axios.post(`http://${HOSTNAME}:3001/orders/pdf/read`, payload)
            .then((response) => {
                console.log("_handleImageChange response")
                console.log(response)
                console.log(response.data)
                this.setState({data: response.data.entities});
            })
    }

    render() {
        return (
            <div>
                <div className='rowC'>
                    <div>
                        <Document
                            file={sample}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                        >
                            <Page pageNumber={this.state.pageNumber} />
                        </Document>
                        <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
                    </div>
                    <div>
                        {this.populateSection()}
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        height: "100vh",
    },
    channelList: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
    },
    chat: {
        display: "flex",
        flex: 3,
        flexDirection: "column",
        borderWidth: "1px",
        borderColor: "#ccc",
        borderRightStyle: "solid",
        borderLeftStyle: "solid",
    },
    settings: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportView);