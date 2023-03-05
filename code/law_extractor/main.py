import re
from json.encoder import JSONEncoder
import json


def read_raw_articles(path):
    with open(path, 'r') as f:
        text = f.read()
        return text


def extract_points(clause):

    point_idx = ['a', 'b', 'c', 'd', 'đ', "e", "g", "h", "i", "k",
                 "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y"]

    extracted = list(
        filter(
            lambda a: len(a.strip()) != 0,
            re.split("[\s]+[a-zđ]\) ", clause.strip())
        )
    )  # Remove the first one because it is the title

    result: list = []

    for i in range(1, len(extracted)):
        result.append(
            {
                'index': point_idx[i-1],
                'content': extracted[i].strip(),
                'keyphrases': [],
            }
        )

    return extracted[0], result


def extract_clauses(article):
    extracted = list(
        filter(
            lambda a: len(a.strip()) != 0,
            re.split("[\d]*\. ", article.strip())
        )
    )

    clauses: list = []

    for i in range(1, len(extracted)):
        content, points = extract_points(extracted[i])
        clauses.append(
            {
                'index': i,
                'content': content.strip(),
                'keyphrases': [],
                'points': points
            }
        )

    return extracted[0], clauses


def extract_articles(text):
    extracted = list(
        filter(
            lambda a: len(a.strip()) != 0,
            re.split('Điều [\d]+\.\s*', text)
        )
    )

    result: list = []

    for i in range(len(extracted)):

        title_and_content, clauses = extract_clauses(extracted[i])
        title_and_content = title_and_content.split('\n')
        result.append(
            {
                'index': i+1,
                'title': title_and_content[0].strip(),
                'documentId': '100/2019/NĐ-CP',
                'content': '\n'.join(list(map(lambda content_lines: content_lines.strip(), title_and_content[1:]))).strip(),
                'keyphrases': [],
                'clauses': clauses
            }
        )

    return result


def save_extracted_to_file(text):
    with open('./data.json', 'w+') as f:
        f.write(json.dumps(extract_articles(text), ensure_ascii=False))


save_extracted_to_file(read_raw_articles('./code/law_extractor/raw.txt'))
