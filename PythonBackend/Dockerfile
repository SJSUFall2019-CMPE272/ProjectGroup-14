FROM python:3.7

RUN mkdir -p /Users/anjanamenon/python-dir
WORKDIR /Users/anjanamenon/python-dir

COPY . .

RUN pip install scispacy
RUN pip3 install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.2.4/en_ner_bc5cdr_md-0.2.4.tar.gz
RUN python3 -m spacy download en_core_web_sm
RUN pip install klein
RUN pip install SPARQLWrapper
#RUN conda create -n scispacy python=3.7
#RUN source activate scispacy
EXPOSE 8080



CMD [ "python3", "klien-server.py" ]