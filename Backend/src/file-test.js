
let fs = require('fs'), PDFParser = require("pdf2json");

let pdfParser = new PDFParser(this,1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log(pdfParser.getRawTextContent());
});

pdfParser.loadPDF("/Users/vijendra4/GoogleDrive/sjsu/272/MediReport/Backend/src/full-report.pdf");