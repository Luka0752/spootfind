import json, os

# Read art5 content
with open(r'C:\spootfind\scripts\art5_en.json', 'r', encoding='utf-8') as f:
    art5 = json.load(f)

# Read en.json
with open(r'C:\spootfind\messages\en.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

# Merge art5 into insights namespace
if 'insights' not in d:
    d['insights'] = {}
d['insights'].update(art5)

# Write back
with open(r'C:\spootfind\messages\en.json', 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)

# Verify
with open(r'C:\spootfind\messages\en.json', 'r', encoding='utf-8') as f:
    verify = json.load(f)
art5_keys = [k for k in verify.get('insights', {}) if 'art5' in k]
print('SUCCESS: art5 keys in en.json:', art5_keys)
print('Total insights keys:', len(verify.get('insights', {})))
