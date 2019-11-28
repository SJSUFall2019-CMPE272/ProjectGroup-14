import json
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

        print(entitySet)

        return self.getQueryResults(entitySet, langCode)

    def getQueryResults(self, entitySet, langCode):
        data = {'entities': []}

        for entity in entitySet:
            # result_entity = dict()
            result_entity = {"entityName": "", "comment": "", "foods": [], "diseases": []}

            abstract_sparql_query = self.getAbstractQuery(entity, langCode)
            abstract_query_results = abstract_sparql_query.query().convert()

            print("abstract_query_results")
            print(abstract_query_results)

            if len(abstract_query_results["results"]["bindings"]) == 0:
                continue

            for result in abstract_query_results["results"]["bindings"]:
                result_entity["entityName"] = entity
                #result_entity['entityURI'] = str(result["chem"]["value"])
                result_entity["comment"] = str(result["comment"]["value"])
                #print(result_entity)

            # food_sparql_query = self.getFoodQuery(entity, langCode)
            # food_query_results = food_sparql_query.query().convert()
            #
            # for result in food_query_results["results"]["bindings"]:
            #     result_entity["foods"].append(str(result["label"]["value"]))

            food_dict = dict()
            food_sparql_query = self.getLowFoodQuery(entity, langCode)
            food_query_results = food_sparql_query.query().convert()

            for result in food_query_results["results"]["bindings"]:
                result_entity["foods"].append(str(result["label"]["value"]))

            food_sparql_query = self.getFoodQuery(entity, langCode)
            food_query_results = food_sparql_query.query().convert()

            for result in food_query_results["results"]["bindings"]:
                result_entity["foods"].append(str(result["label"]["value"]))


            disease_sparql_query = self.getDiseaseQuery(entity, langCode)
            disease_query_results = disease_sparql_query.query().convert()

            for result in disease_query_results["results"]["bindings"]:
                result_entity["diseases"].append(str(result["label"]["value"]))

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

    def getFoodQuery(self, entity, langCode):
        sparql = SPARQLWrapper("http://dbpedia.org/sparql")
        sparql.setReturnFormat(JSON)
        query = """
            PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX dbp: <http://dbpedia.org/resource/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT distinct(?food) ?label where 
           { 
            ?food rdf:type dbo:Food .
            ?food rdfs:label ?label .
            ?food dbo:abstract ?abstract .
            FILTER regex(?abstract, "%s", "i")
            FILTER (langMatches(lang(?label),"%s"))
            FILTER (langMatches(lang(?abstract),"%s"))
           }
        """ % (entity, langCode, langCode)

        sparql.setQuery(query)

        return sparql

    def getLowFoodQuery(self, entity, langCode):
        sparql = SPARQLWrapper("http://dbpedia.org/sparql")
        sparql.setReturnFormat(JSON)
        query = """
            PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX dbp: <http://dbpedia.org/resource/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT distinct(?food) ?label where 
           { 
            ?food rdf:type dbo:Food .
            ?food rdfs:label ?label .
            ?food dbo:abstract ?abstract .
            FILTER regex(?abstract, "%s", "i")
            FILTER (langMatches(lang(?label),"%s"))
            FILTER (langMatches(lang(?abstract),"%s"))
           }
        """ % (entity, langCode, langCode)

        sparql.setQuery(query)

        return sparql


    def getDiseaseQuery(self, entity, langCode):
        sparql = SPARQLWrapper("http://dbpedia.org/sparql")
        sparql.setReturnFormat(JSON)
        query = """
        PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX dbp: <http://dbpedia.org/resource/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT distinct(?chem) ?label where 
           { 
            ?chem rdf:type dbo:Disease .
            ?chem rdfs:label ?label .
            ?chem dbo:abstract ?abstract .
            FILTER regex(?abstract, "%s", "i")
            FILTER (langMatches(lang(?label),"%s"))
            FILTER (langMatches(lang(?abstract),"%s"))
           }
        """ % (entity, langCode, langCode)

        sparql.setQuery(query)

        return sparql


if __name__ == '__main__':
    store = ItemStore()
    store.app.run('localhost', 8080)