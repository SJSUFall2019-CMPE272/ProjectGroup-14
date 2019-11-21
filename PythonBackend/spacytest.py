import spacy
sp = spacy.load('en_core_web_sm')

sentence = sp(u'triglycerides kills a lot of')

for word in sentence:
    print(word.text,  word.lemma_)

print(" ".join([token.lemma_ for token in sentence]))