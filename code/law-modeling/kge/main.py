import spacy
import os
import pandas as pd
from pandas import DataFrame
from spacy.language import Language
nlp: Language = spacy.load('vi_core_news_lg')
path = os.path.join(os.getcwd(), '..', 'resources',
                    'keyphrase-extraction.csv')


def read_csv(file_path: str) -> DataFrame:
    data = pd.read_csv(file_path)
    return data


def visualize_data(data: DataFrame):
    data = read_csv(path)
    print(data)


def nlp_test():
    doc = nlp('Xin chào việt nam')
    for token in doc:

        print(token.text,
              token.tag_,
              token.dep_,
              token.is_alpha,
              token.is_stop
              )


visualize_data(read_csv(path))
