import json
f = open('C:/EcoCycle/spootfind/messages/en.json', 'r', encoding='utf-8')
data = json.load(f)
f.close()
insights = data['insights']
out = open('C:/EcoCycle/spootfind/insights_dump.json', 'w', encoding='utf-8')
json.dump(insights, out, ensure_ascii=False, indent=2)
out.close()
print('Done')
