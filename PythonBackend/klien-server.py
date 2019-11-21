import json
import scispacy
import spacy

import re
from klein import Klein
from SPARQLWrapper import SPARQLWrapper, JSON


nlp = spacy.load("en_ner_bc5cdr_md")
sp = spacy.load('en_core_web_sm')

class ItemStore(object):
    app = Klein()

    def _init_(self):
        self._items = {}

    @app.route('/')
    def items(self, request):
        request.setHeader('Content-Type', 'application/json')
        return json.dumps(self._items)

    @app.route('/<string:name>', methods=['POST'])
    def post_item(self, request, name):
        request.setHeader('Content-Type', 'application/json')
        content = json.loads(request.content.read())


        print("123langCode")
        print(content["langCode"])
        langCode = content["langCode"]
        text = content["data"]

        print("pure text")
        print(text)

        text = text\
            .replace("\r", " ")\
            .replace("\n", " ")\
            .replace("mg/dl", " ")\
            .replace("high", " ") \
            .lower()

        text = re.sub(r'[^A-Za-z ]+', " ", text)
        text = re.sub(' +', " ", text)

        text = text \
            .replace("high", " ")\
            .replace("desirable", " ")\
            .replace("borderline", " ")

        text = re.sub(' +', " ", text)

        print("regexed text")
        print(text)

        sentence = sp(text)
        text = " ".join([token.lemma_ for token in sentence])

        # print("lemmatized text")
        # print(text)

        doc = nlp(json.dumps(text))
        entities = doc.ents
        data = {'entities': []}

        entitySet = set()

        for entity in entities:
            entitySet.add(str(entity))

                # for entity in entities:
        #     data['entities'].append(str(entity))

        print(entitySet)

        return self.getQueryResults(entitySet, langCode)

    def getQueryResults(self, entitySet, langCode):
        data = {'entities': []}

        for entity in entitySet:
            sparql = self.getAbstractQuery(entity, langCode)
            results = sparql.query().convert()

            for result in results["results"]["bindings"]:
                # print(result["chem"]["value"])
                # print(result["comment"]["value"])

                #result = {'entityURI': '', 'entityName': '', 'comment': ''}
                result_entity = dict()
                result_entity["entityName"] = entity
                #result_entity['entityURI'] = str(result["chem"]["value"])
                result_entity["comment"] = str(result["comment"]["value"])

                #print(result_entity)

                data['entities'].append(result_entity)

        return json.dumps(data)

    def getAbstractQuery(self, entity, langCode):
        sparql = SPARQLWrapper("http://dbpedia.org/sparql")
        sparql.setReturnFormat(JSON)
        query = """
            PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX dbp: <http://dbpedia.org/resource/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT distinct(?chem) ?comment where 
           { 
            ?chem rdf:type dbo:ChemicalCompound .
            ?chem rdfs:label ?label .
            ?chem rdfs:comment ?comment .
            FILTER regex(?label, "^%s$", "i")
            FILTER (langMatches(lang(?comment),"%s"))
           }
        """ % (entity, langCode)

        #print("query")
        #print(query)

        sparql.setQuery(query)

        return sparql


if __name__ == '__main__':
    store = ItemStore()
    store.app.run('localhost', 8080)