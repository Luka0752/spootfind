import json, os, glob

# Read art5 content from en.json
with open(r'C:\spootfind\messages\en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)

art5_keys = {k: v for k, v in en.get('insights', {}).items() if k.startswith('art5')}
print(f'art5 keys to copy: {len(art5_keys)}')

# All language files except en.json
lang_files = glob.glob(r'C:\spootfind\messages\*.json')
lang_files = [f for f in lang_files if not f.endswith('en.json')]
print(f'Language files to update: {len(lang_files)}')

updated = 0
for lf in lang_files:
    with open(lf, 'r', encoding='utf-8') as f:
        d = json.load(f)
    if 'insights' not in d:
        d['insights'] = {}
    # Merge art5 keys (overwrite if exist, add if not)
    d['insights'].update(art5_keys)
    with open(lf, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    updated += 1
    print(f'  Updated: {os.path.basename(lf)}')

print(f'\nDone! Updated {updated} files.')
