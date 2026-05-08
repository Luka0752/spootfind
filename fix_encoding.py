import json

with open(r'C:\EcoCycle\spootfind\lib\trending.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

fixed = []
for p in data['products']:
    old = p['procurement']['supplier']
    if '渚涘簲鍟' in old or '\ufffd' in old:
        if 'Alibaba' in old:
            p['procurement']['supplier'] = 'Alibaba供应商'
        else:
            p['procurement']['supplier'] = '1688供应商'
        fixed.append((old, p['procurement']['supplier']))

with open(r'C:\EcoCycle\spootfind\lib\trending.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Fixed {len(fixed)} supplier names:")
for old, new in fixed:
    print(f"  '{old}' -> '{new}'")
print("Done.")
