from difflib import SequenceMatcher

def calculate_relevance(text1, text2):
    similarity_ratio = SequenceMatcher(None, text1, text2).ratio()
    return similarity_ratio * 100


t1 = "The quick brown fox jumps over the lazy dog. The weather today is sunny with a slight breeze.";
t2 = "An agile red fox leapt across a sleepy hound. Today, the weather is bright and there's a gentle wind";
print(calculate_relevance(t1, t2));