const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const {Client} = require('virtuoso-sparql-client');

var query = [
    "SELECT distinct(?chem) ?comment ",
    "where {",
    "?chem <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://dbpedia.org/ontology/ChemicalCompound> .",
    "?chem <http://www.w3.org/2000/01/rdf-schema#label> ?label .",
    "?chem <http://www.w3.org/2000/01/rdf-schema#comment> ?comment .",
    "FILTER regex(?label, \"^cholesterol$\", \"i\")",
    "FILTER (langMatches(lang(?comment),\"en\"))",
    "}"
].join(" ");


const Http = new XMLHttpRequest();
const queryUrl = 'https://dbpedia.org/sparql' + "?query="+ encodeURIComponent(query) +"&format=json";

console.log("queryUrl")
console.log(queryUrl)

//const queryUrl = 'https://dbpedia.org/sparql';
Http.open("GET", encodeURIComponent(queryUrl));
Http.send();

Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
}