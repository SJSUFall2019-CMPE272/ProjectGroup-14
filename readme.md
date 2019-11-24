<h1>MediReport</h1>
Easy and understandable medical records


<h1>Hill Statement/Description</h1>
An application that enables end-users who have don't have a medical background, to interpret the meanings of various medical/physiological parameters that are present in their medical reports or prescriptions in an easy to underestand and informative format which can be presented in multiple lanuguages.


<h1>Abstract</h1>
Everyone cannot read or understand the various medical jargon and parameters mentioned in their medical reports (lipid profile, CBC report, LFT, RFT, etc.). They usually have to take a day off from their schedules and visit their doctor/medical practitioner to get a sense of their annual health reports or even results of important tests. Our solution will save people time and money for a doctor's visit, by making an informed decision about their health using their medical reports. This will be useful particularly in the case of where patients are located in remote areas where medical facilities are sparse.

We propose to build a React-based UI where the user can upload their medical reports. React native will be used to implement the solution, which will enable the application to be ported to mobile platforms as well. 
Tesseract OCR and Aspose APIs will be used to extract medical report data while scanning the report. We will store RDF medical data from DBpedia and other datasets in MarkLogic. 
We will also be using various NLP/NLG libraries such as Apache OpenNLP, SimpleNLP, etc., to generate a human-like response for the user. 
Our Java-based system will interface with the RDF database and NLP/NLG libraries to send back repose to the UI.

We will provide support for multiple space-delimited languages, for example, English, Spanish, and all Indian languages. We will not able to support languages like Chinese, Japanese, Korean, Thai, Khmer whose writing systems don't use spaces since OpenNLP performs space-level token parsing.

<h1>Business Value</h1>
Limited literacy skills are one of the strongest predictors of poor health outcomes for patients. Studies have shown that when patients have low reading fluency, they know less about their chronic diseases, they are worse at managing their care<sup>[1]</sup>.


Overall, studies of patient-accessible medical records suggest modest improvements in doctor-patient communication, adherence, patient empowerment, and patient education<sup>[2]</sup>. 

<h1>Persona</h1>
MediReport will solve the following use cases - 

| Actor      | Use case |
| ----------- | ----------- |
| Patient trying to understand a medical report      | Patients often have difficulties understanding the clinical data presented in portals. In response, increasingly, patients either ignore their reports or go online<sup>[3]</sup> to make sense of this data. The medical information provided online in forums and discussion groups can lead to patient anxiety or such information may not always be applicable. MediReport will give the user a one-stop solution for patients to understand their medical reports, the meaning and impact of each term (for ex., Bilirubin, Creatinine, etc.) as well as ways to manage it  |
| Patients trying to understand a doctor's prescription   |  40-80% of the medical information provided by healthcare practitioners is forgotten immediately. The greater the amount of information presented, the lower the proportion correctly recalled;<sup>[4]</sup> Furthermore, almost half of the information that is remembered is incorrect.<sup>[5]</sup> To help patients in recalling and understanding each prescribed medicine, MediReport will augment the prescription with explanation, categorization (antibiotic, antibacterial, etc.) side-effects, medical usage, mode of action, etc.        |
| Physicians trying to make a diagnosis | A study by Meyer and Payne<sup>[6]</sup> suggests that the association between physicians’ diagnostic accuracy and their confidence in that accuracy may be poor and that physicians may not request the required additional resources (ie, additional tests, second opinions, curbside consultations, referrals, and reference materials) to facilitate diagnosis when they most need it. These mismatched associations might prevent physicians from reexamining difficult cases when their diagnosis is incorrect. Improving these associations and the use of potential resources in handling difficult cases could potentially reduce diagnostic error. MediReport will help reduce diagnostic error by providing the physician the additional resources such as Signs and symptoms, Virology, Pathophysiology, Diagnosis, Prevention, Treatment, Management, Prognosis, etc. |
| Insurance company validating a claim | The insurers know a lot about you, based on claims. They aggregate data, such as imaging, medications, referrals, admissions, and emergency department visits, as well as quality metrics around severity-adjusted episodes of care for specific diagnoses<sup>[7]</sup>. MediReport will help insurance companies in making decisions about pre-existing conditions, valid claims, reporting malpractices, etc. by providing them with a clear understanding of the thousands of medical terms and jargon that can be difficult to remember. It will save insurance companies a lot of money by reducing work hours in understanding medical cases and well as reduce dependence on consultants that need to be paid high salaries. |

<h1>Architecture</h1>

