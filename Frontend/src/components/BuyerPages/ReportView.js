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

const enNameToLanguageCodeMap = new Map([
    ["English", "en"],
    ["Arabic", "ar"],
    ["Spanish", "es"],
    ["French", "fr"],
    ["German", "de"],
    ["Chinese", "zh"],
    ["Italian", "it"],
    ["Japanese", "ja"],
    ["Dutch", "nl"],
    ["Polish", "pl"],
    ["Portuguese", "pt"],
    ["Russian", "ru"],

]);

const enNameToLocalNameMap = [
    {"enName": "English", "localName": "English"},
    {"enName": "Arabic", "localName": "ٱلْعَرَبِيَّة‎"},
    {"enName": "Spanish", "localName": "Español"},
    {"enName": "French", "localName": "Le français‎"},
    {"enName": "German", "localName": "Deutsch"},
    {"enName": "Chinese", "localName": "官话"},
    {"enName": "Italian", "localName": "Italiano"},
    {"enName": "Japanese", "localName": "日本語"},
    {"enName": "Dutch", "localName": "Nederlands"},
    {"enName": "Polish", "localName": "Polski"},
    {"enName": "Portuguese", "localName": "Português"},
    {"enName": "Russian", "localName": "русский язык"},

];


class ReportView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            numPages: null,
            pageNumber: 2,
            langCode: "en"

        };

        this.setLanguage = this.setLanguage.bind(this);
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

                    {/*{<Card.Img variant="top" src={require("../../images/restaurant-logo.png")}/>}*/}
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

    getData() {
        const payload = {};
        payload.langCode = this.state.langCode;

        axios.post(`http://${HOSTNAME}:3001/orders/pdf/read`, payload)
            .then((response) => {
                console.log("_handleImageChange response")
                console.log(response)
                console.log(response.data)
                this.setState({data: response.data.entities});
            })
    }

    componentDidMount() {
        this.getData();
    }

    setLanguage = (enLanguageName) => {
        return e => {
            e.preventDefault();

            const langCode = enNameToLanguageCodeMap.get(enLanguageName);
            console.log("langCode")
            console.log(langCode)

            this.setState({langCode: langCode}, () => {
                this.getData();
            })
        }
    };

    getLanguageOptions() {
        const renderTodos = enNameToLocalNameMap.map((pair, index) => {
        //const renderTodos = enNameToLocalNameMap.forEach(function(value, key){
            console.log("pair")
            console.log(pair)

            return <li key={1} style={styles.languageButton}>
                <Button onClick={this.setLanguage(pair.enName)} type="submit" variant="primary">{pair.localName}</Button>
            </li>;
        });

        console.log("renderTodos")
        console.log(renderTodos)

        return <div >
            <ul className="ul li" style={styles.languageContainer}>{renderTodos}</ul>
        </div>
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

                {this.getLanguageOptions()}
            </div>
        );
    }
}

const styles = {
    languageContainer: {
        display: "flex",
        flexDirection: "row",
    },
    languageButton: {
        paddingRight: "5rem",
    },

};

export default connect(mapStateToProps, mapDispatchToProps)(ReportView);