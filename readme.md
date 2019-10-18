<h1>MediReport</h1>
Easy and understandable medical records


<h1>Description</h1>
An application which enables end users to interpret the meanings of various medical/physiological parameters which are present in their medical reports or prescriptions.


<h1>Abstract</h1>
Everyone cannot read or understand the various medical jargon and paramters mentioned in their medical reports (lipid profile, CBC report, LFT, RFT, etc.). They usually have to take a day off from their schedules and visit their doctor/medical practioner to get a sense of their annual health reprts or even results of important tests. Our solution will save people time and money of a doctor's visit, by making an informed decision about their health using their medical reports. This will be useful particularly in the case of polulation located in remote areas where medical facilities are sparse.

We propose to build a React-based UI where user can upload their medical reports. React native will be used to implement the solution, which will enable the application to be ported to mobile platforms as well. 
Tesseract OCR and Aspose APIs will be used to extract medical report data while scanning the report. We will store RDF medical data from DBpedia and other datasets in MarkLogic. 
We will also be using various NLP/NLG libraries such as Apache OpenNLP, SimpleNLP etc., to generate human-like response for the user. 
Our Java-based system will interface with the RDF database and NLP/NLG libraries to send back repose to the UI.

We will provide support for multiple space-delimited languages for example, English, Spanish and all Indian languages. We will not able to support languages like Chinese, Japanese, Korean, Thai, Khmer whose writing systems that don't use spaces, since OpenNLP performs space-level token parsing.


<h1>Architecture</h1>
![](https://github.com/SJSUFall2019-CMPE272/MediReport/blob/master/MediReport_archi_diagram.png)

<h1>Technology stack</h1>
React, OCR, OpenNLP, SimpleNLP Linked Open Data/Semantic Graph.

<h1>Feedback</h1>
Professor Ranjan's initial reaction:

> I love this idea. Use NLG to generate commentary for users. I would stick to mobile app and make it useful for
> underprivileged users in rural area and support multiple languages such as spanish, hindi, tamil, telugu etc... 