![](https://github.com/SJSUFall2019-CMPE272/MediReport/blob/master/MediReport_archi_diagram.png)


<h1>Technology stack choice and viability</h1>

  | Technology      | Choice and viability |
| ----------- | ----------- |
| React Native | React Native is a multi-platform solution developed by Facebook that lets you build mobile apps using JavaScript. These mobile apps are considered multi-platform because they’re written once and deployed across many platforms, like Android, iOS and the web. We will use React Native to create a cross-platform app that can be run on iOS, Android and Web. |
| spaCy | spaCy is an open-source software library for advanced natural language processing. spaCy excels at large-scale information extraction tasks. It's written from the ground up in carefully memory-managed Cython. Independent research in 2015 found spaCy to be the fastest in the world<sup>[8]</sup>. We will be using spaCy to perform most of our non-clinical NLP tasks such as NER, sentence detection, etc.  |
| medaCy and Apache cTAKES™ | MedaCy is a text processing and learning framework built over spaCy to support the lightning fast prototyping, training, and application of highly predictive medical NLP models. It is designed to streamline researcher workflow by providing utilities for model training, prediction and organization while insuring the replicability of systems. Apache cTAKES™ is a natural language processing system for extraction of information from electronic medical record clinical free-text. It can discover codable entities, temporal events, properties and relations. It can process database or file-stored batches at 50,000 clinical notes per hour and can be scaled up to run on clusters, queue systems and cloud computing services. We will use a combination of medaCy and Apache cTAKES™ for all clinical NLP suhc as clinical NER, co-reference resolution etc. We might use another NLP tool if the need arises. |
| Linked data | Linked data (often capitalized as Linked Data) is structured data that is interlinked with other data so it becomes more useful through semantic queries<sup>[9]</sup>. It builds upon standard Web technologies such as HTTP, RDF, and URIs, but rather than using them to serve web pages only for human readers, it extends them to share information in a way that can be read automatically by computers. We will use Dbpedia, a Linked dataset because it can provide us virtually every information present in Wikipedia as well as enable us to combine various Linked Data sources to generate a comprehensive dataset. |
| DBpedia | DBpedia extracts factual information from Wikipedia pages, allowing users to find answers to questions where the information is spread across multiple Wikipedia articles. Data is accessed using an SQL-like query language for RDF called SPARQL. We will use DBpedia as our primary dataset for providing information in more than 100 languages. |
| Aspose | Aspose provides the most complete set of PDF/Word/Excel manipulation and parsing solution for developers & end-users. Aspose is one of the leaders with a suite of tools for creating PDF/MS Office documents<sup>[10]</sup>. We will use Aspose to parse and extract information from medical reports in PDF, MS Word, and other supported formats. |
| Tesseract | Tesseract is an OCR engine with support for Unicode and the ability to recognize more than 100 languages out of the box. It can be trained to recognize other languages. We will use it to do OCR of medical reports where a user will be able to quickly take a picture of his/her medical record and get the most accurate data from MediReport|
| SimpleNLG | SimpleNLG can be used to help you write a program that generates grammatically correct English sentences. It’s a library (not an application), written in Java, which performs simple and useful tasks that are necessary for natural language generation (NLG). In the final phase, which is not of the highest priority, we will use SimpleNLG to generate human-like response for the user. |
| MarkLogic | MarkLogic Server is a powerful software solution for harnessing your digital content all in a single database. MarkLogic enables you to build complex applications that interact with large volumes of JSON, XML, SGML, HTML, RDF triples, binary files, and other popular content formats. The unique architecture of MarkLogic ensures that your applications are both scalable and high-performance, delivering query results at search-engine speeds while providing transactional integrity over the underlying database<sup>[11]</sup>. Gartner’s most recent Magic Quadrant report for Operational Database Management Systems underscores my position. Of all the companies in the challengers’ quadrant, MarkLogic achieved the highest placement for its “ability to execute.”<sup>[12]</sup>|

<h1>Sample Input</h1>
Medical report -

![](https://github.com/SJSUFall2019-CMPE272/MediReport/blob/master/images/Screen%20Shot%202019-10-20%20at%203.52.31%20PM.png)

Doctor's presciption -
1 capsule of Advil for 5 days.


<h1>Algorithm</h1>

1. Fetch user's medical report via React-based UI/Node.js 
2. Use Apose PDF or Tesseract OCR to extrat text data from the medical report
3. Use medaCy and Apache cTAKES™ for clincal NLP where we extract entites, relationships
4. Enhance the above extracted data by providing explanations of each term using Dbpedia
5. (Low priority) Use various NLP/NLG libraries such as Apache OpenNLP, SimpleNLP, etc., to generate a human-like response for the user. 

<h1>Sample Output</h1>
The below response from the back-end will be displayed in an user-friendly design on the UI -


    {
        'entities': {
            'T1': ('Cholesterol', 'Cholesterol is a molecule that is found in animal cells and body fluids. Cholesterol is not found in plant sources. It is a type of lipid which is a fat or fat-like molecule. Cholesterol is a soft waxy substance. Cholesterol is a special type of lipid that is called a steroid. Steroids are lipids that have a special chemical structure. This structure is made of four rings of carbon atoms. Cholesterol is found especially in animal fats. Hypercholesterolemia means that cholesterol level is too high in the blood. High cholesterol levels show that heart disease may develop.'),
            'T2': ('Drug', 'High-density lipoprotein (HDL) is one of the five major groups of lipoproteins.[1] Lipoproteins are complex particles composed of multiple proteins which transport all fat molecules (lipids) around the body within the water outside cells. Increasing concentrations of HDL particles are strongly associated with decreasing accumulation of atherosclerosis within the walls of arteries. This is important because atherosclerosis eventually results in sudden plaque ruptures, cardiovascular disease, stroke and other vascular diseases. ')
            ...
        }
    }


    {
        'entities': {
            'T3': ('Drug', 40, 45, 'Advil'),
            'T1': ('Dosage', 27, 28, '1'), 
            'T2': ('Form', 29, 36, 'capsule'),
            'T4': ('Duration', 46, 56, 'for 5 days')
         },
         'relations': []
    }

<h1>Feedback</h1>
Professor Ranjan's initial reaction:

> I love this idea. Use NLG to generate commentary for users. I would stick to mobile app and make it useful for
> underprivileged users in rural area and support multiple languages such as spanish, hindi, tamil, telugu etc... 

<h1>Team</h1>

1. [Animesh Swain](https://github.com/SwainsteigerSJSU)
1. [Anjana Menon Cherubala](https://github.com/AnjanaMenonCherubala)
1. [Sakshi Mahendru](https://github.com/sakshimahendrusjsu)
1. [Vini Aswal](https://github.com/vaswal)


<h1>References</h1>

1. Graham, S., & Brookey, J. (2008). Do patients understand?. The Permanente journal, 12(3), 67–69. doi:10.7812/tpp/07-144

2. Ross, S. E., & Lin, C. T. (2003). The effects of promoting patient access to medical records: a review. Journal of the American Medical Informatics Association : JAMIA, 10(2), 129–138. doi:10.1197/jamia.m1147

3. Reynolds, T. L., Ali, N., McGregor, E., O'Brien, T., Longhurst, C., Rosenberg, A. L., … Zheng, K. (2018). Understanding Patient Questions about their Medical Records in an Online Health Forum: Opportunity for Patient Portal Design. AMIA ... Annual Symposium proceedings. AMIA Symposium, 2017, 1468–1477.

4. McGuire LC. Remembering what the doctor said: organization and older adults' memory for medical information. Exp Aging Res 1996;22: 403-28

5. Anderson JL, Dodman S, Kopelman M, Fleming A. Patient information recall in a rheumatology clinic. Rheumatol Rehabil 1979;18: 245-55

6. Meyer AND, Payne VL, Meeks DW, Rao R, Singh H. Physicians’ Diagnostic Accuracy, Confidence, and Resource Requests: A Vignette Study. JAMA Intern Med. 2013;173(21):1952–1958. doi:10.1001/jamainternmed.2013.10081

7. Kaufman J. M. (2015). How to work with insurance companies. Neurology. Clinical practice, 5(5), 448–453. doi:10.1212/CPJ.0000000000000179

8. Facts & Figures https://spacy.io/usage/facts-figures

9. Bizer, Christian; Heath, Tom; Berners-Lee, Tim (2009). "Linked Data – The Story So Far" (PDF). International Journal on Semantic Web and Information Systems. 5 (3). doi:10.4018/jswis.2009081901.

10. Create Documents with Aspose.Pdf for .NET https://visualstudiomagazine.com/articles/2010/09/01/create-documents-with-asposepdf-for-net.aspx

11. Getting Started With MarkLogic Server https://docs.marklogic.com/guide/getting-started/intro

12. Why MarkLogic Will Lead the Next-Generation of Database Technology https://www.marklogic.com/blog/marklogic-will-lead-next-generation-multi-model-database/
