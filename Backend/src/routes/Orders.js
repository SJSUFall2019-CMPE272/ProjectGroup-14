const express = require('express');
const router = express.Router();
const msg = require('../../index.js');
const pool = require("../DbConnection");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
var kafka = require('./kafka/client');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //     cb(null, '/home/ec2-user/lab1/cmpe273-lab1/newFrontend/src/uploads')
        cb(null, '/Users/sakshi/cmpe273-groupproject/project/MediReport/Frontend/src/pdfs')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

require('../models/Section');
require('../models/MenuItem');
require('../models/Owner');
require('../models/Order');


//routes - src - backend - lab1
const imageStorePath = path.join(__dirname, '..', '..', '..', 'Frontend', 'src', 'images', 'grubhub');

router.get('/', function (req, res) {
    pool.query("SELECT * FROM grubhub_order where owner_id='0987'", (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('Result: ' + JSON.stringify(result));
            res.send(result)
        }
    });
});

const Order = mongoose.model('grubhub_order');
const Section = mongoose.model('menu_section');
const MenuItem = mongoose.model('menu_item');
const Owner = mongoose.model('Owner');

const queryMap = new Map();
queryMap.set("UPDATE_ORDER_STATUS", 'UPDATE grubhub_order SET status=? where grubhub_order_id=?');
queryMap.set("GET_MENU_ITEMS_BY_OWNER", 'SELECT * FROM menu_item where owner_id=?');
queryMap.set("GET_GRUBHUB_ORDERS_BY_OWNER", 'SELECT * FROM grubhub_order where owner_id=?');
queryMap.set("GET_GRUBHUB_ORDERS_BY_BUYER", 'SELECT * FROM grubhub_order where buyer_id=?');
queryMap.set("ADD_SECTION", "INSERT INTO menu_section values (?, ?, ?)");
queryMap.set("GET_SECTION", 'SELECT name from menu_section where owner_id=?');
queryMap.set("DELETE_SECTION", 'DELETE from menu_section where name=? and owner_id=?');
queryMap.set("ADD_MENU_ITEM", 'INSERT INTO  menu_item values (?, ?, ?, ?, ?, ?, ?)');
queryMap.set("DELETE_MENU_ITEM", 'DELETE from  menu_item where menu_item_id=?');
queryMap.set("UPDATE_MENU_ITEM", 'UPDATE menu_item set where menu_item_id=?');
queryMap.set("GET_RESTAURANTS", 'SELECT * from owner where id in (SELECT DISTINCT owner_id FROM menu_item WHERE UPPER(name) LIKE UPPER(?))');
queryMap.set("INSERT_IN_GRUBHUB_ORDER", 'INSERT INTO grubhub_order values (?, ?, ?, ?, ?, ?, ?)');
//queryMap.set("INSERT_IN_MENU_ITEM", 'INSERT INTO menu_item VALUES (?, ?, ?, ?, ?, ?, ?)');

const PDFParser = require("pdf2json");
const axios = require('axios');

router.post('/pdf/read', function (req, res) {
    console.log("pdf/read");
    console.log("req");
    console.log(req.body);
    let pdfParser = new PDFParser(this,1);
  
    getReportName(req.owner_id);
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        console.log(pdfParser.getRawTextContent());

        const payload = {}
        payload.data = pdfParser.getRawTextContent();
        payload.langCode = req.body.langCode;

        console.log("pdfParser.getRawTextContent()")
        console.log(pdfParser.getRawTextContent())

        axios.post(`http://localhost:8080/getData`, payload)
            .then((response) => {
                console.log("response from Python")
                console.log(response.data)

                res.send(response.data);
            })
    });

    pdfParser.loadPDF(imageStorePath+req.body.name);
    //pdfParser.loadPDF("/Users/sakshi/cmpe273-groupproject/project/MediReport/Backend/src/"+fileName);
});

router.post('/pdf/view', function (req, res) {
       res.send(getReportName(req.owner_id));
});

function getReportName(data){
      let fileName="";
    MenuItem.findOne({owner_id:data})
    .then((files)=>{
        console.log("files nsknskwkw",files);
        fileName:files[0];
    }).catch(() => {
        console.log("Error in retreving file");
    });
    return fileName;
}


const upload = multer({storage: storage}).single('file');

router.post('/menu_item/add', function (req, res) {
    upload(req, res, function (err) {
        console.log("Inside saveMenuItemImage");
        console.log(req.body);
        console.log("req.body.image");
        console.log(req.body.image);
        console.log("File");
        console.log(req.file);

        const menuItem = MenuItem(req.body);

        return menuItem.save()
            .then(() => {
                res.send("Saved menu_item")
            })
            .catch(() => res.send("Error in saving menu_item"));
    })
});

module.exports = router;