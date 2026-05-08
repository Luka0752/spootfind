import json, os, glob

locales_dir = r'C:\EcoCycle\spootfind\messages'
translations = {
    'en': 'Products',
    'zh': 'Products',
    'zh-TW': 'Products',
    'es': 'Productos',
    'fr': 'Produits',
    'de': 'Produkte',
    'pt': 'Produtos',
    'ja': 'Products',
    'ko': 'Products',
    'ar': 'Products'
}

for fpath in glob.glob(os.path.join(locales_dir, '*.json')):
    locale = os.path.splitext(os.path.basename(fpath))[0]
    with open(fpath, 'r', encoding='utf-8') as f:
        d = json.load(f)
    if 'footer' not in d:
        d['footer'] = {}
    d['footer']['products'] = translations.get(locale, 'Products')
    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    print(locale + ': OK')
