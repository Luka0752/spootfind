import json
with open('C:/EcoCycle/spootfind/messages/en.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
insights = data.get('insights', {})
print(json.dumps(insights, ensure_ascii=False, indent=2))